<script setup>
import { ref, watch, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { userStoreRules, userUpdateRules } from "@/validations/user.rules";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
  modelValue: Boolean,
  id: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const store = useUsersStore();

const isEdit = computed(() => !!props.id);

const data = ref({
  name: "",
  email: "",
  password: "",
  roles: [],
  is_active: true,
});

const rules = computed(() => (isEdit.value ? userUpdateRules : userStoreRules));

const v$ = useVuelidate(rules, data);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const resetForm = () => {
  data.value = {
    name: "",
    email: "",
    password: "",
    roles: [],
    is_active: true,
  };
  v$.value.$reset();
};

const close = () => {
  if (!isEdit.value) resetForm();
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  if (!(await v$.value.$validate())) return;

  if (isEdit.value) {
    await store.updateUser(props.id, data.value);
  } else {
    await store.createUser(data.value);
    resetForm();
  }

  close();
};

watch(
  () => props.modelValue,
  async (open) => {
    if (!open) return;

    await store.getRoles();

    if (isEdit.value) {
      data.value = await store.findUserById(props.id);
    } else {
      resetForm();
    }
  }
);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-black text-h5">
          {{ isEdit ? "Editar Usuário" : "Criar Usuário" }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain" :ripple="false">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form @submit.prevent="handleSubmit">
        <v-card-text class="px-8 pb-6">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="data.name"
                label="Nome"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                @input="v$.name.$touch"
                @blur="v$.name.$touch"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="data.email"
                label="Email"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                @input="v$.email.$touch"
                @blur="v$.email.$touch"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="data.password"
                label="Senha"
                type="password"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
                @input="v$.password.$touch"
                @blur="v$.password.$touch"
                :hint="isEdit ? 'Preencha apenas para alterar' : ''"
                persistent-hint
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox
                v-model="data.roles"
                label="Papéis"
                :items="store.roles"
                item-title="name"
                item-value="id"
                clearable
                chips
                closable-chips
                multiple
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-8 py-4 border-t">
          <v-switch
            v-model="data.is_active"
            label="Ativo"
            hide-details
            color="primary"
            :ripple="false"
            :flat="true"
          />
          <v-spacer />
          <v-btn
            :loading="isEdit ? store.updating : store.creating"
            type="submit"
            variant="flat"
            color="primary"
            text="Salvar"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

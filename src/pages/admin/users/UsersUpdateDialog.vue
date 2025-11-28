<script setup>
import { ref, watch, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { userUpdateRules } from "@/validations/user.rules";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
  modelValue: Boolean,
  id: String,
});

const emit = defineEmits(["update:modelValue"]);

const store = useUsersStore();

const data = ref({
  name: "",
  email: "",
  password: "",
  roles: [],
  is_active: false,
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const v$ = useVuelidate(userUpdateRules, data);

const handlerUpdate = async () => {
  if (!(await v$.value.$validate())) return;
  await store.updateUser(props.id, data.value);
  close();
};

const close = () => emit("update:modelValue", false);

watch(
  () => props.id,
  async (id) => {
    if (props.modelValue && id) {
      await store.getRoles();
      data.value = await store.findUserById(id);
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-bold">Editar Usuário</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form @submit.prevent="handlerUpdate">
        <v-card-text class="px-8 pb-6">
          <v-row>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.name" label="Nome" :error-messages="v$.name.$errors.map(e => e.$message)"
                @input="v$.name.$touch" @blur="v$.name.$touch" :loading="store.loading" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.email" label="Email" :error-messages="v$.email.$errors.map(e => e.$message)"
                @input="v$.email.$touch" @blur="v$.email.$touch" :loading="store.loading" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.password" label="Senha" type="password"
                :error-messages="v$.password.$errors.map(e => e.$message)" @input="v$.password.$touch"
                @blur="v$.password.$touch" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-combobox v-model="data.roles" label="Papéis" :items="store.roles" item-title="name" item-value="id"
                clearable multiple chips :loading="store.loading" />
            </v-col>
          </v-row>

        </v-card-text>

        <v-card-actions class="px-8 py-4 border-t">
          <v-switch v-model="data.is_active" label="Ativo" hide-details color="primary" :ripple="false" :flat="true" />
          <v-spacer />
          <v-btn :loading="store.updating" @click="handlerUpdate" variant="flat" color="primary" text="Salvar" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

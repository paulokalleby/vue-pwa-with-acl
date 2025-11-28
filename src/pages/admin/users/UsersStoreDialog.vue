<script setup>
import useVuelidate from "@vuelidate/core";
import { userStoreRules } from "@/validations/user.rules";
import { useUsersStore } from "@/stores/users";
import { ref, onMounted, computed } from "vue";

const store = useUsersStore();

onMounted(() => {
  store.getRoles();
});

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const data = ref({
  name: "",
  email: "",
  password: "",
  roles: [],
  is_active: true,
});

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

const v$ = useVuelidate(userStoreRules, data.value);

const handlerStore = async () => {
  if (!(await v$.value.$validate())) return;
  await store.createUser(data.value);
  close();
};

const close = () => {
  resetForm();
  emit("update:modelValue", false);
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-bold">Criar Usuário</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form @submit.prevent="handlerStore" class="">

        <v-card-text class="px-8 pb-6">
          <v-row>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.name" label="Nome" :error-messages="v$.name.$errors.map(e => e.$message)"
                @input="v$.name.$touch" @blur="v$.name.$touch" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.email" label="Email" :error-messages="v$.email.$errors.map(e => e.$message)"
                @input="v$.email.$touch" @blur="v$.email.$touch" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.password" label="Senha" type="password"
                :error-messages="v$.password.$errors.map(e => e.$message)" @input="v$.password.$touch"
                @blur="v$.password.$touch" />
            </v-col>

            <v-col cols="12" md="6" class="pb-0">
              <v-combobox v-model="data.roles" label="Papéis" :items="store.roles" item-title="name" item-value="id"
                clearable multiple chips />
            </v-col>
          </v-row>

        </v-card-text>

        <v-card-actions class="px-8 py-4 border-t">
          <v-switch v-model="data.is_active" label="Ativo" hide-details color="primary" :ripple="false" :flat="true" />
          <v-spacer />
          <v-btn :loading="store.creating" @click="handlerStore" variant="flat" color="primary" text="Salvar" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

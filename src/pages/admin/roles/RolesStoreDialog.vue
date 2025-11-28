<script setup>
import useVuelidate from "@vuelidate/core";
import { roleRules } from "@/validations/role.rules";
import { useRolesStore } from "@/stores/roles";
import { ref, computed } from "vue";

const store = useRolesStore();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const data = ref({
  name: "",
  permissions: [],
  is_active: true,
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const resetForm = () => {
  data.value = {
    name: "",
    permissions: [],
    is_active: true,
  };
  v$.value.$reset();
};

const v$ = useVuelidate(roleRules, data.value);

const handlerStore = async () => {
  if (!(await v$.value.$validate())) return;
  await store.createRole(data.value);
  close();
};

const close = () => {
  resetForm();
  emit("update:modelValue", false);
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="1000" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-bold">Criar Papel</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form @submit.prevent="handlerStore">
        <v-card-text class="px-8 pb-6">

          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field v-model="data.name" label="Nome" :error-messages="v$.name.$errors.map(e => e.$message)"
                @input="v$.name.$touch" @blur="v$.name.$touch" />
            </v-col>

            <v-col cols="12" md="12">
              <v-row>
                <v-col cols="12" md="2" v-for="resource in store.resources" :key="resource.id">
                  <h4>{{ resource.name }}</h4>
                  <div class="px-0" v-for="permission in resource.permissions" :key="permission.id">
                    <v-checkbox :ripple="false" :value="permission.id" v-model="data.permissions"
                      :id="'permission-' + permission.id" :label="permission.name" hide-details>
                    </v-checkbox>
                  </div>
                </v-col>
              </v-row>
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

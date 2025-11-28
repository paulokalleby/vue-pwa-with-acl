<script setup>
import { ref, watch, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { roleRules } from "@/validations/role.rules";
import { useRolesStore } from "@/stores/roles";

const props = defineProps({
  modelValue: Boolean,
  id: String,
});

const emit = defineEmits(["update:modelValue"]);

const store = useRolesStore();

const data = ref({
  name: "",
  permissions: [],
  is_active: false,
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const v$ = useVuelidate(roleRules, data);

const handlerUpdate = async () => {
  if (!(await v$.value.$validate())) return;
  await store.updateRole(props.id, data.value);
  close();
};

const close = () => emit("update:modelValue", false);

watch(
  () => props.id,
  async (id) => {
    if (props.modelValue && id) {
      data.value = await store.findRoleById(id);
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="1000" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-bold">Editar Papel</v-toolbar-title>
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

            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="2" v-for="resource in store.resources" :key="resource.id">
                  <h4>{{ resource.name }}</h4>
                  <div class="px-0" v-for="permission in resource.permissions" :key="permission.id">
                    <v-checkbox :ripple="false" v-model="data.permissions" :value="permission.id"
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
          <v-btn :loading="store.updating" @click="handlerUpdate" variant="flat" color="primary" text="Salvar" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

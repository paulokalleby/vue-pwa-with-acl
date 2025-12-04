<script setup>
import { ref, watch, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { roleRules } from "@/validations/role.rules";
import { useRolesStore } from "@/stores/roles";

const props = defineProps({
  modelValue: Boolean,
  id: { type: String, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const store = useRolesStore();

const isEdit = computed(() => !!props.id);

const data = ref({
  name: "",
  permissions: [],
  is_active: true,
});

const v$ = useVuelidate(roleRules, data);

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

const close = () => {
  if (!isEdit.value) resetForm();
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  if (!(await v$.value.$validate())) return;

  if (isEdit.value) {
    await store.updateRole(props.id, data.value);
  } else {
    await store.createRole(data.value);
    resetForm();
  }

  close();
};

watch(
  () => props.modelValue,
  async (open) => {
    if (!open) return;

    await store.getResources();

    if (isEdit.value) {
      data.value = await store.findRoleById(props.id);
    } else {
      resetForm();
    }
  }
);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="1000" persistent>
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-black text-h5">
          {{ isEdit ? "Editar Papel" : "Criar Papel" }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain" :ripple="false">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form @submit.prevent="handleSubmit">
        <v-card-text class="px-8 pb-6">
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="data.name"
                label="Nome"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                @input="v$.name.$touch"
                @blur="v$.name.$touch"
              />
            </v-col>

            <v-col cols="12" md="12">
              <v-row>
                <v-col
                  cols="12"
                  md="2"
                  v-for="resource in store.resources"
                  :key="resource.id"
                >
                  <h4>{{ resource.name }}</h4>
                  <div
                    class="px-0"
                    v-for="permission in resource.permissions"
                    :key="permission.id"
                  >
                    <v-checkbox
                      :ripple="false"
                      :value="permission.id"
                      v-model="data.permissions"
                      :id="'permission-' + permission.id"
                      :label="permission.name"
                      hide-details
                      density="compact"
                    >
                    </v-checkbox>
                  </div>
                </v-col>
              </v-row>
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

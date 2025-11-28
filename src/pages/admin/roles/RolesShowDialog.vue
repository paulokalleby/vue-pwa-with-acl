<script setup>
import { ref, watch, computed } from "vue";
import { useRolesStore } from "@/stores/roles";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: Boolean,
  id: String,
});
const emit = defineEmits(["update:modelValue"]);

const store = useRolesStore();
const data = ref(null);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

watch(
  () => props.id,
  async (id) => {
    if (props.modelValue && id) {
      data.value = null;
      data.value = await store.findRoleById(id);
    }
  },
  { immediate: true }
);

const close = () => emit("update:modelValue", false);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="600">
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-bold">Papel</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" variant="plain">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-7 pb-6">
        <v-list class="py-4">
          <v-row>
            <v-col cols="12" md="4" class="py-0 px-0">
              <v-list-item>
                <v-list-item-title>
                  <b>Nome</b>
                </v-list-item-title>
                <v-list-item-subtitle>{{ data?.name }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip badger rounded>
                <h1 class="pr-2"> {{ data?.users.length }} </h1>
                {{ data?.users.length == 1 ? 'Usuário' : 'Usuários' }}
              </v-chip>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip badger rounded>
                <h1 class="pr-2"> {{ data?.permissions.length }} </h1>
                {{ data?.permissions.length == 1 ? 'Permissão' : 'Permissões' }}
              </v-chip>
            </v-col>
          </v-row>
        </v-list>

      </v-card-text>

      <v-card-actions class="px-8 py-4 border-t">
        <v-chip class="mt-2 mb-2" :color="data?.is_active ? 'green' : 'red'"
          :prepend-icon="data?.is_active ? 'lucide:CircleCheck' : 'lucide:CircleX'"
          :text="data?.is_active ? 'Ativo' : 'Inativo'" size="x-small" badger rounded />

        <v-chip class="ms-2 mt-2 mb-2" color="dark" size="x-small" badger rounded prepend-icon="lucide:Clock">
          Criado em {{ dayjs(data?.created_at).format("DD/MM/YYYY - HH:mm") }}
        </v-chip>

        <v-chip class="ms-2 mt-2 mb-2" color="dark" size="x-small" badger rounded prepend-icon="lucide:Clock">
          Atualizado em {{ dayjs(data?.updated_at).format("DD/MM/YYYY - HH:mm") }}
        </v-chip>

        <v-spacer />
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

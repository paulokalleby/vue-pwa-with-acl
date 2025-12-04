<script setup>
import { ref, watch, computed } from "vue";
import { useUsersStore } from "@/stores/users";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: Boolean,
  id: String,
});
const emit = defineEmits(["update:modelValue"]);

const store = useUsersStore();
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
      data.value = await store.findUserById(id);
    }
  },
  { immediate: true }
);

const close = () => emit("update:modelValue", false);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="700">
    <v-card>
      <v-toolbar class="bg-light px-3 pt-3">
        <v-toolbar-title class="font-weight-black text-h5"
          >Usuário</v-toolbar-title
        >
        <v-spacer />
        <v-btn icon @click="close" variant="plain" :ripple="false">
          <v-icon>lucide:X</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-7 pb-6">
        <v-list class="py-4">
          <v-row>
            <v-col cols="12" md="6" class="py-0 px-0">
              <v-list-item>
                <v-list-item-title>
                  <b>Nome</b>
                </v-list-item-title>
                <v-list-item-subtitle>{{ data?.name }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6" class="py-0 px-0">
              <v-list-item>
                <v-list-item-title>
                  <b>Email</b>
                </v-list-item-title>
                <v-list-item-subtitle>{{ data?.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="py-0 px-0"
              v-if="data?.roles.length > 0"
            >
              <v-list-item>
                <v-list-item-title>
                  <b>Papéis</b>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="role in data?.roles"
                    class="me-2"
                    color="dark"
                    size="x-small"
                    badger
                    rounded
                    :key="role.id"
                  >
                    {{ role.name }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="py-0 px-0"
              v-if="data?.professionals.length > 0"
            >
              <v-list-item>
                <v-list-item-title>
                  <b>Profissionais</b>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="professional in data?.professionals"
                    class="me-2"
                    color="dark"
                    size="x-small"
                    badger
                    rounded
                    :key="professional.id"
                  >
                    {{ professional.name }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>

      <v-card-actions class="px-8 py-4 border-t">
        <v-chip
          class="mt-2 mb-2"
          :color="data?.is_active ? 'green' : 'red'"
          :prepend-icon="
            data?.is_active ? 'lucide:CircleCheck' : 'lucide:CircleX'
          "
          :text="data?.is_active ? 'Ativo' : 'Inativo'"
          size="x-small"
          badger
          rounded
        />

        <v-chip
          class="ms-2 mt-2 mb-2"
          color="dark"
          size="x-small"
          badger
          rounded
          prepend-icon="lucide:Clock"
        >
          Criado em {{ dayjs(data?.created_at).format("DD/MM/YYYY - HH:mm") }}
        </v-chip>

        <v-chip
          class="ms-2 mt-2 mb-2"
          color="dark"
          size="x-small"
          badger
          rounded
          prepend-icon="lucide:Clock"
        >
          Atualizado em
          {{ dayjs(data?.updated_at).format("DD/MM/YYYY - HH:mm") }}
        </v-chip>

        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUsersStore } from "@/stores/users";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue";
import UsersStoreDialog from "./UsersStoreDialog.vue";
import UsersUpdateDialog from "./UsersUpdateDialog.vue";
import UsersShowDialog from "./UsersShowDialog.vue";
import EmptyData from "@/components/EmptyData.vue";

onMounted(() => {
  store.getUsers();
});

const store = useUsersStore();
const selectedIdForDelete = ref(null);
const selectedIdForShow = ref(null);
const selectedIdForEdit = ref(null);

const showDialog = ref(false);
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(null);

const openCreateDialog = () => {
  createDialog.value = true;
};

const openEditDialog = (id) => {
  selectedIdForEdit.value = id;
  editDialog.value = true;
};

const openShowDialog = (id) => {
  selectedIdForShow.value = id;
  showDialog.value = true;
};

const openDeleteDialog = (id) => {
  selectedIdForDelete.value = id;
  deleteDialog.value.openModal();
};
</script>

<template>

  <ConfirmDeleteModal :itemId="selectedIdForDelete" :deleting="store.deleting" ref="deleteDialog"
    @confirm-delete="store.deleteUser" />

  <UsersStoreDialog v-model="createDialog" />
  <UsersUpdateDialog v-model="editDialog" :id="selectedIdForEdit" />
  <UsersShowDialog v-model="showDialog" :id="selectedIdForShow" />

  <v-row class="py-4">
    <v-col cols="12" md="3" class="py-0">
      <v-text-field v-model="store.search.name" @keyup="store.doResearch" prepend-inner-icon="lucide:Search"
        label="Pesquisar">
      </v-text-field>
    </v-col>

    <v-col cols="12" md="2" class="py-0">
      <v-select v-model="store.search.is_active" @update:model-value="store.doResearch" label="Status" :items="[
        { name: 'Todos', value: '' },
        { name: 'Ativo', value: '1' },
        { name: 'Inativo', value: '0' },
      ]" item-title="name" item-value="value">
      </v-select>
    </v-col>

    <v-col cols="12" md="7" class="py-0 mb-3">
      <v-btn variant="text" size="default" color="dark" icon="lucide:RefreshCw" @click="store.clearSearch">
      </v-btn>

      <v-btn prepend-icon="lucide:Plus" @click.prevent="openCreateDialog()" color="primary" variant="flat"
        class="float-end" text="Criar Usuário">
      </v-btn>
    </v-col>
  </v-row>

  <SkeletonLoader v-if="store.loading" />

  <div v-else>

    <EmptyData v-if="store.users.data.length <= 0" />

    <div v-else>
      <v-card v-for="user in store.users.data" :key="user.id" class="border rounded-lg pl-5 pr-2 py-3 my-3">
        <v-row class="d-flex align-center">
          <v-col cols="12" md="8">
            <p class="font-weight-bold">{{ user.name }}</p>
          </v-col>
          <v-col cols="12" md="1" class="text-md-center">
            <v-chip :color="user.is_active ? 'green' : 'red'" :text="user.is_active ? 'Ativo' : 'Inativo'"
              :prepend-icon="user.is_active ? 'lucide:CircleCheck' : 'lucide:CircleX'" size="x-small" badger
              rounded></v-chip>
          </v-col>
          <v-col cols="12" md="3" class="text-md-right">

            <v-tooltip text="Visualizar">
              <template #activator="{ props }">
                <v-btn @click.prevent="openShowDialog(user.id)" icon size="small" variant="text" color="dark"
                  v-bind="props">
                  <v-icon size="18">lucide:Eye</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Editar">
              <template #activator="{ props }">
                <v-btn @click.prevent="openEditDialog(user.id)" icon size="small" variant="text" color="dark"
                  v-bind="props">
                  <v-icon size="18">lucide:Pencil</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Excluir">
              <template #activator="{ props }">
                <v-btn @click="openDeleteDialog(user.id)" icon size="small" variant="text" color="dark" v-bind="props">
                  <v-icon size="18">lucide:Trash2</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

          </v-col>
        </v-row>
      </v-card>
    </div>

    <div class="text-center mt-3">
      <v-pagination v-if="store.users.meta.total > store.users.meta.per_page" @update:model-value="store.getUsers"
        v-model="store.users.meta.current_page" :length="store.users.meta.last_page"
        :total-visible="store.users.meta.per_page" prev-icon="lucide:ChevronLeft" next-icon="lucide:ChevronRight"
        size="small">
      </v-pagination>
    </div>
  </div>
</template>

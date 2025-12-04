<script setup>
import { onMounted, ref } from "vue";
import { useRolesStore } from "@/stores/roles";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue";
import RolesShowDialog from "./RolesShowDialog.vue";
import EmptyData from "@/components/EmptyData.vue";
import RolesFormDialog from "./RolesFormDialog.vue";

const store = useRolesStore();

onMounted(() => {
  store.getRoles();
});

const selectedIdForDelete = ref(null);
const selectedIdForShow = ref(null);

const formDialog = ref(false);
const formMode = ref("create");
const selectedFormId = ref(null);

const showDialog = ref(false);
const deleteDialog = ref(null);

const openCreateDialog = () => {
  formMode.value = "create";
  selectedFormId.value = null;
  formDialog.value = true;
};

const openEditDialog = (id) => {
  formMode.value = "edit";
  selectedFormId.value = id;
  formDialog.value = true;
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
  <ConfirmDeleteModal
    :itemId="selectedIdForDelete"
    :deleting="store.deleting"
    ref="deleteDialog"
    @confirm-delete="store.deleteUser"
  />

  <RolesFormDialog v-model="formDialog" :mode="formMode" :id="selectedFormId" />

  <RolesShowDialog v-model="showDialog" :id="selectedIdForShow" />

  <v-row class="py-4">
    <v-col cols="12" md="3" class="py-0">
      <v-text-field
        v-model="store.search.name"
        @keyup="store.doResearch"
        prepend-inner-icon="lucide:Search"
        label="Pesquisar"
      >
      </v-text-field>
    </v-col>

    <v-col cols="12" md="2" class="py-0">
      <v-select
        v-model="store.search.is_active"
        @update:model-value="store.doResearch"
        label="Status"
        :items="[
          { name: 'Todos', value: '' },
          { name: 'Ativo', value: '1' },
          { name: 'Inativo', value: '0' },
        ]"
        item-title="name"
        item-value="value"
      >
      </v-select>
    </v-col>

    <v-col cols="12" md="7" class="py-0 mb-3">
      <v-btn
        variant="text"
        size="default"
        color="dark"
        icon="lucide:RefreshCw"
        @click="store.clearSearch"
      >
      </v-btn>

      <v-btn
        v-can="'roles.store'"
        prepend-icon="lucide:Plus"
        @click.prevent="openCreateDialog()"
        color="primary"
        variant="flat"
        class="float-end"
        text="Criar Papel"
      >
      </v-btn>
    </v-col>
  </v-row>

  <SkeletonLoader v-if="store.loading" />

  <div v-else>
    <EmptyData v-if="store.roles.data.length <= 0" />

    <div v-else>
      <v-card
        v-for="role in store.roles.data"
        :key="role.id"
        class="border rounded-lg pl-5 pr-2 py-2 my-3"
      >
        <v-row class="d-flex align-center">
          <v-col cols="12" md="8">
            <p
              class="font-weight-bold cursor-pointer"
              @click.prevent="openShowDialog(role.id)"
            >
              {{ role.name }}
            </p>
          </v-col>
          <v-col cols="12" md="1" class="text-md-center">
            <v-chip
              :color="role.is_active ? 'green' : 'red'"
              :text="role.is_active ? 'Ativo' : 'Inativo'"
              :prepend-icon="
                role.is_active ? 'lucide:CircleCheck' : 'lucide:CircleX'
              "
              size="x-small"
              badger
              rounded
            ></v-chip>
          </v-col>
          <v-col
            cols="12"
            md="3"
            class="text-md-right"
            v-any="['roles.show', 'roles.update', 'roles.destroy']"
          >
            <v-tooltip text="Visualizar">
              <template #activator="{ props }">
                <v-btn
                  @click.prevent="openShowDialog(role.id)"
                  icon
                  size="small"
                  variant="text"
                  color="dark"
                  v-bind="props"
                  v-can="'roles.show'"
                >
                  <v-icon size="18">lucide:Eye</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Editar">
              <template #activator="{ props }">
                <v-btn
                  @click.prevent="openEditDialog(role.id)"
                  icon
                  size="small"
                  variant="text"
                  color="dark"
                  v-bind="props"
                >
                  <v-icon size="18">lucide:Pencil</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Excluir">
              <template #activator="{ props }">
                <v-btn
                  @click="openDeleteDialog(role.id)"
                  icon
                  size="small"
                  variant="text"
                  color="dark"
                  v-bind="props"
                  v-can="'roles.destroy'"
                >
                  <v-icon size="18">lucide:Trash2</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div class="text-center mt-3">
      <v-pagination
        v-if="store.roles.meta.total > store.roles.meta.per_page"
        @update:model-value="store.getRoles"
        v-model="store.roles.meta.current_page"
        :length="store.roles.meta.last_page"
        :total-visible="store.roles.meta.per_page"
        prev-icon="lucide:ChevronLeft"
        next-icon="lucide:ChevronRight"
        size="small"
      />
    </div>
  </div>
</template>

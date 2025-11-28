<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useDark, useToggle } from "@vueuse/core";
import { useRoute } from "vue-router";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const auth = useAuthStore();
const route = useRoute();
const isDrawerOpen = ref(true);

const pageTitle = computed(() => route.meta.title || "");
</script>

<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-navigation-drawer v-model="isDrawerOpen" class="px-2 pl-lg-4 pr-lg-6 app-sidebar" :width="300" elevation="0">
      <v-list>
        <v-list-item class="mt-3 mb-6">
          <v-app-bar-title class="font-weight-black">
            Vue Admin
          </v-app-bar-title>
        </v-list-item>
      </v-list>

      <v-list nav>

        <v-list-item prepend-icon="lucide:Home" :to="{ name: 'dashboard.index' }" title="Dashboard" density="compact">
          <template v-slot:prepend>
            <v-icon size="20"></v-icon>
          </template>
        </v-list-item>

        <v-list-subheader v-any="['roles.index', 'users.index']" class="text-uppercase">
          Controle de Acessos
        </v-list-subheader>

        <v-list-item v-can="'roles.index'" :to="{ name: 'roles.index' }" prepend-icon="lucide:ShieldUser" title="Papéis"
          density="compact">
          <template v-slot:prepend>
            <v-icon size="20"></v-icon>
          </template>
        </v-list-item>

        <v-list-item v-can="'users.index'" :to="{ name: 'users.index' }" prepend-icon="lucide:Users" title="Usuários"
          density="compact">
          <template v-slot:prepend>
            <v-icon size="20"></v-icon>
          </template>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list nav class="mb-4">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="lucide:User" append-icon="lucide:ChevronsUpDown"
                :title="auth.user?.name" :ripple="false">
                <template v-slot:prepend>
                  <v-icon size="20"></v-icon>
                </template>
                <template v-slot:append>
                  <v-icon size="16"></v-icon>
                </template>
              </v-list-item>
            </template>
            <v-list nav :lines="false" density="compact" min-width="200px" class="border rounded-lg mb-2" elevation="0">
              <v-list-item link :to="{ name: 'profile' }">
                <v-icon icon="lucide:CircleUser" size="16" class="mt-n1"></v-icon>
                Minha Conta
              </v-list-item>
              <v-list-item link @click.prevent="auth.logout">
                <v-icon icon="lucide:Power" size="16" class="mt-n1"></v-icon>
                Sair
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-responsive>
      <v-main>
        <v-container fluid class="px-lg-16 py-lg-6 px-6">
          <div class="px-lg-8">
            <v-row class="">
              <v-col class="d-flex align-center ml-n2 pb-0 mb-0" cols="auto">
                <v-btn variant="text" @click="isDrawerOpen = !isDrawerOpen" :icon="isDrawerOpen ? 'lucide:PanelLeft' : 'lucide:PanelLeftOpen'
                  " size="small" color="dark">
                </v-btn>
                <h2 class="mb-4_ font-weight-black ml-1">
                  {{ pageTitle }}
                </h2>
              </v-col>
              <v-spacer></v-spacer>

              <v-col class="d-flex align-center mr-n2 pb-0 mb-0" cols="auto">
                <div class="me-1">
                  <v-btn variant="text" icon="lucide:Bell" size="small" color="dark" />
                </div>
                <div class="me-1">
                  <v-btn variant="text" @click="toggleDark()" :icon="isDark ? 'lucide:MoonStar' : 'lucide:Sun'"
                    size="small" color="dark" />
                </div>
              </v-col>
            </v-row>
            <v-row class="mb-8">
              <v-col cols="12">
                <v-breadcrumbs class="py-0 px-0">
                  <v-breadcrumbs-item :to="'/panel'"> Dashboard </v-breadcrumbs-item>
                  <v-breadcrumbs-divider>
                    <v-icon size="16" class="mb-1" icon="lucide:ChevronRight" />
                  </v-breadcrumbs-divider>
                  <v-breadcrumbs-item disabled> {{ pageTitle }} </v-breadcrumbs-item>
                </v-breadcrumbs>
              </v-col>
            </v-row>
            <router-view />
          </div>
        </v-container>
      </v-main>
    </v-responsive>
  </v-app>
</template>

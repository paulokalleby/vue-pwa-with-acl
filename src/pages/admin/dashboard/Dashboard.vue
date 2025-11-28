<script setup>
import { useAuthStore } from "@/stores/auth.js";
const auth = useAuthStore();
</script>

<template>

  <v-row>
    <v-col cols="12" md="3">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:Layers" subtitle="Categorias">
        <v-card-text>
          <h1>10</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:Box" subtitle="Produtos">
        <v-card-text>
          <h1>14</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:ShieldUser" subtitle="Papéis">
        <v-card-text>
          <h1>02</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:Users" subtitle="Usuários">
        <v-card-text>
          <h1>03</h1>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:CircleDollarSign" subtitle="Faturado">
        <v-card-text>
          <h1>R$ 30.000,00</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="border rounded-md soft-shadow px-2 py-2" append-icon="lucide:BanknoteArrowDown"
        subtitle="Valores a Receber">
        <v-card-text>
          <h1>R$ 15.000,00</h1>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="12">
      <v-card class="py-3 px-3 border bg-light rounded-md soft-shadow">
        <v-card-title>
          <v-icon class="me-1 mb-1" icon="lucide:User" size="22"></v-icon>
          {{ auth.user.name }}
        </v-card-title>

        <v-card-text class="py-0">
          <p>{{ auth.user.email }}</p>
        </v-card-text>

        <v-card-actions class="pb-0">
          <v-btn color="primary" variant="text" prepend-icon="lucide:Power" text="Sair"
            @click.prevent="auth.logout"></v-btn>
          <v-btn color="primary" variant="text" prepend-icon="lucide:SquarePen" text="Editar Perfil"
            :to="{ name: 'profile' }">
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

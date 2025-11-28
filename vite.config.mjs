import { URL, fileURLToPath } from "node:url";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Plugins
import Components from "unplugin-vue-components/vite";
import ViteFonts from "unplugin-fonts/vite";
import Vue from "@vitejs/plugin-vue";
// Utilities
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify(),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  },
  optimizeDeps: {
    include: [
      "vuetify/components/VSwitch",
      "vuetify/components/VAlert",
      "vuetify/components/VDivider",
      "vuetify/components/VCheckbox",
      "vuetify/components/VExpansionPanel",
      "vuetify/components/VForm",
      "vuetify/components/VAppBar",
      "vuetify/components/VBtn",
      "vuetify/components/VGrid",
      "vuetify/components/VIcon",
      "vuetify/components/VList",
      "vuetify/components/VMain",
      "vuetify/components/VMenu",
      "vuetify/components/VNavigationDrawer",
      "vuetify/components/VBreadcrumbs",
      "vuetify/components/VCard",
      "vuetify/components/VResponsive",
      "vuetify/components/VTextField",
      "vuetify/components/VChip",
      "vuetify/components/VPagination",
      "vuetify/components/VSelect",
      "vuetify/components/VTable",
      "vuetify/components/VDialog",
      "vuetify/components/VCombobox",
      "vuetify/components/VTextarea",
      "vuetify/components/transitions",
      "vuetify/components/VApp",
      "vuetify/components/VProgressCircular",
      "vuetify/components/VImg",
      "vuetify/components/VOtpInput",
      "vuetify/components/VSkeletonLoader",
      "vuetify/components/VTooltip",
    ],
  },
});

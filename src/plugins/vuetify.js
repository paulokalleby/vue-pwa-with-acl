import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";
import * as lucideIcons from "lucide-vue-next";

import { createVuetify } from "vuetify";
import { h } from "vue";
import { md3 } from "vuetify/blueprints";
import { mdi } from "vuetify/iconsets/mdi";
import { size } from "lodash";

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: "mdi",
    aliases: {
      dropdown: "lucide:ChevronDown",
    },
    sets: {
      mdi,
      lucide: {
        component: (props) => {
          const iconName = props.icon.replace(/^lucide:/, "");
          const LucideIcon = lucideIcons[iconName];
          return LucideIcon ? h(LucideIcon) : h("span", {}, `?${iconName}`);
        },
      },
    },
  },
  defaults: {
    global: {
      ripple: true,
    },
    VNavigationDrawer: {
      VList: {
        rounded: "none",
        VListItem: {
          rounded: "lg",
          color: "primary",
          class: "custom-list-item",
        },
      },
    },
    VAppBar: {
      //density: "comfortable",
      elevation: 0,
      rounded: false,
      VAppBarNavIcon: {
        rounded: "sm",
      },
    },
    VCard: {
      elevation: 0,
      class: "soft-shadow",
    },
    VTextField: {
      color: "primary",
      variant: "outlined",
      rounded: "lg",
      density: "comfortable",
      flat: true,
      clearIcon: "lucide:CircleX",
    },
    VNumberInput: {
      color: "primary",
      variant: "outlined",
      rounded: "lg",
      density: "comfortable",
      flat: true,
      clearIcon: "lucide:CircleX",
      VBtn: {
        rounded: "",
        variant: "",
        class: "text-subtitle-2",
      },
    },
    VTextarea: {
      color: "primary",
      variant: "outlined",
      rounded: "lg",
      density: "comfortable",
      flat: true,
    },
    VSelect: {
      color: "primary",
      variant: "outlined",
      rounded: "lg",
      density: "comfortable",
      flat: true,
      clearIcon: "lucide:CircleX",
    },
    VCombobox: {
      color: "primary",
      variant: "outlined",
      rounded: "lg",
      density: "comfortable",
      flat: true,
      clearIcon: "lucide:CircleX",
    },
    VSwitch: {
      color: "primary",
      density: "comfortable",
      ripple: false,
      flat: true,
    },
    VCheckbox: {
      color: "primary",
      density: "comfortable",
      ripple: false,
      flat: true,
    },
    VBtn: {
      rounded: "lg",
      variant: "flat",
      class: "text-subtitle-2 font-weight-black",
      flat: true,
      size: "large",
    },
    VBreadcrumbs: {
      //divider: "/",
      density: "comfortable",
      class: "text-body-2",
      //color: "primary"
    },
    VTable: {
      hover: true,
    },
    VPagination: {
      color: "dark",
    },
  },
  components: {
    ...labs,
    ...components,
  },
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#0A0A0A",
          'on-primary': '#FFFFFF',
          secondary: "#f9f9f9",
          danger: "#ef4444",
          success: "#00BB85",
          info: "#3b82f6",
          warning: "#f97316",
          background: "#FAFAFA",
          surface: "#fff",
          sidebar: "#FAFAFA",
          light: "#fff",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#FFFFFF",
          'on-primary': '#0A0A0A',
          secondary: "#121416",
          danger: "#ef4444",
          success: "#00BB85",
          info: "#3b82f6",
          warning: "#f97316",
          background: "#09090B",
          surface: "#18181B",
          sidebar: "#09090B",
          light: "#18181B",
        },
      },
    },
  },
});

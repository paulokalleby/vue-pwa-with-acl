import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

export const hasPermission = (permission) => {
  const auth = useAuthStore();
  const permissions = auth.user.permissions;

  if (auth.user.is_admin) return true;

  return permissions.includes(permission);
};

export const hasAnyPermission = (requiredPermissions) => {
  const auth = useAuthStore();
  const userPermissions = auth.user.permissions;

  if (auth.user.is_admin) return true;

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

export const priceWithCurrency = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const priceWithoutCurrency = (value) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const directiveCan = {
  mounted(el, binding) {
    if (!hasPermission(binding.value)) {
      el.style.display = "none";
    }
  },
};

export const directiveAny = {
  mounted(el, binding) {
    if (!hasAnyPermission(binding.value)) {
      el.style.display = "none";
    }
  },
};

export const redirectToLogin = () => {
  const router = useRouter();
  router.push({ name: "auth.login" });
};

export const generateYears = (startYear = 1900, addOneYear = false) => {
  const currentYear = new Date().getFullYear() + (addOneYear ? 1 : 0);
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(value));
};

export const getImageSrc = (image) => {
  return image
    ? image
    : new URL("@/assets/img/placeholder.png", import.meta.url).href;
};

export const getImagePlaceholder = () => {
  return new URL("@/assets/img/placeholder.png", import.meta.url).href;
};

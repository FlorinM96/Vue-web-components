<template>
  <button
    v-if="!to"
    type="button"
    v-bind="attributes"
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    :style="{ padding: overridePadding, width, height, overrideStyle }"
  >
    <slot />
  </button>
  <router-link v-else :to="to">
    <button
      type="button"
      v-bind="attributes"
      :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--arrow': arrow }]"
      :style="{ padding: overridePadding, width, height, overrideStyle }"
    >
      <slot />
    </button>
  </router-link>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      },
    },
    to: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "outline", "text"].includes(value);
      },
    },
    icon: {
      type: String,
      default: "",
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    overrideWidth: {
      type: String,
      default: "",
    },
    overrideHeight: {
      type: String,
      default: "",
    },
    overridePadding: {
      type: String,
      default: "",
    },
    overrideStyle: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    width() {
      return this.overrideWidth ? "100%" : "";
    },
    height() {
      return this.overrideHeight ? "100%" : "";
    },
    attributes() {
      const result = {};
      if (this.icon) result["data-icon"] = this.icon;
      if (this.disabled) result.disabled = "";
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>

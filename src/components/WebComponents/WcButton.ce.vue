<template>
  <button
    :disabled="disabled"
    type="button"
    :class="['btn', mode, size, { rounded }, { border }]"
    @click="$emit('click')"
    :style="{ padding: overridePadding, width, height, overrideStyle }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "wc-button",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "main"
    },
    size: {
      type: String,
      default: "medium"
    },
    rounded: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    overrideWidth: {
      type: String,
      default: ""
    },
    overrideHeight: {
      type: String,
      default: ""
    },
    overridePadding: {
      type: String,
      default: ""
    },
    overrideStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    width() {
      return this.overrideWidth ? "100%" : "";
    },
    height() {
      return this.overrideHeight ? "100%" : "";
    }
  }
};
</script>

<style lang="scss">
.btn {
  cursor: pointer;

  align-items: center;
  border-radius: 32px;
  border-style: solid;
  border-width: 2px;
  display: flex;
  justify-content: center;
  background-clip: padding-box;
  background-color: var(--wc-color-primary-400);
  border-color: transparent;
  color: var(--wc-color-base-white);
  &:hover {
    background-color: var(--wc-color-primary-500);
  }
  &:focus {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--wc-color-primary-400);
  }
  &.small {
    padding: 6px 20px;
    font: var(--wc-paragraph4-medium-font);
  }
  &.medium {
    padding: 14px 55px;
    font: var(--wc-paragraph2-medium-font);
  }
  &.big {
    padding: 17.5px 70px;
    font: var(--button-large-font);
  }

  &[disabled] {
    background: var(--wc-color-gray-300);
    color: var(--wc-color-misc-disabled);
    pointer-events: none;
  }
}
</style>

<template>
  <button
    :disabled="disabled"
    type="button"
    :class="['btn', variant, size]"
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
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "outline", "text"].includes(value);
      }
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
  border-color: transparent;

  &.primary {
    background-color: var(--wc-color-primary-400);
    color: var(--wc-color-base-white);
    &:hover {
      background-color: var(--wc-color-primary-500);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--wc-color-primary-400);
    }
  }
  &.secondary {
    background-color: var(--wc-color-secondary-500);
    color: var(--wc-color-primary-500);
    &:hover {
      background-color: var(--wc-color-secondary-600);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--wc-color-secondary-500);
    }
  }
  &.outline {
    background-color: transparent;
    color: var(--wc-color-primary-500);
    border: 1px solid var(--wc-color-primary-200);
    &:hover {
      background-color: var(--wc-color-primary-50);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--wc-color-primary-400);
    }
  }
  &.text {
    background-color: transparent;
    color: var(--wc-color-primary-500);
    &:hover {
      background-color: var(--wc-color-primary-50);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--wc-color-primary-400);
    }
  }

  &.small {
    padding: 6px 20px;
    font: var(--wc-paragraph4-medium-font);
  }
  &.medium {
    padding: 14px 55px;
    font: var(--wc-paragraph2-medium-font);
  }
  &.large {
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

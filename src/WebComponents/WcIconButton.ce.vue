<template>
  <button :class="['button', size, variant, { disabled }]">
    <app-icon :icon="icon" class="icon" />
  </button>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "wc-icon-button",
  components: {
    AppIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "large",
      validator(value) {
        return ["medium", "large"].includes(value);
      }
    },
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "outline", "text"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.button {
  // reset default values
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
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
}

.medium {
  padding: 12px;
}
.large {
  padding: 16px;
  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>

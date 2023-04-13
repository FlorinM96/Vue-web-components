<template>
  <button v-if="!to" :class="['app-icon-button', size, variant, { disabled }]">
    <prime-icon :icon="icon" class="button-icon" />
  </button>
  <router-link v-else :to="to" :class="['app-icon-button', size, variant, { disabled }]">
    <prime-icon :icon="icon" class="button-icon" />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "large",
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
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.app-icon-button {
  background: none;
  color: inherit;
  padding: 0;
  font: inherit;
  outline: inherit;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  background-clip: padding-box;
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  &.primary {
    background-color: var(--color-primary-400);
    color: var(--color-base-white);
    &:hover {
      background-color: var(--color-primary-500);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-primary-400);
    }
  }
  &.secondary {
    background-color: var(--color-secondary-500);
    color: var(--color-primary-500);
    &:hover {
      background-color: var(--color-secondary-600);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-secondary-500);
    }
  }
  &.outline {
    background-color: transparent;
    color: var(--color-primary-500);
    border: 1px solid var(--color-primary-200);
    &:hover {
      background-color: var(--color-primary-50);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-primary-400);
    }
  }
  &.text {
    background-color: transparent;
    color: var(--color-primary-500);
    &:hover {
      background-color: var(--color-primary-50);
    }
    &:focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-primary-400);
    }
  }
}

.medium {
  padding: 12px;
}
.small {
  padding: 6px;
}
.large {
  padding: 16px;
  .button-icon {
    width: 30px;
    height: 30px;
  }
}
</style>

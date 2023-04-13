<template>
  <div :class="['toggle-wrapper', { disabled }]" @click="handleClick">
    <div :class="['app-toggle', `toggle--${size}`, { active: modelValue }, variant]">
      <span :class="['toggle--span', { active: modelValue }]" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: "small",
      validator(value) {
        return ["small", "large"].includes(value);
      },
    },
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  &.disabled {
    pointer-events: none;
    .toggle {
      background-color: var(color-gray-500) !important;
    }
  }
}
.app-toggle {
  position: relative;
  border-radius: 48px;
  background-color: var(--color-gray-500);
  cursor: pointer;
  outline: 2px solid transparent;
  outline-offset: 2px;
  &.active {
    &.primary {
      background-color: var(--color-primary-400);
    }
    &.secondary {
      background-color: var(--color-secondary-500);
    }
    .toggle--span {
      left: calc(100% - 2px);
      transform: translateX(-100%) translateY(-50%);
    }
  }
}

.toggle--small {
  width: 36px;
  height: 20px;
  .toggle--span {
    width: 16px;
    height: 16px;
  }
}

.toggle--large {
  width: 56px;
  height: 30px;
  .toggle--span {
    width: 26px;
    height: 26px;
  }
}
.toggle--span {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 50%;
  transition: all 0.2s;
}
</style>

<template>
  <div class="appcheckbox">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="checkbox-text-wrapper">
      <div class="checkbox" :class="{ 'checkbox--checked': modelValue }" @click="check">
        <prime-icon class="checkbox-icon" icon="check" />
      </div>
      <span v-if="checkboxText" class="text">{{ checkboxText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    uncheck: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checkboxText: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },
  methods: {
    check() {
      if (this.uncheck || !this.modelValue) {
        this.$emit("update:modelValue", !this.modelValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-text-wrapper {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
}
.label {
  font: var(--paragraph4-regular-font);
  color: #1c1c1c;
}
.text {
  font: var(--paragraph3-regular-font);
  color: var(--color-primary-700);
  margin-left: 0.8rem;
  margin-top: 0.1rem;
}
.checkbox {
  cursor: pointer;
  border: 2px solid var(--color-gray-800);
  border-radius: 3px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox--checked {
  background-color: var(--color-primary-accent-500);
  border-color: var(--color-primary-accent-500);
  .checkbox-icon {
    transform: scale3d(1, 1, 1);
  }
}
.checkbox-icon {
  width: 2rem;
  height: 2rem;
  color: white;
  transform: scale3d(0, 0, 0);
  transition: transform 0.25s;
}
</style>

<template>
  <div class="app-checklist">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="options">
      <prime-checkbox
        v-for="(option, i) in options"
        :key="i"
        class="option"
        :checkbox-text="option"
        :modelValue="modelValue?.includes(option)"
        @update:modelValue="itemClick(i, $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Array, null],
      default: []
    },
    options: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  },
  methods: {
    itemClick(index, value) {
      const option = this.options[index];
      const modelValue = this.modelValue === null ? [] : this.modelValue;
      this.$emit("update:modelValue", value ? [...modelValue, option] : modelValue.filter((x) => x !== option));
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  font: var(--paragraph4-regular-font);
  color: #1c1c1c;
}
.options {
  display: flex;
  flex-direction: column;
}
</style>

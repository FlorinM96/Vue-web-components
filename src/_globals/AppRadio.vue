<template>
  <div class="app-radio" :class="{ disabled }">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="options">
      <div class="option" v-for="(option, i) in options" :key="i" @click="select(i)">
        <span :class="['radio-icon', { active: modelValue === option }]" />
        <span class="value-text">{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  watch: {
    options() {
      // if value is not in options select default first option
      if (this.modelValue && this.options.length && !this.options.includes(this.modelValue)) this.select(0);
    },
  },
  mounted() {
    if (!this.modelValue && this.options.length) this.select(0);
  },
  methods: {
    select(i) {
      this.$emit("update:modelValue", this.options[i]);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-radio {
  color: var(--color-primary-800);
  &.disabled {
    pointer-events: none;
  }
}
.label {
  font: var(--paragraph4-regular-font);
  color: #1c1c1c;
  margin: 0 0 0.8rem;
}
.options {
  display: flex;
  flex-direction: column;
}
.option {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  &:hover .radio-icon {
    border: 2px solid var(--color-primary-400);
  }
  .radio-icon {
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    border: 2px solid var(--color-gray-800);
    border-radius: 50%;
    background-color: transparent;
    margin-right: 0.8rem;
    &.active {
      border: 2px solid var(--color-primary-400);
      &:after {
        content: " ";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--color-primary-400);
      }
    }
  }
  .value-text {
    font: var(--paragraph3-regular-font);
    color: var(--color-primary-700);
  }
}
</style>

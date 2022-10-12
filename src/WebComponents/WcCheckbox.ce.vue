<template>
  <div class="appcheckbox">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="checkbox-text-wrapper">
      <div class="checkbox" :class="{ 'checkbox--checked': value }" @click="check">
        <app-icon class="icon" icon="check" />
      </div>
      <span v-if="text" class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "wc-checkbox",
  components: { AppIcon },
  props: {
    value: {
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
    text: {
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
      if (this.uncheck || !this.value) {
        this.$emit("change", !this.value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-text-wrapper {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.label {
  font: var(--wc-paragraph4-regular-font);

  color: #1c1c1c;
}
.text {
  font: var(--wc-paragraph3-regular-font);
  color: var(--wc-color-primary-700);
  margin-left: 8px;
  margin-top: 1px;
}
.checkbox {
  cursor: pointer;
  border: 2px solid var(--wc-color-gray-800);
  border-radius: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox--checked {
  background-color: var(--wc-color-primary-400);
  border-color: var(--wc-color-primary-400);
  .icon {
    transform: scale3d(1, 1, 1);
  }
}
.icon {
  width: 20px;
  height: 20px;
  color: white;
  transform: scale3d(0, 0, 0);
  transition: transform 0.25s;
}
</style>

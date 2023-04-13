<template>
  <div :class="['alert', `alert--${variant}`, { 'alert--border': border, 'alert--fixed': fixedPosition }]">
    <div class="alert__content">
      <span v-if="title" class="alert__title">{{ title }}</span>
      <span v-if="description" class="alert__text">{{ description }}</span>
    </div>
    <button v-if="okButton" type="button" class="btn btn--small btn--outline alert__button" @click="$emit('close')">OK</button>
    <span v-else-if="closeIcon" class="alert__close" @click="$emit('close')">close</span>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "positive",
      validator: (val) => {
        return ["positive", "neutral", "informative", "notice", "negative"].includes(val);
      }
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: Boolean,
      default: true
    },
    okButton: {
      type: Boolean,
      default: false
    },
    fixedPosition: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        this.validateProps();
      }
    }
  },
  mounted() {
    if (!this.closeIcon) {
      // unmount after x time
    }
  },
  methods: {
    validateProps() {
      if (!this.title && !this.description) {
        console.error("Please add either email or phone props");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

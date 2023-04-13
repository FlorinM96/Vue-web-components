<template>
  <div :class="['logo', color]" @mouseover="enterHover" @mouseleave="leaveHover">
    <app-icon :icon="color === 'dark' ? 'signicat-logo-dark' : 'signicat-logo-light'" class="logo-icon" />
    <div ref="left" class="left" />
    <div ref="right" class="right" />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "dark",
    },
  },
  mounted() {
    this.tween = gsap.timeline({ paused: true });
    this.tween.add("start").to(this.$refs.left, { duration: 0.25, borderRadius: "0", scale: 0.9237 }, "start").to(
      this.$refs.right,
      {
        duration: 0.25,
        borderRadius: "50%",
        scale: 1.0826,
      },
      "start"
    );
  },
  methods: {
    enterHover() {
      this.tween.play();
    },
    leaveHover() {
      this.tween.reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 74.13px;
  min-width: 76.13px;
  &.dark {
    .left,
    .right {
      background-color: var(--color-primary-500);
    }
  }
  &.light {
    .left,
    .right {
      background-color: white;
    }
  }
}

.left {
  height: 39.61px;
  min-width: 39.61px;
  border-radius: 50%;
}
.right {
  height: 36.58px;
  min-width: 36.58px;
  transform: scale(1) translateX(-8.26%);
}
.logo-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>

<template>
  <div class="app-tooltip">
    <div class="anchor">
      <slot name="anchor">
        <app-icon icon="info" class="info-icon" />
      </slot>
    </div>
    <div :class="['content', `position__${direction}`]">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "top",
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: add all posibilities
.app-tooltip {
  &:hover .content {
    display: block;
  }
}
.app-tooltip,
.anchor {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-icon {
  height: 2rem;
  width: 2rem;
}
.content {
  font: var(--paragraph4-regular-font);
  display: none;
  position: absolute;
  z-index: 5;
  background-color: #26293f;
  color: white;
  padding: 1.2rem;
  border-radius: 0.8rem;
  min-width: 20rem;
  white-space: pre;
  &.position__top {
    top: -10px;
    left: 50%;
    transform: translate(-50%, -100%);
    &:after {
      content: "▼";
      color: #26293f;
      position: absolute;
      left: 50%;
      top: 100%;
      font-size: 1rem;
      max-height: 1rem;
      display: flex;
      align-items: center;
      transform: translate(-50%, -20%);
    }
  }
}
</style>

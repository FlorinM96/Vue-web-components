<template>
  <div class="popup-bg">
    <div class="popup">
      <app-icon v-if="!closeDisabled" icon="close" class="close-button" @click="$emit('close')" />
      <slot />
    </div>
  </div>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "wc-popup",
  components: {
    AppIcon
  },
  props: {
    closeDisabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  z-index: 10;
}
.popup {
  z-index: 11;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  background: white;
  max-height: calc(100% - 85px);
  overflow: auto;
  flex-grow: 1;
  border-radius: 8px;
}
.close-button {
  cursor: pointer;
  position: absolute;
  right: 14px;
  top: 14px;
  stroke: var(--wc-color-gray-800);
  &:hover {
    background: var(--wc-color-gray-100);
  }
}
</style>

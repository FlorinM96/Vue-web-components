<template>
  <div class="app-collapsable-item">
    <div class="title-wrapper" @click="open = !open">
      <div class="title-arrow">
        <prime-icon :icon="'arrow-down'" :class="['collapsable-item-icon', { open }]" />
        <span class="title"> <slot name="title"></slot> </span>
      </div>
      <prime-icon v-if="removeEnabled" icon="bin" class="remove-icon" @click="$emit('remove')" />
    </div>
    <div class="item-body" :class="{ open }">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    removeEnabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    open: true
  })
};
</script>

<style lang="scss" scoped>
.app-collapsable-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-test-menu-links);
  border-radius: 0.5rem;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.4rem 0.2rem;
  background-color: var(--color-test-menu-links);
  color: white;
}
.title-arrow {
  display: flex;
  align-items: center;
}
.collapsable-item-icon {
  transition: all 0.25s;
  transform: rotate(-90deg);

  &.open {
    transform: rotate(0deg);
  }
}
.title {
  font: var(--paragraph4-regular-font);
  color: white;
}
.item-body {
  transition: all 0.25s;
  max-height: 0;
  padding: 0rem;
  overflow: hidden;

  &.open {
    max-height: 100rem;
    padding: 1rem;
    overflow: visible;
  }
}
.remove-icon {
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  &:hover {
  }
}
</style>

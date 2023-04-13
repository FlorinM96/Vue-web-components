<template>
  <div class="tabs">
    <span v-for="(tab, i) in tabs" :key="i" :class="['tab', { active: selectedIndex === i }]" @click="$emit('select', i)">
      {{ tab.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.tab {
  font: var(--paragraph3-regular-font);
  cursor: pointer;
  color: var(--color-primary-500);
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  &:not(:nth-last-child(1)) {
    margin-right: 2rem;
  }
  &.active {
    font: var(--paragraph3-bold-font);
    background-color: var(--color-primary-200);
  }
  &:hover {
    background-color: var(--color-primary-200);
  }
}
</style>

<template>
  <div class="tabs">
    <span v-for="(tab, i) in tabs" :key="i" :class="['tab', { active: selected === i }]" @click="$emit('select', i)">
      {{ tab.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "wc-tabs",
  props: {
    tabs: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.tab {
  font: var(--wc-paragraph3-regular-font);
  cursor: pointer;
  color: var(--wc-color-gray-800);
  border-bottom: 2px solid var(--wc-color-gray-600);
  padding: 8.5px 16px 8.5px 0;

  &.active {
    color: var(--wc-color-primary-400);
    border-bottom: 2px solid var(--wc-color-primary-400);
  }
  &:hover {
    color: var(--wc-color-primary-300);
    border-bottom: 2px solid var(--wc-color-primary-300);
  }
}
</style>

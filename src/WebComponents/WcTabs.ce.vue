<template>
  <div class="tabs">
    <span v-for="(tab, i) in tabs" :key="i" :class="['tab', { active: selectedIndex === i }]" @click="$emit('select', i)">
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
    selectedIndex: {
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
  color: var(--wc-color-primary-500);
  padding: 6px 10px;
  border-radius: 5px;
  &:not(:nth-last-child(1)) {
    margin-right: 20px;
  }
  &.active {
    font: var(--wc-paragraph3-bold-font);
    background-color: var(--wc-color-primary-200);
  }
  &:hover {
    background-color: var(--wc-color-primary-200);
  }
}
</style>

<template>
  <div
    class="app-dropzone"
    :class="{
      'is-dragging': isDragging === elementType,
      'is-dragging-over': isDragging === elementType && isDraggingOver,
    }"
    @dragenter="isDraggingOver = true"
    @dragleave="isDraggingOver = false"
    @dragover.prevent
  >
    <slot />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useFlowStore } from "@/store/flow.js";
export default {
  props: {
    elementType: {
      type: String,
      default: "input",
    },
  },
  data: () => ({
    isDraggingOver: false,
  }),
  watch: {
    isDragging(newVal) {
      if (!newVal) this.isDraggingOver = false;
    },
  },
  computed: {
    ...mapState(useFlowStore, ["isDragging"]),
  },
};
</script>

<style lang="scss" scoped>
.app-dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1.6rem;
  min-width: 40rem;
  margin: 1rem 0;
  border-radius: 4px;
  transition: all 0.25s;
  &.is-dragging {
    border: 2px dashed var(--color-test-menu-links);
  }
  &.is-dragging-over {
    background: #dfd9e7;
    min-height: 6rem;
  }
}
</style>

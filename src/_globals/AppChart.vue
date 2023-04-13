<template>
  <canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 50,
    },
  },
};
</script>

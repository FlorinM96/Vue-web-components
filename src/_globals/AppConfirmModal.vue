<template>
  <app-popup>
    <h5 class="popup-title">{{ title }}</h5>
    <p v-if="description" class="popup-description">{{ description }}</p>
    <div class="buttons">
      <app-button class="button" @click="$emit('confirm')">Yes</app-button>
      <app-button class="button" @click="$emit('cancel')">No</app-button>
    </div>
  </app-popup>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <prime-popup>
    <h5 class="popup-title">{{ title }}</h5>
    <p v-if="description" class="popup-description">{{ description }}</p>
    <div class="buttons">
      <prime-button class="button" @click="$emit('confirm')">Yes</prime-button>
      <prime-button class="button" @click="$emit('cancel')">No</prime-button>
    </div>
  </prime-popup>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>

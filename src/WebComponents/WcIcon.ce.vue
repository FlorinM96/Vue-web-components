<template>
  <app-icon v-bind="$props" />
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "wc-icon",
  components: {
    AppIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  }
};
</script>

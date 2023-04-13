<template>
  <component :is="`Icon${icon}`" v-bind="{ ...$attrs, ...$props }" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <svg viewBox="0 0 24 24" v-bind="{ width, height }" v-html="displayIcon"></svg>
</template>

<script>
export default {
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
  },
  data: () => ({
    icons: [
      {
        name: "arrow-up",
        svg: `<path d="M7.41 15.705L12 11.125L16.59 15.705L18 14.295L12 8.295L6 14.295L7.41 15.705Z" fill="currentColor"/>`
      },
      {
        name: "arrow-down",
        svg: `<path d="M7.41 8.295L12 12.875L16.59 8.295L18 9.705L12 15.705L6 9.705L7.41 8.295Z" fill="currentColor"/>`
      },
      {
        name: "check",
        svg: `<path d="M8.8 15.9L4.6 11.7L3.2 13.1L8.8 18.7L20.8 6.7L19.4 5.3L8.8 15.9Z" fill="currentColor"/>`
      },
      {
        name: "help",
        svg: '<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="currentColor"/>'
      }
    ]
  }),
  computed: {
    displayIcon() {
      return this.icons.find((x) => x.name === this.icon)
        ? this.icons.find((x) => x.name === this.icon).svg
        : this.icons.find((x) => x.name === "help").svg;
    }
  }
};
</script>

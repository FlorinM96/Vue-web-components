<template>
  <svg viewBox="0 0 24 24" v-bind="$props" fill="currentColor" v-html="displayIcon"></svg>
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
        name: "close",
        svg: `<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>`
      },
      {
        name: "file-upload",
        svg: `<path d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z" fill="currentColor"/>`
      },
      {
        name: "help",
        svg: '<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="currentColor"/>'
      },
      {
        name: "calendar",
        svg: '<path d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V10H20V21ZM20 8H4V5H20V8Z" fill="currentColor"/>'
      },
      {
        name: "arrow-left",
        svg: '<path d="M16.2049 16.59L11.6249 12L16.2049 7.41L14.7949 6L8.79492 12L14.7949 18L16.2049 16.59Z" fill="currentColor"/>'
      },
      {
        name: "arrow-right",
        svg: '<path d="M8.5 16.59L13.08 12L8.5 7.41L9.91 6L15.91 12L9.91 18L8.5 16.59Z" fill="currentColor"/>'
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

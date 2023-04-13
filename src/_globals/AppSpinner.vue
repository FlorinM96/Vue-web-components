<template>
  <span class="app-spinner">
    <svg class="spinner__svg" :width="width" :height="width" :viewBox="viewBox">
      <g :transform="transform">
        <circle class="spinner__circle" :class="uniqClass" :stroke-width="strokeWidth" :x="pos" :y="pos" :r="radius" />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "md",
      validator: (v) => ["sm", "md", "lg", "xxl"].find((it) => it === v),
    },
  },
  data: () => ({
    sizes: { sm: 20, md: 40, lg: 80, xxl: 160 },
  }),
  computed: {
    viewBox() {
      const ratio = 0.825 * this.sizes[this.size];
      return [0, 0, ratio, ratio].join(" ");
    },
    width() {
      return this.sizes[this.size] + "px";
    },
    transform() {
      const ratio = (0.825 * this.sizes[this.size]) / 2;
      return `translate(${ratio}, ${ratio})`;
    },
    pos() {
      return -0.125 * this.sizes[this.size];
    },
    radius() {
      return 0.25 * this.sizes[this.size];
    },
    strokeWidth() {
      const ratio = 0.05 * this.sizes[this.size];
      return ratio < 1 ? 1 : ratio;
    },
    uniqClass() {
      return "--" + this.size;
    },
  },
};
</script>

<style lang="scss" scoped>
$spinner-stroke-dasharrays: (
  sm: 31,
  md: 62,
  lg: 125,
  xxl: 250,
);
$spinner-color: var(--color-primary-400) !default;

.app-spinner {
  .spinner__svg {
    animation: 1.4s circle-rotate linear infinite;
  }
  .spinner__circle {
    stroke: $spinner-color;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    fill: none;
    @each $class, $size in $spinner-stroke-dasharrays {
      &.--#{$class} {
        stroke-dasharray: $size;
        animation: 5s circle-#{$class}-dash ease-in-out infinite, 5s circle-spin ease-in-out infinite;
      }
    }
  }
}

@keyframes circle-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes circle-spin {
  12.5% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(240deg);
  }
  37.5% {
    transform: rotate(240deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(540deg);
  }
  75% {
    transform: rotate(780deg);
  }
  87.5% {
    transform: rotate(780deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

@each $class, $size in $spinner-stroke-dasharrays {
  @keyframes circle-#{$class}-dash {
    0% {
      stroke-dashoffset: $size;
    }
    12.5% {
      stroke-dashoffset: $size/4;
    }
    25% {
      stroke-dashoffset: $size;
    }
    37.5% {
      stroke-dashoffset: $size/4;
    }
    50% {
      stroke-dashoffset: $size;
    }
    62.5% {
      stroke-dashoffset: $size/4;
    }
    75% {
      stroke-dashoffset: $size;
    }
    87.5% {
      stroke-dashoffset: $size/4;
    }
    100% {
      stroke-dashoffset: $size;
    }
  }
}
</style>

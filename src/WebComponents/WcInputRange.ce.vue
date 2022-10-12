<template>
  <div class="form-input">
    <label :for="'#range-selector-' + label" class="label">{{ label }}</label>
    <input
      :value="value"
      :class="['range', { disabled }]"
      type="range"
      :id="'#range-selector-' + label"
      ref="customInput"
      :placeholder="placeholder"
      @mousemove="updateValue"
    />
  </div>
</template>

<script>
export default {
  name: "wc-input-range",

  props: {
    value: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    helptext: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    updateValue() {
      this.$emit("input", this.$refs.customInput.value);
    }
  }
};
</script>

<style lang="scss">
.form-input {
  display: flex;
  flex-direction: column;
}
.range {
  margin: 20px 0;
  -webkit-appearance: none;
  vertical-align: middle;
  outline: none;
  border: none;
  padding: 0;
  background: none;
}

.range::-webkit-slider-runnable-track {
  background-color: var(--wc-color-primary-500);
  height: 6px;
  border-radius: 3px;
  border: 1px solid transparent;
}

.range[disabled]::-webkit-slider-runnable-track {
  border: 1px solid var(--wc-color-primary-500);
  background-color: transparent;
  opacity: 0.4;
}

.range::-moz-range-track {
  background-color: var(--wc-color-primary-500);
  height: 6px;
  border-radius: 3px;
  border: none;
}

.range::-ms-track {
  color: transparent;
  border: none;
  background: none;
  height: 6px;
}

.range::-ms-fill-lower {
  background-color: var(--wc-color-primary-500);
  border-radius: 3px;
}

.range::-ms-fill-upper {
  background-color: var(--wc-color-primary-500);
  border-radius: 3px;
}

.range::-ms-tooltip {
  display: none; /* display and visibility only */
}

.range::-moz-range-thumb {
  border-radius: 20px;
  height: 18px;
  width: 18px;
  border: none;
  background: none;
  background-color: #606670;
}

.range:active::-moz-range-thumb {
  outline: none;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  border-radius: 100%;
  background-color: var(--wc-color-primary-500);
  height: 18px;
  width: 18px;
  margin-top: -7px;
}

.range[disabled]::-webkit-slider-thumb {
  background-color: transparent;
  border: 1px solid var(--wc-color-primary-500);
}

.range:active::-webkit-slider-thumb {
  outline: none;
}

.range::-ms-thumb {
  border-radius: 100%;
  background-color: var(--wc-color-primary-500);
  height: 18px;
  width: 18px;
  border: none;
}

.range:active::-ms-thumb {
  border: none;
}

.label {
  font: var(--wc-paragraph4-regular-font);
  color: #1c1c1c;
}

.disabled {
  pointer-events: none;
}
</style>

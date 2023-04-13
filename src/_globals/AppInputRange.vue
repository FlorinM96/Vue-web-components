<template>
  <div class="form-input" :class="{ disabled }">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <app-tooltip v-if="info" class="info-helptext">
        <template v-slot:content>
          {{ info }}
        </template>
      </app-tooltip>
    </label>
    <input :value="value" :class="['range']" type="range" :id="id" ref="customInput" :placeholder="placeholder" @mousemove="updateValue" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    info: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    id() {
      return Math.random().toString(36).replace(".", "").toUpperCase().substring(0, 10);
    },
  },
  methods: {
    updateValue() {
      this.$emit("input", this.$refs.customInput.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-direction: column;
}
.range {
  margin: 2rem 0;
  -webkit-appearance: none;
  vertical-align: middle;
  outline: none;
  border: none;
  padding: 0;
  background: none;
}

.range::-webkit-slider-runnable-track {
  background-color: var(--color-primary-400);
  height: 6px;
  border-radius: 3px;
  border: 1px solid transparent;
}

.range[disabled]::-webkit-slider-runnable-track {
  border: 1px solid var(--color-primary-400);
  background-color: transparent;
  opacity: 0.4;
}

.range::-moz-range-track {
  background-color: var(--color-primary-400);
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
  background-color: var(--color-primary-400);
  border-radius: 3px;
}

.range::-ms-fill-upper {
  background-color: var(--color-primary-400);
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
  background-color: var(--color-primary-400);
  height: 18px;
  width: 18px;
  margin-top: -7px;
}

.range[disabled]::-webkit-slider-thumb {
  background-color: transparent;
  border: 1px solid var(--color-primary-400);
}

.range:active::-webkit-slider-thumb {
  outline: none;
}

.range::-ms-thumb {
  border-radius: 100%;
  background-color: var(--color-primary-400);
  height: 18px;
  width: 18px;
  border: none;
}

.range:active::-ms-thumb {
  border: none;
}

.label {
  font: var(--paragraph4-medium-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
}
.info-helptext {
  margin-left: 0.8rem;
}
.disabled {
  pointer-events: none;
}
</style>

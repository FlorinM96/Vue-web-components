<template>
  <div class="input-number" :class="{ disabled }">
    <label v-if="label" :for="'#numberInput-' + label" class="label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        ref="inputNumber"
        class="input"
        type="text"
        :id="'#numberInput-' + label"
        :min="minValue"
        :max="maxValue"
        :value="parsedValue"
        :placeholder="placeholder"
        @input="onInput"
      />
      <div class="buttons">
        <div class="input-button input-up" tabindex="-1" @click="plus">
          <app-icon class="up" icon="arrow-up" />
        </div>
        <div class="input-button input-down" tabindex="-1" @click="minus">
          <app-icon class="down" icon="arrow-down" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from "../components/AppIcon.vue";
export default {
  name: "wc-input-number",
  components: {
    AppIcon
  },
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    /**
     * Min value
     */
    minValue: {
      type: Number,
      default: 0
    },
    /**
     * Max value
     */
    maxValue: {
      type: Number,
      default: 1000000000000
    },
    /**
     * Initial value
     */
    modelValue: {
      type: Number,
      default: 0
    },
    /**
     * If enabled, the text is formatted `00:00`
     */
    time: {
      type: Boolean,
      default: false
    },
    /**
     * Thw width of the input
     */

    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parsedValue() {
      return this.parseValue(this.modelValue);
    }
  },
  methods: {
    parseValue(value) {
      if (!this.time) {
        return value;
      } else {
        return value < 10 ? "0" + value : value;
      }
    },
    onInput(event) {
      const newValue = parseInt(event.target.value);
      const clampedValue = Math.min(newValue, this.maxValue) || 0;
      this.$emit("update:modelValue", clampedValue);
      this.$refs.inputNumber.value = this.parseValue(clampedValue);
    },
    plus() {
      if (this.modelValue < this.maxValue) {
        this.$refs.inputNumber.value = this.parseValue(this.modelValue + 1);
        this.$emit("update:modelValue", this.modelValue + 1);
      } else {
        this.$emit("update:modelValue", this.minValue);
      }
    },
    minus() {
      if (this.modelValue > this.minValue) {
        this.$refs.inputNumber.value = this.parseValue(this.modelValue - 1);
        this.$emit("update:modelValue", this.modelValue - 1);
      } else {
        this.$emit("update:modelValue", this.maxValue);
      }
    }
  }
};
</script>

<style lang="scss">
.input-number {
  &.disabled {
    pointer-events: none;
  }
}
.input-wrapper {
  display: flex;
  align-items: center;
}
.input {
  font: var(--wc-paragraph2-regular-font);
  height: 100%;
  -moz-appearance: textfield;
  background: white;
  display: block;
  padding: 12px 16px;
  border: 2px solid var(--wc-color-gray-700);
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  flex-grow: 1;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--wc-color-gray-700);
  }
  &:focus,
  &:focus-visible {
    border: 2px solid var(--wc-color-primary-400);
    box-shadow: 0px 0px 3px #5a338b;
  }
  &:hover {
    border-color: var(--wc-color-gray-900);
  }
}
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.buttons {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-self: stretch;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
}
.input-button {
  min-height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--wc-color-gray-700);
  border: 1px solid var(--wc-color-gray-700);
  width: 40px;
  position: relative;
  outline: none;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #dadada;
  }
}
.label {
  font: var(--wc-paragraph4-regular-font);
  color: #1c1c1c;
}
.input-up {
  border-bottom: none;
}
.input-down {
  border-top: none;
}
.up {
  position: absolute;
  top: 2px;
}
.down {
  position: absolute;
  bottom: 2px;
}
</style>

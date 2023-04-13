<template>
  <div class="input-number" :class="{ disabled }">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <app-tooltip v-if="info" class="info-helptext">
        <template v-slot:content>
          {{ info }}
        </template>
      </app-tooltip>
    </label>
    <div class="input-wrapper">
      <input ref="inputNumber" class="input" type="text" :id="id" :value="parsedValue" :placeholder="placeholder" @input="onInput" />
      <div class="buttons">
        <div class="input-button input-up" :class="{ disabled: modelValue >= maxValue }" tabindex="-1" @click="plus">
          <app-icon class="up" icon="arrow-up" />
        </div>
        <div class="input-button input-down" :class="{ disabled: modelValue <= minValue }" tabindex="-1" @click="minus">
          <app-icon class="down" icon="arrow-down" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * Min value
     */
    minValue: {
      type: Number,
      default: 0,
    },
    /**
     * Max value
     */
    maxValue: {
      type: Number,
      default: 1000000000000,
    },
    /**
     * Initial value
     */
    modelValue: {
      type: Number,
      default: 0,
    },
    /**
     * If enabled, the text is formatted `00:00`
     */
    time: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      default: "",
    },
  },
  computed: {
    parsedValue() {
      return this.parseValue(this.modelValue);
    },
    id() {
      return Math.random().toString(36).replace(".", "").toUpperCase().substring(0, 10);
    },
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
    },
  },
};
</script>

<style lang="scss" scoped>
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
  font: var(--paragraph4-regular-font);
  min-height: 4.5rem;
  -moz-appearance: textfield;
  background: white;
  display: block;
  padding: 1rem 1.6rem;
  border: 0.2rem solid var(--color-gray-700);
  border-radius: 0.6rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  flex-grow: 1;
  margin: 0;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--color-gray-700);
  }
  &:focus,
  &:focus-visible {
    border: 2px solid var(--color-primary-400);
    box-shadow: 0px 0px 3px #5a338b;
  }
  &:hover {
    border-color: var(--color-gray-900);
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
  min-width: 3rem;
  align-self: stretch;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  overflow: hidden;
}
.input-button {
  cursor: pointer;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-700);
  border: 1px solid var(--color-gray-700);
  width: 3rem;
  position: relative;
  outline: none;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #dadada;
  }
  &.disabled {
    opacity: 0.7;
  }
}
.label {
  font: var(--paragraph4-medium-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
}
.input-up {
  border-bottom: none;
}
.input-down {
  border-top: none;
}
.up,
.down {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.info-helptext {
  margin-left: 0.8rem;
}
.disabled {
  pointer-events: none;
}
</style>

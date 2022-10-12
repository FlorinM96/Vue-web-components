<template>
  <div class="form-input">
    <label :for="'#customInput-' + label" class="label">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :rows="rows"
      :value="value"
      :class="['app-input', { error, disabled }]"
      :id="'#customInput-' + label"
      ref="customInput"
      :placeholder="placeholder"
      @input.stop="updateValue"
    />
    <input
      v-else
      :value="value"
      :class="['app-input', { error, disabled }]"
      :type="type"
      :id="'#customInput-' + label"
      ref="customInput"
      :placeholder="placeholder"
      @input.stop="updateValue"
      :required="required"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "wc-input",
  props: {
    value: {
      type: [String, Number, Object],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "password", "email", "textarea", "date", "time", "tel"].includes(value);
      }
    },
    rows: {
      type: Number,
      default: 3
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
    },
    required: {
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

<style lang="scss" scoped>
input {
  height: 48px;
}
input:focus-visible {
  outline-width: 0;
}

.app-input {
  font: var(--wc-paragraph2-regular-font);
  margin: 8px 0;
  width: 100%;
  background: white;
  border: none;
  display: block;
  padding: 12px 16px;
  border: 0.15px solid var(--wc-color-gray-600);
  border-radius: 6px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--wc-color-gray-300);
  }
  &:focus,
  &:focus-visible {
    border: 2px solid var(--wc-color-primary-400);
    box-shadow: 0px 0px 3px #5a338b;
  }
  &:hover {
    border-color: var(--wc-color-gray-900);
    outline: none !important;
  }
}

.label {
  font: var(--wc-paragraph4-regular-font);
  color: #1c1c1c;
}

.disabled {
  pointer-events: none;
}
.error {
  border: 2px solid var(--wc-color-status-negative-text);
}
.error-msg {
  font: var(--wc-paragraph5-regular-font);
  color: var(--wc-color-status-negative-text);
  text-align: left;
}
</style>

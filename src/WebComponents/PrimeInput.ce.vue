<template>
  <div :class="{ disabled }" class="form-input">
    <label v-if="label" class="label">
      {{ label }}
      <prime-tooltip v-if="info" class="info-helptext">
        <span slot="content">
          {{ info }}
        </span>
      </prime-tooltip>
    </label>
    <textarea
      v-if="type === 'textArea'"
      :id="'#customInput-' + id"
      :rows="rows"
      :value="modelValue"
      :class="['app-input', { error }]"
      ref="customInput"
      :placeholder="placeholder"
      @input.stop="updateValue"
    />
    <input
      v-else
      :value="modelValue"
      :class="['app-input', { error }]"
      :type="type === 'phone' ? 'tel' : type"
      ref="customInput"
      :placeholder="placeholder"
      @input.stop="updateValue"
    />
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
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
        return ["text", "password", "email", "textArea", "time", "phone"].includes(value);
      }
    },
    rows: {
      type: Number,
      default: 15
    },
    info: {
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
  computed: {
    id() {
      return Math.random();
    }
  },
  methods: {
    updateValue() {
      this.$emit("update:modelValue", this.$refs.customInput.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-input {
  font: var(--paragraph4-regular-font);
  width: 100%;
  background: white;
  border: none;
  display: block;
  padding: 1rem 1.6rem;
  border: 0.2rem solid var(--color-gray-700);
  border-radius: 0.6rem;
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
.label {
  font: var(--paragraph4-medium-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
}

.disabled {
  pointer-events: none;
}
.error {
  border: 2px solid red;
}
.error-msg {
  font: var(--paragraph5-regular-font);
  color: var(--color-status-negative-text);
  text-align: left;
}
.info-helptext {
  margin-left: 0.8rem;
}
</style>

<template>
  <div class="form-input" :class="{ disabled }">
    <p class="label">{{ label }}</p>
    <label :for="'#fileInput-' + label" class="label-wrapper">
      <wc-button icon="file-upload" class="upload-button">{{ placeholder }}</wc-button>
    </label>
    <input
      :class="['app-file', { error }]"
      :id="'#fileInput-' + label"
      ref="customInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
    />
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "wc-input-file",
  props: {
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
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
    accept: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.form-input {
  display: flex;
  flex-direction: column;
}
.app-file {
  display: none;
}
.label {
  font: var(--wc-paragraph4-regular-font);
  margin: 0 0 8px;
  color: #1c1c1c;
}
.disabled {
  pointer-events: none;
}
.error {
  border: 2px solid red;
}
.error-msg {
  font: var(--wc-paragraph5-regular-font);
  color: var(--wc-color-status-negative-text);
  text-align: left;
}
</style>

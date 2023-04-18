<template>
  <div :class="['app-input-file', { disabled }]">
    <label v-if="label" class="label">
      {{ label }}
      <prime-tooltip v-if="info" class="info-helptext">
        <span slot="content">
          {{ info }}
        </span>
        <span slot="content">
          {{ info }}
        </span>
      </prime-tooltip>
    </label>
    <div
      class="input-wrapper"
      :class="{ 'dragging-over': isDraggingOver && !disabled }"
      @dragover.prevent="isDraggingOver = true"
      @dragleave.prevent="isDraggingOver = false"
      @drop.prevent="handleDrop"
    >
      <div class="file" v-for="(file, i) in modelValue" :key="i">
        <div class="file-details" :class="{ disabled: file.isUploading }">
          <div class="file-name-size">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ formatBytes(file.size) }}</p>
          </div>
          <prime-icon icon="delete" class="delete-icon" @click="deleteFile(i)" />
        </div>
      </div>
      <label v-if="!modelValue.length" :for="id" class="label-wrapper">
        <prime-button v-if="!isDraggingOver || disabled" size="small" icon="upload" class="upload-button" @click="handleUploadClick">{{
          placeholder
        }}</prime-button>
        <p class="drop-text">{{ isDraggingOver && !disabled ? "D" : "Or d" }}rop files here</p>
      </label>
      <transition name="fade">
        <div v-if="errorMessage" class="alert alert--negative">
          <div class="alert__content">
            <span class="alert__title">Unable to upload file! </span>
            <span class="alert__text">{{ errorMessage }}</span>
          </div>
        </div></transition
      >

      <div class="add-box">
        <div v-if="modelValue.length && multiple === true" class="add-button" @click="handleUploadClick">
          <prime-icon icon="plus" class="upload-button-small" />
          <span class="button-text">Add more files</span>
        </div>
      </div>
      <input
        :class="['app-file', { error }]"
        :id="id"
        ref="customInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @input="handleUpload"
      />
      <div v-if="error" class="error-msg">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    modelValue: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "placeholder"
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
  },
  data: () => ({
    isDraggingOver: false,
    sizeLimit: 52428800,
    countLimit: 4,
    errorMessage: "",
    errors: {
      size: "The maximum file size allowed is 50mb.",
      count: "A maximum number of 4 files is allowed."
    }
  }),
  computed: {
    id() {
      return uuidv4();
    }
  },
  mounted() {
    // add files in hidden input
    let input = this.$refs.customInput;
    if (this.modelValue.length) {
      const dt = new DataTransfer();
      for (let i = 0; i < this.modelValue.length; i++) {
        dt.items.add(this.modelValue[i]);
      }
      input.files = dt.files;
    }
  },
  methods: {
    handleDrop(e) {
      this.isDraggingOver = false;
      if (e.dataTransfer.files) this.emitFiles(e.dataTransfer.files);
    },
    handleUpload(e) {
      if (e.target.files) this.emitFiles(e.target.files);
    },
    emitFiles(eventFiles) {
      if ([...eventFiles].some((x) => x.size > this.sizeLimit)) {
        this.errorMessage = this.errors.size;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
        return;
      } else if (this.modelValue.length + [...eventFiles].length > this.countLimit) {
        this.errorMessage = this.errors.count;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
        return;
      }
      this.$emit("update:modelValue", this.multiple ? [...this.modelValue, ...eventFiles] : [...eventFiles]);
    },
    deleteFile(index) {
      const input = this.$refs.customInput;
      const dt = new DataTransfer();
      const { files } = input;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) dt.items.add(file);
      }
      input.files = dt.files;
      const newFiles = this.modelValue.filter((x, i) => i !== index);
      this.$emit("update:modelValue", this.multiple ? newFiles : []);
    },
    handleUploadClick() {
      this.$refs.customInput.click();
    },
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.6rem;
  height: 100%;
  width: 100%;
  background: white;
  border: 0.2rem solid var(--color-gray-700);
  border-radius: 0.6rem;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--color-gray-700);
  }
  justify-content: center;
  &.dragging-over {
    background-color: var(--color-gray-300);
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
.app-file {
  display: none;
}
.label {
  font: var(--paragraph4-medium-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
  cursor: pointer;
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
.upload-button {
  pointer-events: none;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}
.file-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.file-name-size {
  display: flex;
  flex-direction: column;
  .file-name {
    font: var(--paragraph2-regular-font);

    color: var(--color-primary-800);
    margin: 0;
  }
  .file-size {
    font: var(--paragraph5-regular-font);

    color: var(--color-gray-900);
    margin: 0;
  }
}
.delete-icon {
  cursor: pointer;
  border-radius: 1.5rem;
  margin: 1rem;
  transition: all 0.2s;
  min-width: 2.4rem;
  &:hover {
    color: var(--color-base-white);
    background-color: var(--color-primary-400);
  }
}
.add-button {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 1rem 0;
  border-radius: 5px;
  padding: 0rem 1rem;
  &:hover {
    background-color: var(--color-gray-100);
  }
}
.label-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.drop-text {
  font: var(--paragraph4-regular-font);
}
.info-helptext {
  text-align: center;
  margin-left: 0.8rem;
}
</style>

<template>
  <div>
    <span v-if="label" class="label">{{ label }}</span>
    <nav v-click-outside="hideValues" class="nav" :class="{ disabled, 'dark-mode': darkMode }">
      <div
        class="value selected-el"
        :class="{ 'is-selected': selectedIndex !== null, 'options-open': displayOptions }"
        @click="displayOptions = !displayOptions"
      >
        <template v-if="allowMultiple">
          {{ selectedIndex === null || !selectedIndex.length ? placeholder : dropDownValue.join(", ") }}
        </template>
        <template v-else>
          {{ selectedIndex === null ? placeholder : isTextValue ? options[selectedIndex].text : options[selectedIndex] }}
        </template>
        <div class="icon-wrapper">
          <app-icon :class="{ rotate: displayOptions }" icon="arrow-down" class="icon" />
        </div>
      </div>
      <ul :class="{ opened: displayOptions }">
        <li
          v-for="(val, index) in options"
          :key="index"
          :class="[
            'value',
            {
              'selected-option': allowMultiple
                ? dropDownValue.some((x) => x === val) || (isTextValue && dropDownValue.some((x) => x === val.value))
                : val === dropDownValue || val.value === dropDownValue
            }
          ]"
          @click="setValue(val.value || val)"
        >
          {{ isTextValue ? val.text : val }}
          <app-icon
            v-if="allowMultiple && (dropDownValue.some((x) => x === val) || (isTextValue && dropDownValue.some((x) => x === val.value)))"
            icon="check"
            class="selected-option-icon"
          />
        </li>
        <li v-if="noneEnabled && selectedIndex !== null" class="value no-value" @click="setValue(null)">None selected</li>
      </ul>
    </nav>
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import AppIcon from "../AppIcon.vue";
export default {
  name: "wc-dropdown",
  components: {
    AppIcon
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: "Select"
    },
    noneEnabled: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    allowMultiple: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Array],
      default: null
    },
    value: {
      type: [String, Array],
      default: null
    }
  },
  data: () => ({
    selectedIndex: null,
    displayOptions: false
  }),
  computed: {
    dropDownValue() {
      return this.modelvalue || this.value;
    },
    isTextValue() {
      return this.options[0].text && (this.options[0].value || this.options[0].value === null);
    },
    filteredValues() {
      return this.options.filter((value, i) => i !== this.selectedIndex);
    }
  },
  watch: {
    dropDownValue(newVal) {
      if (newVal === null) {
        this.selectedIndex = this.allowMultiple ? [] : null;
        return;
      }
      if (this.allowMultiple) {
        const selectedIndexes = this.isTextValue
          ? this.getCommonIndexes(
              this.options.map((x) => x.value),
              newVal
            )
          : this.getCommonIndexes(this.options, newVal);
        this.selectedIndex = selectedIndexes;
      } else {
        const index = this.options.findIndex((x) => {
          const value = this.isTextValue ? x.value : x;
          return value === newVal;
        });
        this.selectedIndex = index >= 0 ? index : 0;
      }
    }
  },
  mounted() {
    if (this.dropDownValue) {
      if (this.allowMultiple) {
        const selectedIndexes = this.isTextValue
          ? this.getCommonIndexes(
              this.options.map((x) => x.value),
              this.dropDownValue
            )
          : this.getCommonIndexes(this.options, this.dropDownValue);
        this.selectedIndex = selectedIndexes;
      } else {
        const index = this.options.findIndex((x) => {
          const value = this.isTextValue ? x.value : x;
          return value === this.dropDownValue;
        });
        this.selectedIndex = index >= 0 ? index : 0;
      }
    }
  },
  methods: {
    getCommonIndexes(arr1, arr2) {
      if (!arr1.length || !arr2.length) return [];
      const result = [];
      for (let i = 0; i < arr1.length; i++) {
        const arr1El = arr1[i];
        if (arr2.some((x) => x === arr1El) && !result.some((x) => x === arr1El)) result.push(i);
      }
      return result;
    },
    hideValues() {
      if (this.displayOptions) this.displayOptions = false;
    },
    setValue(value) {
      if (this.allowMultiple) {
        if (value === null) {
          this.selectedIndex = null;
          this.displayOptions = false;
          this.$emit("update:modelValue", []);
          this.$emit("change", []);
          return;
        }
        const index = this.options.findIndex((x) => {
          const xValue = this.isTextValue ? x.value : x;
          return xValue === value;
        });
        if (this.selectedIndex.some((x) => x === index)) {
          this.selectedIndex = this.selectedIndex.filter((x) => x !== index);
        } else this.selectedIndex.push(index);
        const emitPayload = this.isTextValue
          ? this.options
              .filter((x, i) => {
                return this.selectedIndex.some((sel) => sel === i);
              })
              .map((x) => x.value)
          : this.options.filter((x, i) => this.selectedIndex.some((sel) => sel === i));

        this.$emit("update:modelValue", emitPayload);
        this.$emit("change", emitPayload);
      } else {
        if (value === null) {
          this.selectedIndex = null;
          this.displayOptions = false;
          this.$emit("update:modelValue", null);
          return;
        }
        const index = this.options.findIndex((x) => {
          const xValue = x.value || x;
          return xValue === value;
        });
        this.selectedIndex = index;
        this.displayOptions = false;
        const emitPayload = this.isTextValue ? this.options[this.selectedIndex].value : this.options[this.selectedIndex];
        this.$emit("update:modelValue", emitPayload);
        this.$emit("change", emitPayload);
      }
    }
  }
};
</script>

<style lang="scss">
ul {
  padding: 0;
}
li {
  list-style: none;
}
.nav {
  position: relative;
  margin: 10px 0;
  &.disabled {
    pointer-events: none;
  }
}
.label {
  margin: 0 0 8px;
  font: var(--wc-paragraph4-regular-font);
  color: #1c1c1c;
}
.value {
  font: var(--wc-paragraph4-regular-font);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.no-value {
    background-color: var(--wc-color-gray-300);
  }
}
.selected-el {
  cursor: pointer;
  position: relative;
  padding: 12px 16px;
  border: 1px solid var(--wc-color-gray-700);
  border-radius: 6px;
  background-color: white;
  height: 100%;
  color: var(--wc-color-gray-700);
  text-overflow: ellipsis;
  &.is-selected {
    color: var(--wc-color-primary-500);
  }
  &.options-open {
    border: 1px solid var(--wc-color-primary-400);
    box-shadow: 0px 0px 3px var(--wc-color-primary-400);
  }
}

.icon {
  transition: 0.5s all;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--wc-color-primary-500);
  &.rotate {
    transform: translateY(-50%) scaleY(-1);
  }
}
ul {
  position: absolute;
  bottom: -8px;
  left: 0;
  transform: translateY(100%);
  z-index: 1;
  display: none;
  margin: 0;
  width: 100%;
  border: 1px solid #e6ddf9;
  padding: 8px 0;
  background: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &.opened {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  li {
    padding: 10px;
    width: 100%;
    cursor: pointer;
    padding: 12px 24px;
    &:hover {
      background-color: var(--wc-color-primary-50);
    }
  }
}
.error-msg {
  font: var(--wc-paragraph5-regular-font);
  color: var(--wc-color-status-negative-text);
  text-align: left;
}
.dark-mode {
  span {
    background-color: var(--wc-color-gray-100);
  }
  ul {
    background-color: var(--wc-color-gray-100);
    li {
      &:hover {
        background-color: white;
      }
    }
  }
}
.selected-option-icon {
  width: 20px;
  height: 20px;
}
</style>

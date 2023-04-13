<template>
  <div :class="{ disabled }">
    <span v-if="label" class="label">
      {{ label }}
      <prime-tooltip v-if="info" class="info-helptext">
        <span slot="content">
          {{ info }}
        </span>
      </prime-tooltip>
    </span>
    <nav v-click-outside="hideValues" class="nav" :class="{ 'dark-mode': darkMode }">
      <div
        class="value selected-el"
        :class="{ 'is-selected': selectedIndex !== null, 'options-open': displayOptions }"
        @click="displayOptions = !displayOptions"
      >
        <template v-if="allowMultiple">
          {{
            selectedIndex === null || !selectedIndex.length
              ? placeholder
              : isTextValue
              ? options
                  .filter((x) => modelValue.includes(x.value))
                  .map((x) => x.text)
                  .join(", ")
              : modelValue.join(", ")
          }}
        </template>
        <template v-else>
          {{ selectedIndex === null ? placeholder : isTextValue ? options[selectedIndex].text : options[selectedIndex] }}
        </template>
        <div class="icon-wrapper">
          <prime-icon :class="{ rotate: displayOptions }" icon="arrow-down" class="dropdown-icon" />
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
                ? modelValue.some((x) => x === val) || (isTextValue && modelValue.some((x) => x === val.value))
                : val === modelValue || val.value === modelValue
            }
          ]"
          @click="setValue(val.value || val)"
        >
          {{ isTextValue ? val.text : val }}
          <prime-icon
            v-if="
              allowMultiple
                ? modelValue.some((x) => x === val) || (isTextValue && modelValue.some((x) => x === val.value))
                : val === modelValue || val.value === modelValue
            "
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
export default {
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
    modelValue: {
      type: [String, Array, Number, Boolean],
      default: null
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
    info: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    selectedIndex: null,
    displayOptions: false
  }),
  computed: {
    isTextValue() {
      return this.options[0].text && (this.options[0].value || this.options[0].value === null || this.options[0].value === 0);
    },
    filteredValues() {
      return this.options.filter((value, i) => i !== this.selectedIndex);
    }
  },
  watch: {
    modelValue(newVal) {
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
    if (this.modelValue || this.modelValue === 0) {
      if (this.allowMultiple) {
        const selectedIndexes = this.isTextValue
          ? this.getCommonIndexes(
              this.options.map((x) => x.value),
              this.modelValue
            )
          : this.getCommonIndexes(this.options, this.modelValue);
        this.selectedIndex = selectedIndexes;
      } else {
        const index = this.options.findIndex((x) => {
          const value = this.isTextValue ? x.value : x;
          return value === this.modelValue;
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
          this.$emit("change", []);
          this.$emit("update:modelValue", []);
          return;
        }
        const index = this.options.findIndex((x) => {
          const xValue = this.isTextValue ? x.value : x;
          return xValue === value;
        });
        if (this.selectedIndex.some((x) => x === index)) {
          this.selectedIndex = this.selectedIndex.filter((x) => x !== index);
        } else this.selectedIndex.push(index);
        this.$emit(
          "update:modelValue",
          this.isTextValue
            ? this.options
                .filter((x, i) => {
                  return this.selectedIndex.some((sel) => sel === i);
                })
                .map((x) => x.value)
            : this.options.filter((x, i) => this.selectedIndex.some((sel) => sel === i))
        );
        this.$emit(
          "change",
          this.isTextValue
            ? this.options
                .filter((x, i) => {
                  return this.selectedIndex.some((sel) => sel === i);
                })
                .map((x) => x.value)
            : this.options.filter((x, i) => this.selectedIndex.some((sel) => sel === i))
        );
      } else {
        if (value === null) {
          this.selectedIndex = null;
          this.displayOptions = false;
          this.$emit("update:modelValue", null);
          this.$emit("change", null);
          return;
        }
        const index = this.options.findIndex((x) => {
          const xValue = x.value || x;
          return xValue === value;
        });
        this.selectedIndex = index;
        this.displayOptions = false;
        this.$emit("update:modelValue", this.isTextValue ? this.options[this.selectedIndex].value : this.options[this.selectedIndex]);
        this.$emit("change", this.isTextValue ? this.options[this.selectedIndex].value : this.options[this.selectedIndex]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  margin: 1rem 0;
}
.label {
  font: var(--paragraph4-regular-font);
  color: #1c1c1c;
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem;
}
.value {
  font: var(--paragraph4-regular-font);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.no-value {
    background-color: var(--color-gray-300);
  }
}
.selected-el {
  cursor: pointer;
  position: relative;
  padding: 1.2rem 3.2rem 1.2rem 1.6rem;
  border: 0.1rem solid var(--color-gray-700);
  border-radius: 0.6rem;
  background-color: white;
  height: 100%;
  color: var(--color-gray-700);
  text-overflow: ellipsis;
  &.is-selected {
    color: var(--color-primary-500);
  }
  &.options-open {
    border: 1px solid var(--color-primary-400);
    box-shadow: 0px 0px 3px var(--color-primary-400);
  }
}

.dropdown-icon {
  transition: 0.5s all;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary-500);
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
    filter: drop-shadow(0px 10px 20px var(--color-gray-700));
  }
  li {
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    padding: 1.2rem 2.4rem;

    &:hover {
      background-color: var(--color-primary-100);
    }
  }
}
.error-msg {
  font: var(--paragraph5-regular-font);
  color: var(--color-status-negative-text);
  text-align: left;
}
.dark-mode {
  span {
    background-color: var(--color-gray-100);
  }
  ul {
    background-color: var(--color-gray-100);
    li {
      &:hover {
        background-color: white;
      }
    }
  }
}
.selected-option-icon {
  width: 1.6rem;
  height: 1.6rem;
  color: var(--color-primary-400);
}
.info-helptext {
  margin-left: 0.8rem;
}
.disabled {
  pointer-events: none;
}
</style>

import _ from "lodash";

export default {
  prModel: (el, binding) => {
    el.modelValue = binding.value;
    const key = Object.keys(binding.instance.$data).find((x) => _.isEqual(binding.instance[x], binding.value));
    const inputHandler = function inputHandler(event) {
      binding.instance[key] = event.detail[0];
    };
    el.addEventListener("update:modelValue", inputHandler);
  }
};

import { defineCustomElement, createApp } from "vue";
// import _ from "lodash";
// const modelDirectiveCallback = (el, binding) => {
//   el.modelValue = binding.value;
//   const key = Object.keys(binding.instance.$data).find((x) => _.isEqual(binding.instance[x], binding.value));
//   const inputHandler = function inputHandler(event) {
//     binding.instance[key] = event.detail[0];
//   };
//   el.addEventListener("update:modelValue", inputHandler);
// };

const modules = import.meta.globEager("./WebComponents/*.ce.vue");

// For each matching file name...
Object.keys(modules).forEach((fileName) => {
  // Get component config
  const componentConfig = modules[fileName].default || modules[fileName];
  if (fileName.includes("Input.ce.vue")) console.log(componentConfig);

  const sharedStyle = `
        *,
        :after,
        :before {
        box-sizing: border-box;
        margin: 0;
      }`;

  // add sharedStyles to component
  if (componentConfig.styles) componentConfig.styles.push(sharedStyle);
  else componentConfig.styles = [sharedStyle];

  // // register directive
  // componentConfig.directives = componentConfig.directives
  //   ? { ...componentConfig.directives, "pr-model": modelDirectiveCallback }
  //   : {
  //       "pr-model": modelDirectiveCallback
  //     };

  const componentName = fileName
    .replace(/^\.\/\w+\/(.*)\.\w+\.\w+$/, "$1") // remove paths
    .replace(/([a-z0–9])([A-Z])/g, "$1-$2") // transform to kebab-case
    .toLowerCase(); // lowercase
  customElements.define(componentName, defineCustomElement(componentConfig));
});

// for vue apps
export const vueDirective = {
  name: "prime-model",
  install: (app, _options) => {
    app.directive("pr-model", modelDirectiveCallback);
  }
};

// // <link> for fonts
// let hasWCFonts = false;
// for (let item of document.head.getElementsByTagName("link")) {
//   if (item?.id && item.id === "wc-fonts") hasWCFonts = true;
// }
// if (!hasWCFonts) {
//   const link = document.createElement("link");
//   link.id = "wc-fonts";
//   link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
//   link.rel = "stylesheet";
//   document.head.appendChild(link);
// }

// append styles
// <style> for css
// let hasWCStyles = false;
// for (let item of document.head.getElementsByTagName("style")) {
//   if (item?.id && item.id === "wc-styles") hasWCStyles = true;
// }
// if (!hasWCStyles) {
//   const css = `
//     `;
//   const style = document.createElement("style");
//   document.head.appendChild(style);
//   style.id = "wc-styles";
//   style.appendChild(document.createTextNode(css));
// }

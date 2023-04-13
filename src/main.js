import { defineCustomElement } from "vue";

const modules = import.meta.globEager("./WebComponents/*.ce.vue");
// For each matching file name...
Object.keys(modules).forEach((fileName) => {
  // Get component config
  const componentConfig = modules[fileName].default || modules[fileName];

  if (componentConfig.styles?.length)
    componentConfig.styles[0] += `
        *,
        :after,
        :before {
        box-sizing: border-box;
        margin: 0;
      }`;

  const componentName = fileName
    .replace(/^\.\/\w+\/(.*)\.\w+\.\w+$/, "$1") // remove paths
    .replace(/([a-z0–9])([A-Z])/g, "$1-$2") // transform to kebab-case
    .toLowerCase(); // lowercase
  console.log(componentName);
  customElements.define(componentName, defineCustomElement(componentConfig));
});

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
let hasWCStyles = false;
for (let item of document.head.getElementsByTagName("style")) {
  if (item?.id && item.id === "wc-styles") hasWCStyles = true;
}
if (!hasWCStyles) {
  const css = `
      p {
        margin: 0;
      }
    `;
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.id = "wc-styles";
  style.appendChild(document.createTextNode(css));
}

// TODO: directive to register model events for VUE
// app.directive("maxchars", {
//   bind(el, binding, vnode) {
//     let maxChars = binding.value;
//     let handler = function (e) {
//       if (e.target.value.length > maxChars) {
//         e.target.value = e.target.value.substr(0, maxChars);
//         vnode.elm.dispatchEvent(new CustomEvent("input")); // added this
//       }
//     };
//     el.addEventListener("input", handler);
//   }
// });

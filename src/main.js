import { defineCustomElement } from "vue";

const modules = import.meta.globEager("./components/WebComponents/*.ce.vue");
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
      }`;
  customElements.define(componentConfig.name, defineCustomElement(componentConfig));
});

// append styles
// <style> for css
let hasWCStyles = false;
for (let item of document.head.getElementsByTagName("style")) {
  if (item?.id && item.id === "wc-styles") hasWCStyles = true;
}
// <link> for fonts
let hasWCFonts = false;
for (let item of document.head.getElementsByTagName("link")) {
  if (item?.id && item.id === "wc-fonts") hasWCFonts = true;
}
if (!hasWCFonts) {
  const link = document.createElement("link");
  link.id = "wc-fonts";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
if (!hasWCStyles) {
  const css = `
      @font-face {
        font-family: "mabry-regular-pro";
        font-style: normal;
        font-weight: 400;
        src: url("https://www.signicat.com/dist/assets/mabry-regular-pro.da3a4a9f.woff2") format("woff2");
      }
      @font-face {
        font-family: "mabry-medium-pro";
        font-style: normal;
        font-weight: 500;
        src: url("https://www.signicat.com/dist/assets/mabry-medium-pro.89eda955.woff2") format("woff2");
      }
      @font-face {
        font-family: "mabry-bold-pro";
        font-style: normal;
        font-weight: 700;
        src: url("https://www.signicat.com/dist/assets/mabry-bold-pro.a523993e.woff2") format("woff2");
      }
      :root {
        --wc-default-font-family: "mabry-regular-pro";

        /* header fonts */
        --wc-headline-0-font: 700 128px/1.5 "mabry-regular-pro";
        --wc-headline-1-font: 500 64px/1.5 "mabry-regular-pro";
        --wc-headline-2-font: 500 48px/1.5 "mabry-regular-pro";
        --wc-headline-3-font: 500 32px/1.5 "mabry-regular-pro";
        --wc-headline-4-font: 500 24px/1.5 "mabry-regular-pro";
        --wc-headline-5-font: 500 16px/1.5 "mabry-regular-pro";

        /* button fonts */
        --wc-button-large-font: 500 24px/1.5 "inter";
        --wc-button-arrow-small-font: 16px/1 "mabry-regular-pro";
        --wc-button-arrow-medium-font: 20px/1 "mabry-regular-pro";
        --wc-button-arrow-large-font: 32px/1 "mabry-regular-pro";

        /* paragraph fonts */
        --wc-paragraph1-regular-font: 20px/1.5 "inter";
        --wc-paragraph1-medium-font: 500 20px/1.5 "inter";
        --wc-paragraph1-bold-font: 700 20px/1.5 "inter";

        --wc-paragraph2-regular-font: 18px/1.4 "inter";
        --wc-paragraph2-medium-font: 500 18px/1.4 "inter";
        --wc-paragraph2-bold-font: 700 18px/1.4 "inter";

        --wc-paragraph3-regular-font: 16px/1.5 "inter";
        --wc-paragraph3-medium-font: 500 16px/1.5 "inter";
        --wc-paragraph3-bold-font: 700 16px/1.5 "inter";

        --wc-paragraph4-regular-font: 14px/1.5 "inter";
        --wc-paragraph4-medium-font: 500 14px/1.5 "inter";
        --wc-paragraph4-bold-font: 700 14px/1.5 "inter";

        --wc-paragraph5-regular-font: 12px/1.5 "inter";
        --wc-paragraph5-medium-font: 500 12px/1.5 "inter";
        --wc-paragraph5-bold-font: 700 12px/1.5 "inter";

        /* input field fonts */
        --wc-input-field-font: 20px/1.2 "inter";
        
        /* base colors */
        --wc-color-base-black: #000000;
        --wc-color-base-white: #ffffff;
        /* primary colors */
        --wc-color-primary-800: #1c1c1c;
        --wc-color-primary-700: #272142;
        --wc-color-primary-600: #190147;
        --wc-color-primary-500: #2a0062;
        --wc-color-primary-400: #5a338b;
        --wc-color-primary-300: #745b95;
        --wc-color-primary-200: #dfd9e7;
        --wc-color-primary-100: #f2f0f6;
        --wc-color-primary-50: #f3f5f8;
        /* secondary colors */
        --wc-color-secondary-700: #21d3a6;
        --wc-color-secondary-600: #2ee8b9;
        --wc-color-secondary-500: #41ffd1;
        /* gray colors */
        --wc-color-gray-900: #4f4e4e;
        --wc-color-gray-800: #767676;
        --wc-color-gray-700: #c6c3c3;
        --wc-color-gray-600: #cdc7be;
        --wc-color-gray-500: #dfdbd6;
        --wc-color-gray-400: #e9e9e8;
        --wc-color-gray-300: #f5f4f3;
        --wc-color-gray-100: #f9f9f9;
        /* misc colors*/
        --wc-color-misc-disabled: rgba(7, 0, 38, 0.38);
        --wc-color-misc-invalid: #a82626;
        /* test colors */
        --wc-color-test-links-normal: #3c4ef1;
        --wc-color-test-links-hover: #0144a7;
        --wc-color-test-quickguide: #26293f;
        --wc-color-test-menu-links: #7d51da;
        --wc-color-test-new-primary: #f3f5f8;
        --wc-color-test-grid-line: #eae3f8;
        /* status colors */
        --wc-color-status-info-text: #152f8a;
        --wc-color-status-info-element: #3d5cca;
        --wc-color-status-info-background: #e4e7f4;
        --wc-color-status-positive-text: #2b633f;
        --wc-color-status-positive-element: #2c9c77;
        --wc-color-status-positive-background: #e0fcf5;
        --wc-color-status-notice-text: #995403;
        --wc-color-status-notice-element: #fb9600;
        --wc-color-status-notice-background: #fff0e2;
        --wc-color-status-negative-text: #a82626;
        --wc-color-status-negative-element: #d8513f;
        --wc-color-status-negative-background: #ffe9eb;
      }
    `;
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.id = "wc-styles";
  style.appendChild(document.createTextNode(css));
}

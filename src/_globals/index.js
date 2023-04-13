import { upperFirst, camelCase } from "lodash";
const modules = import.meta.globEager("./*.vue");
const components = [];
// For each matching file name...
Object.keys(modules).forEach((fileName) => {
  // Get component config
  const componentConfig = modules[fileName];

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Strip the leading `'./` and extension from the filename
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );
  // Register component globally
  components.push({ componentName, componentConfig: componentConfig.default || componentConfig });
});
export default components;

import reactPropsInterface from "./rules/react-props-interface.js"
import preferUseWatch from "./rules/prefer-usewatch.js"
import requireAutoComplete from "./rules/require-autocomplete.js"
import iconComponentNaming from "./rules/icon-component-naming.js"
import formStateDestructuring from "./rules/formstate-destructuring.js"

export default {
  rules: {
    "react-props-interface": reactPropsInterface,
    "prefer-usewatch": preferUseWatch,
    "require-autocomplete": requireAutoComplete,
    "icon-component-naming": iconComponentNaming,
    "formstate-destructuring": formStateDestructuring,
  },
}

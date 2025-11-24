import { defineConfig } from "eslint/config"
import baseConfig from "@initia/eslint-config-react-app"
import iusdPlugin from "./eslint/plugin/index.js"

// Strat custom rules configuration
export default defineConfig([
  ...baseConfig,
  {
    plugins: { iusd: iusdPlugin },
    rules: {
      // TanStack Table's memoization is incompatible with React Compiler but doesn't affect functionality
      "react-hooks/incompatible-library": "off",

      // Allow setState in effects for specific use cases
      "react-hooks/set-state-in-effect": "off",

      // Allow autoFocus for improved UX in specific cases
      "jsx-a11y/no-autofocus": "off",

      // Alt text not always needed for decorative images
      "jsx-a11y/alt-text": "off",

      // Keyboard handlers will be manually added when needed
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",

      // React component props patterns (inline for 1-3, interface for 4+)
      "iusd/react-props-interface": "warn",

      // Prefer useWatch over watch for React Compiler compatibility
      "iusd/prefer-usewatch": "warn",

      // Require autoComplete="off" on input elements
      "iusd/require-autocomplete": "warn",

      // Icon components must start with 'Icon' prefix
      "iusd/icon-component-naming": "warn",

      // Enforce formState destructuring for proper React Hook Form subscriptions
      "iusd/formstate-destructuring": "error",
    },
  },
])

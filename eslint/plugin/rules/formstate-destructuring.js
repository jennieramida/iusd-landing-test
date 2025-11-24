export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce accessing formState properties via destructuring in the first render to ensure React Hook Form subscriptions",
      category: "Best Practices",
    },
    messages: {
      destructureFormState:
        "formState.{{property}} must be destructured at the top level to ensure proper subscription. Use: const { formState: { {{property}} } } = useForm() or useFormContext()",
      avoidLateAccess:
        "Accessing formState.{{property}} later may not subscribe properly. Destructure it when calling useForm() or useFormContext()",
    },
    schema: [],
  },
  create(context) {
    // Track formState variables and their destructured properties
    const formStateVariables = new Map()
    const destructuredProperties = new Map()

    function isFormStateProperty(property) {
      // Common formState properties that need subscription
      return [
        "errors",
        "isDirty",
        "isSubmitting",
        "isSubmitted",
        "isSubmitSuccessful",
        "isValid",
        "isValidating",
        "isLoading",
        "dirtyFields",
        "touchedFields",
        "submitCount",
        "defaultValues",
      ].includes(property)
    }

    return {
      // Track useForm and useFormContext calls and their destructuring
      CallExpression(node) {
        const isUseForm =
          node.callee.name === "useForm" ||
          (node.callee.type === "MemberExpression" && node.callee.property.name === "useForm")

        const isUseFormContext =
          node.callee.name === "useFormContext" ||
          (node.callee.type === "MemberExpression" &&
            node.callee.property.name === "useFormContext")

        if (isUseForm || isUseFormContext) {
          const parent = node.parent

          if (parent.type === "VariableDeclarator" && parent.id.type === "ObjectPattern") {
            // Check for formState destructuring
            parent.id.properties.forEach((prop) => {
              if (prop.type === "Property" && prop.key.name === "formState") {
                if (prop.value.type === "Identifier") {
                  // formState is taken as a variable: { formState }
                  formStateVariables.set(prop.value.name, {
                    node: prop,
                    isDestructured: false,
                  })
                } else if (prop.value.type === "ObjectPattern") {
                  // formState is destructured: { formState: { errors, isDirty } }
                  const destructured = new Set()
                  prop.value.properties.forEach((innerProp) => {
                    if (innerProp.type === "Property") {
                      destructured.add(innerProp.key.name)
                    }
                  })
                  destructuredProperties.set(node, destructured)
                  formStateVariables.set(null, {
                    node: prop,
                    isDestructured: true,
                    properties: destructured,
                  })
                }
              }
            })
          } else if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier") {
            // Store the form object name (e.g., const form = useForm())
            const formObjectName = parent.id.name
            formStateVariables.set(`${formObjectName}.formState`, {
              node: parent,
              isFormObject: true,
              formObjectName: formObjectName,
            })
          }
        }
      },

      // Track destructuring from form objects
      VariableDeclarator(node) {
        // Check for destructuring from form objects: const { formState } = form;
        if (node.init && node.init.type === "Identifier" && node.id.type === "ObjectPattern") {
          const sourceObject = node.init.name
          const formStateInfo = formStateVariables.get(`${sourceObject}.formState`)

          if (formStateInfo && formStateInfo.isFormObject) {
            node.id.properties.forEach((prop) => {
              if (prop.type === "Property" && prop.key.name === "formState") {
                if (prop.value.type === "Identifier") {
                  // formState extracted from form object
                  formStateVariables.set(prop.value.name, {
                    node: prop,
                    isDestructured: false,
                    fromFormObject: true,
                  })
                } else if (prop.value.type === "ObjectPattern") {
                  // formState is destructured from form object
                  const destructured = new Set()
                  prop.value.properties.forEach((innerProp) => {
                    if (innerProp.type === "Property") {
                      destructured.add(innerProp.key.name)
                    }
                  })
                  formStateVariables.set(null, {
                    node: prop,
                    isDestructured: true,
                    properties: destructured,
                    fromFormObject: true,
                  })
                }
              }
            })
          }
        }
      },

      // Check for formState property access
      MemberExpression(node) {
        if (node.object.type === "Identifier") {
          const objectName = node.object.name
          const propertyName = node.property.name

          // Check if this is a formState variable accessing a property
          if (formStateVariables.has(objectName) && isFormStateProperty(propertyName)) {
            const formStateInfo = formStateVariables.get(objectName)

            // Check if we're inside a conditional or function
            let currentNode = node
            let isInConditional = false
            let isInFunction = false
            let functionDepth = 0

            while (currentNode.parent) {
              currentNode = currentNode.parent

              // Count function depth to check if we're in nested function
              if (
                currentNode.type === "FunctionDeclaration" ||
                currentNode.type === "FunctionExpression" ||
                currentNode.type === "ArrowFunctionExpression"
              ) {
                functionDepth++
                if (functionDepth > 1) {
                  isInFunction = true
                }
              }

              // Check for conditional statements
              if (
                currentNode.type === "IfStatement" ||
                currentNode.type === "ConditionalExpression" ||
                currentNode.type === "LogicalExpression"
              ) {
                isInConditional = true
              }

              // Stop at component function
              if (
                currentNode.type === "FunctionDeclaration" ||
                (currentNode.type === "VariableDeclarator" &&
                  currentNode.init &&
                  (currentNode.init.type === "ArrowFunctionExpression" ||
                    currentNode.init.type === "FunctionExpression") &&
                  /^[A-Z]/.test(currentNode.id?.name || ""))
              ) {
                break
              }
            }

            // Report if accessing formState property via dot notation
            if (!formStateInfo.isDestructured) {
              context.report({
                node,
                messageId: "destructureFormState",
                data: { property: propertyName },
              })
            } else if (isInConditional || isInFunction) {
              // Accessing formState.property in conditional or nested function
              context.report({
                node,
                messageId: "avoidLateAccess",
                data: { property: propertyName },
              })
            }
          }
        }
      },

      // Check for watch() calls which might be accessing formState indirectly
      "CallExpression[callee.property.name='watch']"(node) {
        // If using watch method, check if formState is properly destructured
        const parent = node.parent

        // Walk up to find the useForm call
        let currentNode = node
        while (currentNode.parent) {
          currentNode = currentNode.parent

          if (currentNode.type === "VariableDeclarator") {
            const hasFormState = Array.from(formStateVariables.values()).some(
              (info) => info.node === currentNode,
            )

            if (hasFormState && node.callee.object.name === "formState") {
              context.report({
                node,
                messageId: "avoidLateAccess",
                data: { property: "watch" },
              })
            }
            break
          }
        }
      },
    }
  },
}

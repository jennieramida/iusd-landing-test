export default {
  meta: {
    type: "problem",
    docs: {
      description: 'Require autoComplete="off" on all input elements',
      category: "Best Practices",
    },
    fixable: "code",
    messages: {
      missingAutoComplete: 'Input elements must have autoComplete="off"',
      wrongAutoCompleteValue: 'autoComplete should be "off" to prevent browser autocomplete',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if this is an input element
        if (node.name.name !== "input" && node.name.name !== "Input") {
          return
        }

        // Find autoComplete attribute
        const autoCompleteAttr = node.attributes.find(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "autoComplete",
        )

        if (!autoCompleteAttr) {
          context.report({
            node,
            messageId: "missingAutoComplete",
            fix(fixer) {
              const lastAttribute = node.attributes[node.attributes.length - 1]
              if (lastAttribute) {
                return fixer.insertTextAfter(lastAttribute, ' autoComplete="off"')
              } else {
                // Insert after the element name
                return fixer.insertTextAfter(node.name, ' autoComplete="off"')
              }
            },
          })
        } else if (autoCompleteAttr.value) {
          // Check if the value is "off"
          const value = autoCompleteAttr.value
          if (value.type === "Literal" && value.value !== "off") {
            context.report({
              node: autoCompleteAttr,
              messageId: "wrongAutoCompleteValue",
              fix(fixer) {
                return fixer.replaceText(value, '"off"')
              },
            })
          } else if (
            value.type === "JSXExpressionContainer" &&
            value.expression.type === "Literal" &&
            value.expression.value !== "off"
          ) {
            context.report({
              node: autoCompleteAttr,
              messageId: "wrongAutoCompleteValue",
              fix(fixer) {
                return fixer.replaceText(value, '"off"')
              },
            })
          }
        }
      },
    }
  },
}

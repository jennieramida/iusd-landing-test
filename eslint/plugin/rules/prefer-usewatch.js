export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prefer useWatch over watch from react-hook-form for React Compiler compatibility",
      category: "Best Practices",
    },
    fixable: "code",
    messages: {
      preferUseWatch: "Use useWatch instead of watch for React Compiler compatibility",
    },
    schema: [],
  },
  create(context) {
    let reactHookFormImports = new Set()

    return {
      // Track imports from react-hook-form
      ImportDeclaration(node) {
        if (node.source.value === "react-hook-form") {
          node.specifiers.forEach((spec) => {
            if (spec.type === "ImportSpecifier") {
              if (spec.imported.name === "watch") {
                context.report({
                  node: spec,
                  messageId: "preferUseWatch",
                  fix(fixer) {
                    return fixer.replaceText(spec.imported, "useWatch")
                  },
                })
              } else if (spec.imported.name === "useForm") {
                reactHookFormImports.add(spec.local.name)
              }
            }
          })
        }
      },

      // Check for watch() method calls
      CallExpression(node) {
        // Direct watch() calls
        if (node.callee.name === "watch") {
          context.report({
            node,
            messageId: "preferUseWatch",
          })
        }

        // form.watch() or methods.watch() patterns
        if (node.callee.type === "MemberExpression" && node.callee.property.name === "watch") {
          // Check if the object is from useForm
          const objectName = node.callee.object.name
          if (objectName === "form" || objectName === "methods" || objectName === "formMethods") {
            context.report({
              node,
              messageId: "preferUseWatch",
            })
          }
        }

        // Destructured watch from useForm
        if (node.callee.name === "useForm") {
          const parent = node.parent
          if (parent.type === "VariableDeclarator" && parent.id.type === "ObjectPattern") {
            parent.id.properties.forEach((prop) => {
              if (prop.type === "Property" && prop.key.name === "watch") {
                context.report({
                  node: prop,
                  messageId: "preferUseWatch",
                })
              }
            })
          }
        }
      },
    }
  },
}

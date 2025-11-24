export default {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce 'Icon' prefix for icon component imports",
      category: "Best Practices",
    },
    fixable: "code",
    messages: {
      missingIconPrefix:
        'Icon component "{{name}}" must be imported with "Icon" prefix as "{{suggested}}"',
    },
    schema: [],
  },
  create(context) {
    // Common icon paths patterns
    const iconPathPatterns = [
      /@\/lib\/icons\/.*\.svg\?react$/,
      /@\/icons\/.*\.svg\?react$/,
      /\/icons\/.*\.svg\?react$/,
      /\.svg\?react$/,
    ]

    function isIconImport(source) {
      return iconPathPatterns.some((pattern) => pattern.test(source))
    }

    function suggestIconName(originalName) {
      // If it already starts with Icon, return as is
      if (originalName.startsWith("Icon")) {
        return originalName
      }
      // Otherwise, add Icon prefix
      return `Icon${originalName}`
    }

    return {
      ImportDeclaration(node) {
        // Check if this is an icon import
        if (!isIconImport(node.source.value)) {
          return
        }

        node.specifiers.forEach((specifier) => {
          // Handle default imports
          if (specifier.type === "ImportDefaultSpecifier") {
            const localName = specifier.local.name
            if (!localName.startsWith("Icon")) {
              const suggestedName = suggestIconName(localName)
              context.report({
                node: specifier,
                messageId: "missingIconPrefix",
                data: {
                  name: localName,
                  suggested: suggestedName,
                },
                fix(fixer) {
                  const fixes = [fixer.replaceText(specifier.local, suggestedName)]

                  // Find and replace all usages in the file
                  const sourceCode = context.getSourceCode()
                  const text = sourceCode.getText()

                  // This is a simplified approach - in a real implementation,
                  // you'd want to properly track variable references through scope
                  const pattern = new RegExp(`\\b${localName}\\b`, "g")
                  let match
                  while ((match = pattern.exec(text)) !== null) {
                    const matchNode = sourceCode.getNodeByRangeIndex(match.index)
                    if (
                      matchNode &&
                      matchNode.type === "Identifier" &&
                      matchNode.name === localName
                    ) {
                      // Skip the import declaration itself
                      if (matchNode !== specifier.local) {
                        fixes.push(fixer.replaceText(matchNode, suggestedName))
                      }
                    }
                  }

                  return fixes
                },
              })
            }
          }

          // Handle named imports (if icons are exported as named exports)
          if (specifier.type === "ImportSpecifier") {
            const localName = specifier.local.name
            const importedName = specifier.imported.name

            if (!localName.startsWith("Icon")) {
              const suggestedName = suggestIconName(importedName)
              context.report({
                node: specifier,
                messageId: "missingIconPrefix",
                data: {
                  name: localName,
                  suggested: suggestedName,
                },
                fix(fixer) {
                  // Update the import to use 'as' syntax
                  return fixer.replaceText(specifier, `${importedName} as ${suggestedName}`)
                },
              })
            }
          }
        })
      },
    }
  },
}

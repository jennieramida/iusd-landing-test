export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce React component props type declaration patterns (inline for 1-3 props, interface for 4+ props)",
      category: "Best Practices",
    },
    messages: {
      useInlineType:
        "Component with {{count}} props should use inline type declaration instead of interface",
      useInterface: "Component with {{count}} props should use a separate interface",
      useInterfaceForExtends: "Components using 'extends' must use a separate interface",
    },
    schema: [],
  },
  create(context) {
    function countPropsInType(node) {
      if (!node) return 0
      if (node.type === "TSTypeLiteral") {
        return node.members.length
      }
      return 0
    }

    function hasExtendsClause(node) {
      if (!node) return false
      if (node.type === "TSIntersectionType") {
        return node.types.some(
          (t) =>
            t.type === "TSTypeReference" ||
            t.type === "TSIndexedAccessType" ||
            t.type === "TSQualifiedName",
        )
      }
      return false
    }

    return {
      // Check function declarations with TypeScript props
      FunctionDeclaration(node) {
        if (!node.params[0]) return

        const firstParam = node.params[0]
        if (firstParam.type !== "ObjectPattern") return

        const typeAnnotation = firstParam.typeAnnotation?.typeAnnotation
        if (!typeAnnotation) return

        // Check if this looks like a React component (starts with uppercase)
        const isComponent = node.id && /^[A-Z]/.test(node.id.name) && node.id.name !== "App"
        if (!isComponent) return

        // Check for extends clause
        if (hasExtendsClause(typeAnnotation)) {
          if (typeAnnotation.type === "TSTypeLiteral") {
            context.report({
              node: firstParam,
              messageId: "useInterfaceForExtends",
            })
          }
          return
        }

        // Count props for inline type literals
        if (typeAnnotation.type === "TSTypeLiteral") {
          const propCount = countPropsInType(typeAnnotation)
          if (propCount >= 4) {
            context.report({
              node: firstParam,
              messageId: "useInterface",
              data: { count: propCount },
            })
          }
        }

        // Check if using interface for too few props
        if (typeAnnotation.type === "TSTypeReference") {
          // Try to find the interface declaration
          const interfaceName = typeAnnotation.typeName.name
          const sourceCode = context.getSourceCode()
          const interfaceNode = sourceCode.ast.body.find(
            (n) => n.type === "TSInterfaceDeclaration" && n.id.name === interfaceName,
          )

          if (interfaceNode && interfaceNode.body) {
            const propCount = interfaceNode.body.body.length
            const hasExtends = interfaceNode.extends && interfaceNode.extends.length > 0

            if (!hasExtends && propCount <= 3) {
              context.report({
                node: firstParam,
                messageId: "useInlineType",
                data: { count: propCount },
              })
            }
          }
        }
      },
    }
  },
}

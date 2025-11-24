# ESLint Plugin Strat

Custom ESLint rules for the Strat Web App project, enforcing coding standards from CONTRIBUTING.md.

## Rules

### `strat/react-props-interface`

Enforces React component props type declaration patterns:

- 1-3 props: Use inline type declaration
- 4+ props: Use separate interface
- Always use interface when using `extends`

**✅ Good (3 or fewer props):**

```tsx
export default function Button({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  // ...
}
```

**✅ Good (4 or more props):**

```tsx
interface CardProps {
  title: string
  description: string
  image: string
  footer?: React.ReactNode
}

export default function Card({ title, description, image, footer }: CardProps) {
  // ...
}
```

---

### `strat/prefer-usewatch`

Requires `useWatch` instead of `watch` from React Hook Form for React Compiler compatibility.

**✅ Good:**

```javascript
const value = useWatch({ control, name: "fieldName" })
```

**❌ Bad:**

```javascript
const value = watch("fieldName")
```

---

### `strat/require-autocomplete`

Requires `autoComplete="off"` on all input elements.

**✅ Good:**

```jsx
<input type="text" autoComplete="off" />
```

**❌ Bad:**

```jsx
<input type="text" />
```

---

### `strat/icon-component-naming`

Requires all icon component imports to start with `Icon` prefix.

**✅ Good:**

```javascript
import IconHourglass from "@/lib/icons/Hourglass.svg?react"
import IconArrow from "@/lib/icons/Arrow.svg?react"
```

**❌ Bad:**

```javascript
import Hourglass from "@/lib/icons/Hourglass.svg?react"
import Arrow from "@/lib/icons/Arrow.svg?react"
```

---

### `strat/formstate-destructuring`

Enforces accessing `formState` properties via destructuring in the first render to ensure proper React Hook Form subscriptions. When you access formState properties, React Hook Form needs to subscribe to those specific fields during the initial render. Accessing them conditionally or later may result in missing updates.

**✅ Good:**

```tsx
// Destructure all needed formState properties at the top level
const {
  formState: { errors, isDirty, isSubmitting, isValid },
  handleSubmit,
  control,
} = useForm()

// Now these properties are properly subscribed
if (errors.email) {
  console.log(errors.email.message)
}

return <button disabled={isSubmitting}>Submit</button>
```

**❌ Bad:**

```tsx
// Taking formState as a variable
const { formState, handleSubmit } = useForm()

// Accessing properties later - subscriptions may not work
if (formState.errors.email) {
  // ❌ Will trigger rule
  console.log(formState.errors.email)
}

// Accessing in JSX
return <button disabled={formState.isSubmitting}>Submit</button> // ❌ Will trigger rule
```

**❌ Bad (conditional access):**

```tsx
const { formState } = useForm()

// Accessing in conditional or callback - may not subscribe properly
const handleClick = () => {
  if (formState.isDirty) {
    // ❌ Will trigger rule
    console.log("Form is dirty")
  }
}
```

---

## Configuration

All rules are configured in `eslint.config.strat.js` with appropriate severity levels:

- `error`: Must be fixed
- `warn`: Should be fixed but not blocking

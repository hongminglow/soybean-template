# Naive UI Common Syntax & Component Guide

This guide lists the most frequently used components and their syntax in SoybeanAdmin. All Naive UI components start with the prefix `N`.

---

## 🏗️ 1. Layout & Grid System

### `NSpace` (The "Spacer")
Used for simple horizontal or vertical alignment.
- `vertical`: Stack items vertically.
- `size`: Gap size (number or `[x, y]`).
- `align`: `start | end | center | baseline`.
- `justify`: `start | end | center | space-around | space-between`.

```vue
<NSpace vertical :size="16">
  <NButton>Button 1</NButton>
  <NButton>Button 2</NButton>
</NSpace>
```

### `NGrid` & `NGi` (Responsive Grid)
Powerful grid system similar to Bootstrap/Tailwind.
- `cols`: Number of columns (e.g., `24`).
- `x-gap` / `y-gap`: Horizontal/Vertical spacing.
- `responsive="screen"`: Enables responsive span.
- `item-responsive`: Let items use media queries like `span="24 m:12"`.

```vue
<NGrid :x-gap="12" :y-gap="12" cols="24" item-responsive>
  <NGi span="24 m:12 l:8"> <!-- Mobile: Full, Tablet: Half, Desktop: 1/3 -->
    <div class="bg-primary h-100px"></div>
  </NGi>
</NGrid>
```

---

## ✍️ 2. Forms & Inputs

### `NInput`
- `v-model:value`: Two-way binding.
- `type`: `text | textarea | password`.
- `placeholder`: Hint text.
- `clearable`: Adds an 'X' to clear.
- `round`: Rounded corners.
- `show-password-on="mousedown | click"`: Password visibility toggle.

```vue
<NInput v-model:value="val" type="password" show-password-on="click" placeholder="Enter password" />
```

### `NSelect`
- `options`: Array of `{ label, value }`.
- `filterable`: Allow searching.
- `multiple`: Select multiple items.

```vue
<NSelect v-model:value="val" :options="[{ label: 'A', value: 'a' }]" />
```

### `NForm` & `NFormItem`
Used for validation.
- `model`: The data object.
- `rules`: Validation rules definition.
- `path`: The key in the model to validate.

```vue
<NForm :model="formData" :rules="rules">
  <NFormItem label="Username" path="user">
    <NInput v-model:value="formData.user" />
  </NFormItem>
</NForm>
```

---

## 🔘 3. Actions & Display

### `NButton`
- `type`: `default | primary | info | success | warning | error`.
- `quaternary | tertiary | secondary | strong`: Different ghost/plain styles.
- `size`: `tiny | small | medium | large`.
- `circle | round`: Shape.
- `block`: Full width.
- `loading`: Shows a spinner.

```vue
<NButton type="primary" round loading>Confirming</NButton>
<NButton quaternary circle><IconMdiClose /></NButton>
```

### `NCard`
- `title`: Header text.
- `bordered`: Default is true.
- `hoverable`: Subtle shadow on hover.
- `size`: `small | medium | large`.

```vue
<NCard title="User Info" :bordered="false" class="rd-12px shadow-sm">
  Card Content
</NCard>
```

---

## 📊 4. Data Display

### `NDataTable`
- `columns`: Array of component definitions.
- `data`: The data array.
- `pagination`: Boolean or config object.

```vue
<NDataTable :columns="cols" :data="tableData" :pagination="pagination" />
```

---

## 💡 5. Best Practices: Naive UI + UnoCSS
In SoybeanAdmin, we combine them like this:
1. Use **Naive Props** for internal logic: `:size="16"`, `type="primary"`.
2. Use **UnoCSS Classes** for external positioning and refinement:

```vue
<!-- Use mt-20 for top margin, shadow-md for shadow -->
<NCard title="Title" class="mt-20 shadow-md">
  <div class="flex-center gap-10"> <!-- UnoCSS Shortcuts -->
    <NButton type="primary">Naive Button</NButton>
  </div>
</NCard>
```

For more specifics, check the official documentation: [Naive UI Components](https://www.naiveui.com/en-US/os-theme/components/button)

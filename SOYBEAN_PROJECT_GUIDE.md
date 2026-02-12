# Soybean Admin Development Guide

This guide outlines the best practices and patterns to follow when developing in this project. It covers Soybean Admin architecture, UnoCSS for styling, and Naive UI for components.

## 🚀 General Development Practices

### 1. Component Options (`defineOptions`)
Every page component in `src/views` should use the `defineOptions` macro to set a component name.

```typescript
defineOptions({
  name: 'YourComponentName'
});
```
> **Note:** The `name` must match the **Route Name** exactly for the **Keep-alive (tab caching)** functionality to work correctly. It also helps with identification in Vue DevTools.

### 2. Route Configuration
- **Static Routes:** Configure custom meta (icons, order, constant status) in `build/plugins/router.ts` within the `onRouteMetaGen` hook.
- **Auto Generation:** The project uses `elegant-router`. New files in `src/views` will automatically generate routes in `src/router/elegant/routes.ts`.

### 3. Usage of Constants
Avoid hardcoding strings for business logic (like status codes or dropdown options).
- Use `src/constants/business.ts` for domain-specific constants.
- Use the `CommonType.Option` interface for dropdown/select data structures to maintain type safety.

---

## 🛣️ Adding a New Route (Step-by-Step)

Follow these steps to add a new page and ensure it integrates correctly with the sidebar and permissions system.

### Step 1: Create the View File
Create a new folder and an `index.vue` file inside `src/views`.
- **Example:** `src/views/log-management/system-log/index.vue`
- The folder structure determines the route path (e.g., `/log-management/system-log`).

### Step 2: Set Component Name
Inside your new `index.vue`, use `defineOptions` to set the name.
```vue
<script setup lang="ts">
defineOptions({
  name: 'LogManagement_SystemLog' // Note: underscore represents folder level
});
</script>
```
> **Note:** The name should follow the route key pattern (folders joined by underscores).

### Step 3: Wait for Auto-Generation
The `elegant-router` plugin will detect your new file and automatically update:
- `src/router/elegant/routes.ts`
- `src/typings/elegant-router.d.ts` (for type safety)

### Step 4: Configure Metadata
If you want to set a specific **icon**, **order**, or **active menu** for the route, open `build/plugins/router.ts` and add logic to `onRouteMetaGen`:

```typescript
if (key === 'log-management_system-log') {
  meta.icon = 'mdi:text-box-list-outline';
  meta.order = 5;
}
```

### Step 5: Add Internationalization (i18n)
Add the translation for the menu title in `src/locales/langs/en-us.ts` (and other languages):
```typescript
const local: App.I18n.Schema = {
  route: {
    'log-management_system-log': 'System Log'
  }
};
```

---

## 🎨 UnoCSS Styling Rules

UnoCSS is used for atomic styling. It is configured to be compatible with Tailwind CSS utility classes.

- **Prefer Atomic Classes:** Use utility classes (e.g., `flex-center`, `gap-16px`, `p-24px`) directly in templates rather than writing custom `<style>` blocks.
- **Shortcuts:** Look into `uno.config.ts` for project-specific shortcuts like `flex-center` or `wh-full`.
- **Spacing:** Use standard pixel values (e.g., `m-12px`) or the spacing scale for consistency.

---

## � Naive UI Usage

- **Global Instances:** Use the global `window.$message`, `window.$dialog`, and `window.$notification` for feedback logic outside of component templates (e.g., in API interceptors).
- **Type Safety:** Always import and use types from `naive-ui` when defining props or refs that interact with component instances (e.g., `DataTableInst`, `FormInst`).
- **Theming:** Use the `useThemeVars` hook from Naive UI if you need to access theme colors (primary, success, etc.) inside your Javascript logic.

---

## 🌐 Internationalization (i18n)

- All UI text should be defined in `src/locales/langs/`.
- Access translations using the `$t('key')` function in templates or `i18n.t('key')` in scripts.
- Route titles are automatically mapped to `route.{key}` in the locale files.

---

*This guide is a living document. Please add new patterns and "gotchas" as you discover them during development.*

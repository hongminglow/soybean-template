# SoybeanAdmin Project Guide

Welcome to the **SoybeanAdmin**! This guide will provide you with the exact steps to start the project, understand its architecture, and add new features like routes.

---

## 🚀 1. Quick Start

### Prerequisites
Before you begin, ensure your environment meets the following requirements:
- **Node.js**: `>= 20.19.0` (Recommended: latest LTS)
- **pnpm**: `>= 10.5.0`

### Installation & Run
1. **Install dependencies**:
   ```bash
   pnpm i
   ```
   *Note: Always use `pnpm` as this is a monorepo project. Do not use npm or yarn.*

2. **Start development server**:
   ```bash
   pnpm dev
   ```
   The project will be available at `http://localhost:9527` by default.

3. **Build for production**:
   ```bash
   pnpm build
   ```

---

## 🏗️ 2. Project Architecture & Folder Breakdown

SoybeanAdmin uses a **pnpm monorepo** architecture. This means the project is divided into multiple packages for better organization and reusability.

### Root Folder Structure
- **`packages/`**: Shared workspace packages.
    - `alova` / `axios`: Network request configurations and interceptors.
    - `color`: Core engine for the theme system, managing color palettes.
    - `hooks`: Reusable Vue composition API hooks.
    - `materials`: Handcrafted UI components and shared materials.
    - `scripts`: CLI tools (aliased as `sa`) for project management and automation.
    - `utils`: Common utility functions used across the workspace.
    - `uno-preset`: Custom presets for UnoCSS.
- **`src/`**: The main application source code.
- **`build/`**: Build-time configuration and automation.
    - `config/`: Vite configurations, proxy settings, and environment injections.
    - `plugins/`: Custom Vite plugins (e.g., router generator, UnoCSS optimizer).
- **`public/`**: Static assets that are served directly at the root path (icons, favicon, etc.).

### Source Code (`src/`) Details
- **`views/`**: Page components. Each folder here corresponds to a route.
- **`router/`**: Routing logic.
    - `elegant/`: **Automatically generated** routes. **Do not edit manually.**
    - `routes/`: Custom and builtin route configurations (like 404, login).
- **`store/`**: Global state management using **Pinia**.
- **`layouts/`**: Page layout patterns (BaseLayout for sidebars, BlankLayout for login).
- **`plugins/`**: External library registrations (i18n, icons, loading effects).
- **`service/`**: API definitions, request services, and business logic.
- **`locales/`**: Internationalization (i18n) translation files.
- **`theme/`**: Theme system configuration and appearance settings.

---

## 🗺️ 3. How to Add a New Route (Page)

SoybeanAdmin uses an automated file-based routing system called **Elegant Router**.

### Step 1: Create the View
Create a new directory and an `index.vue` file in `src/views`.
Example: To add an "Analysis" page:
- Create folder: `src/views/analysis`
- Create file: `src/views/analysis/index.vue`

### Step 2: Automatic Route Generation
The router plugin will automatically detect the new file and update `src/router/elegant/routes.ts`. 
To force an update, run:
```bash
pnpm gen-route
```

### Step 3: Configure Sidebar Menu (i18n)
The menu title is pulled from the i18n files. 
1. Open `src/locales/langs/zh-cn.ts` (and `en-us.ts`).
2. Add your route name under the `route` object:
   ```typescript
   route: {
     // ... other routes
     analysis: '分析页' // English: 'Analysis'
   }
   ```

### Step 4: Multi-level Menus
For nested menus, just create sub-folders:
`src/views/component/button/index.vue` -> Creates a route at `/component/button`.

---

## 🛠️ 4. Useful CLI Commands

SoybeanAdmin comes with a built-in CLI tool `sa` (located in `packages/scripts`):

- **`pnpm dev`**: Start the dev server in test mode.
- **`pnpm gen-route`**: Manually trigger route generation.
- **`pnpm cleanup`**: Clean `node_modules` and build artifacts.
- **`pnpm commit`**: Interactive git commit matching project standards.
- **`pnpm update-pkg`**: Interactive tool to update dependencies safely.

---

## 🎨 5. Styling & Theme
The project uses **UnoCSS** for atomic styling. You can use classes like `flex-center`, `text-primary`, and `bg-container` directly in your templates. The theme is highly customizable via the UI settings drawer in the development app, and persistent settings can be changed in `src/theme/settings.ts`.

For more details, please refer to the [Official Documentation](https://docs.soybeanjs.cn).

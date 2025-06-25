# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d933d501-14ac-437a-9e9f-cf8a937d89e1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d933d501-14ac-437a-9e9f-cf8a937d89e1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## System Architecture & Documentation

- Comprehensive architecture docs are in the `system-architecture/` folder, including:
  - High-level system overview
  - Technology stack
  - API, database, frontend, security, AI, and data science architecture
  - Team-specific implementation guides
  - Setup, deployment, and troubleshooting instructions
- See `system-architecture/README.md` for navigation and team-specific docs.

## Testing Framework Setup

This project uses **Jest** and **React Testing Library** for unit and integration testing of React components.

### Setup Steps

1. **Install Dependencies**
   Run the following command in your project root:
   ```sh
   npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
   ```
   - If you see errors about missing types for React or ReactDOM, also run:
   ```sh
   npm install --save-dev @types/react @types/react-dom
   ```

2. **Jest Configuration**
   - Create a file named `jest.config.cjs` in your project root with the following content:
   ```js
   /** @type {import('jest').Config} */
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'jsdom',
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
       '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
     },
     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
     testPathIgnorePatterns: ['/node_modules/', '/dist/'],
   };
   ```

3. **Jest Setup File**
   - Create a file named `jest.setup.ts` in your project root with the following content:
   ```ts
   /// <reference types="@testing-library/jest-dom" />
   import '@testing-library/jest-dom';
   ```

4. **Type Declarations for Third-Party Libraries**
   - If you use libraries that do not provide their own TypeScript types (e.g., `@radix-ui/react-slot`, `class-variance-authority`), create a file named `declarations.d.ts` in your `src/` folder or project root:
   ```ts
   declare module '@radix-ui/react-slot' {
     import * as React from 'react';
     export const Slot: React.FC<React.PropsWithChildren<{}>>;
   }
   declare module 'class-variance-authority' {
     export function cva(...args: any[]): any;
     export type VariantProps<T> = any;
   }
   ```
   - Make sure your `tsconfig.json` includes this file in the `"include"` array.

5. **Add Test Scripts to package.json**
   - In your `package.json`, add:
   ```json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch"
   }
   ```

6. **Update Dependencies**
   - If you encounter type errors, update your dependencies:
   ```sh
   npm install --save-dev @types/react @types/react-dom @types/jest typescript
   ```

### How to Run Tests

```sh
npm test           # Runs all tests once
npm run test:watch # Runs tests in watch mode (re-runs on file changes)
```

### How to Write Tests
- Place test files next to components or in a `__tests__` folder.
- Use `.test.tsx` or `.test.ts` extensions for test files.
- Example test for a Button component:

```tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Troubleshooting
- Ensure all dependencies are installed: `npm install`
- If you see TypeScript errors, check that your `tsconfig.json` has `"jsx": "react-jsx"` and that you have the latest `@types/react` and `@types/jest` installed.
- If you add new libraries, you may need to add type declarations in `declarations.d.ts`.
- Restart your IDE or TypeScript server after making changes to config or type files.

## Code Formatting with Prettier

This project uses **Prettier** for consistent code formatting across all files.

### Setup Steps

1. **Install Dependencies**
   Run the following command in your project root:
   ```sh
   npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
   ```

2. **Prettier Configuration**
   Create a file named `.prettierrc` in your project root:
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false,
     "bracketSpacing": true,
     "bracketSameLine": false,
     "arrowParens": "avoid",
     "endOfLine": "lf"
   }
   ```

3. **Prettier Ignore File**
   Create a file named `.prettierignore` in your project root:
   ```
   node_modules
   dist
   build
   .next
   .vercel
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   *.log
   ```

4. **ESLint Integration**
   Update your `eslint.config.js` to include Prettier:
   ```js
   module.exports = {
     extends: [
       'eslint:recommended',
       '@typescript-eslint/recommended',
       'prettier'
     ],
     plugins: [
       '@typescript-eslint',
       'prettier'
     ],
     rules: {
       'prettier/prettier': 'error'
     },
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       ecmaFeatures: {
         jsx: true
       }
     }
   };
   ```

5. **Add Scripts to package.json**
   Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
     "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
   }
   ```

### How to Use Prettier

```sh
npm run format        # Format all files
npm run format:check  # Check if files are formatted correctly
```

### VS Code Integration (Optional)

1. Install the Prettier extension for VS Code
2. Add this to your `.vscode/settings.json`:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

This will automatically format your code when you save files in VS Code.

## Application Structure & Features

### Routing & Pages
- Uses React Router for navigation.
- Public routes: `/`, `/login`, `/register`, `/forgot-password`.
- Protected routes (require authentication): `/app/dashboard`, `/app/overview`, `/app/analytics`, `/app/posts`, `/app/comments`, `/app/schedule`, `/app/connectors`, `/app/settings/profile`, `/app/settings/team`, `/app/settings/billing`.

### State Management
- Uses Zustand for global state management (`src/stores/`).
- Auth state is persisted in localStorage.
- UI state (sidebar, theme) is managed globally.

### Component Library & Design System
- Custom, reusable UI components in `src/components/ui/` (e.g., Button, Card, Sidebar, Badge, etc.).
- Components are styled with Tailwind CSS and support variants.

### Layout & Navigation
- Responsive layout with sidebar navigation (`AppSidebar`), header (`Header`), and main content area (`Layout`).
- Sidebar navigation groups: Main, Social Management, Settings.
- Mobile and desktop support.

### Custom Hooks
- `use-toast`: Toast notification system for user feedback.
- `useIsMobile`: Detects mobile viewport for responsive UI.

### Landing Page & Branding
- The landing page (`/`) features platform branding, testimonials, supported social platforms, and a call to action.
- Highlights: Unified dashboard, advanced analytics, automated scheduling, and support for Facebook, Twitter, Instagram, LinkedIn, and YouTube.

For more details, see the code in `src/pages/LandingPage.tsx` and the UI components in `src/components/ui/`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d933d501-14ac-437a-9e9f-cf8a937d89e1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Security Best Practices

To enhance the security of your frontend application, follow these recommendations:

### 1. Content Security Policy (CSP)
Set a strong CSP header on your server or CDN to mitigate XSS and data injection attacks. Example header:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; frame-ancestors 'none';
```

Adjust the policy as needed for your app's requirements.

### 2. Other Security Headers
- `X-Frame-Options: DENY` (prevents clickjacking)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

### 3. General Recommendations
- Never store secrets or API keys in frontend code.
- Always use HTTPS for API calls.
- Sanitize any HTML rendered with `dangerouslySetInnerHTML` (already implemented with DOMPurify).
- Remove debug logs and error traces from production builds.
- Keep dependencies up to date and run `npm audit` regularly.

For more details, see the comment in `vite.config.ts`.

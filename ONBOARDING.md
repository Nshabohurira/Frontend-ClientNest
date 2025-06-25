# Frontend Developer Onboarding Guide

Welcome to the ClientNest Frontend Team! This guide will help you get up and running quickly, understand our workflow, and find the resources you need to be productive.

---

## 1. Project Overview

ClientNest is an AI-powered social media management platform. The frontend is built with React, TypeScript, Vite, Zustand, shadcn-ui, and Tailwind CSS. We use Storybook for component documentation and Jest/React Testing Library for testing.

---

## 2. Prerequisites

- **Node.js 20.x** (required for Storybook and modern tooling)
- **npm** (comes with Node.js)
- **Git**
- (Optional) **VS Code** with Prettier and ESLint extensions

---

## 3. Getting Started

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   - The app will be available at http://localhost:5173 (or as shown in your terminal).

---

## 4. Project Structure

- `src/components/ui/` — Reusable UI components (Button, Card, etc.)
- `src/components/layout/` — Layout components (Sidebar, Header, Layout)
- `src/pages/` — Page components (dashboard, auth, social, settings)
- `src/stores/` — Global state management (Zustand)
- `src/contexts/` — Context API providers (AppContext, ThemeContext)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions
- `src/components/examples/` — Example and demo components
- `.storybook/` — Storybook configuration
- `ONBOARDING.md` — This onboarding guide
- `README.md` — Main project documentation

---

## 5. Code Standards & Best Practices

- **TypeScript:** All code should be strongly typed.
- **Prettier:** Code is auto-formatted. Run `npm run format` before committing.
- **ESLint:** Lint your code with `npm run lint`.
- **Component-Driven:** Build and document UI components in isolation using Storybook.
- **Testing:** Write tests for new components and features using Jest and React Testing Library.
- **Commits:** Use clear, descriptive commit messages.

---

## 6. Running & Testing the App

- **Start the app:**
  ```sh
  npm run dev
  ```
- **Run tests:**
  ```sh
  npm test
  ```
- **Check formatting:**
  ```sh
  npm run format:check
  ```
- **Lint code:**
  ```sh
  npm run lint
  ```

---

## 7. Storybook: Component Documentation

- **Start Storybook:**
  ```sh
  npm run storybook
  ```
- **View at:** http://localhost:6006
- **Add stories:** Create `.stories.tsx` files next to your components.
- **See examples:** Check `src/components/ui/button.stories.tsx` for a template.

---

## 8. Useful Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run test` — Run tests
- `npm run storybook` — Start Storybook
- `npm run format` — Format code with Prettier
- `npm run lint` — Lint code with ESLint

---

## 9. Where to Find Documentation

- **System Architecture:** `system-architecture/README.md`
- **Component Library:** `src/components/ui/` and Storybook
- **State Management:** `src/stores/` (Zustand), `src/contexts/` (Context API)
- **Testing:** See `README.md` and example test files
- **Performance Optimization:** See `src/components/examples/OptimizedComponents.tsx` and `README.md`
- **Security Best Practices:** See `README.md` and `vite.config.ts`

---

## 10. Who to Ask for Help

- **Team Lead:** Miriam Birungi
- **Mentors:** See `team-task-distribution/frontend/`
- **Slack/Discord/Email:** birungimiriam323@gmail.com

---

Welcome aboard! 🚀 
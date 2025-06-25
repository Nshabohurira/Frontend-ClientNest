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

## State Management with Context API

This project implements **React Context API** for global state management alongside Zustand, providing a React-native approach to state management.

### Context Structure

#### 1. **AppContext** (`src/contexts/AppContext.tsx`)
- **Purpose**: Main application state management
- **Features**:
  - Theme management (light/dark)
  - Sidebar state (open/closed)
  - User authentication state
  - Loading states
  - Notification system
  - TypeScript support with strict typing

#### 2. **ThemeContext** (`src/contexts/ThemeContext.tsx`)
- **Purpose**: Dedicated theme management
- **Features**:
  - Light/Dark/System theme support
  - Automatic system theme detection
  - localStorage persistence
  - Real-time theme switching

### Setup

The Context API is already configured in your `App.tsx`:

```tsx
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        {/* Your app components */}
      </AppProvider>
    </ThemeProvider>
  );
}
```

### Usage Examples

#### Using AppContext
```tsx
import { useAppContext } from '@/contexts/AppContext';

function MyComponent() {
  const { 
    state, 
    setTheme, 
    toggleSidebar, 
    addNotification 
  } = useAppContext();

  const handleAddNotification = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully',
    });
  };

  return (
    <div>
      <p>Theme: {state.theme}</p>
      <p>Sidebar: {state.sidebarOpen ? 'Open' : 'Closed'}</p>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <button onClick={handleAddNotification}>Add Notification</button>
    </div>
  );
}
```

#### Using ThemeContext
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <p>Current: {theme} (resolved: {resolvedTheme})</p>
    </div>
  );
}
```

### State Structure

#### AppState Interface
```tsx
interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  user: User | null;
  isLoading: boolean;
}
```

#### Available Actions
- `setTheme(theme)` - Change theme
- `toggleSidebar()` - Toggle sidebar state
- `setSidebarOpen(open)` - Set sidebar open/closed
- `setUser(user)` - Set current user
- `setLoading(loading)` - Set loading state
- `addNotification(notification)` - Add new notification
- `removeNotification(id)` - Remove notification
- `markNotificationRead(id)` - Mark notification as read
- `clearAllNotifications()` - Clear all notifications

### Benefits

1. **React Native**: Uses React's built-in Context API
2. **TypeScript Support**: Full type safety with interfaces
3. **Performance**: Optimized with useReducer for complex state
4. **Developer Experience**: Custom hooks for easy usage
5. **Flexibility**: Can be used alongside other state management solutions
6. **Testing**: Easy to mock and test with React Testing Library

### Example Component

See `src/components/examples/ContextExample.tsx` for a complete example of using both contexts together.

## Performance Optimization

This project implements **React performance optimizations** using React.memo, useMemo, useCallback, and custom performance monitoring hooks.

### Optimization Techniques

#### 1. **React.memo** - Component Memoization
Prevents unnecessary re-renders when props haven't changed:

```tsx
import React from 'react';

const MyComponent = React.memo<MyComponentProps>(({ data, onAction }) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
});

MyComponent.displayName = 'MyComponent';
```

#### 2. **useMemo** - Value Memoization
Caches expensive calculations and derived state:

```tsx
import { useMemo } from 'react';

function MyComponent({ items, filter }) {
  // Expensive calculation - only runs when items or filter change
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  // Derived state - only recalculates when filteredItems change
  const statistics = useMemo(() => {
    return {
      count: filteredItems.length,
      total: filteredItems.reduce((sum, item) => sum + item.value, 0),
    };
  }, [filteredItems]);

  return (
    <div>
      <p>Count: {statistics.count}</p>
      <p>Total: {statistics.total}</p>
    </div>
  );
}
```

#### 3. **useCallback** - Function Memoization
Caches function references to prevent child re-renders:

```tsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Function is memoized - won't cause child re-renders
  const handleChildAction = useCallback((id: string) => {
    console.log(`Action for ${id}`);
  }, []); // Empty dependency array - function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onAction={handleChildAction} />
    </div>
  );
}
```

### Performance Monitoring

#### Custom Hooks for Monitoring

1. **usePerformanceMonitor** - Track component renders:
```tsx
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

function MyComponent(props) {
  usePerformanceMonitor(props, {
    componentName: 'MyComponent',
    logRenders: true,
    logRenderTime: true,
  });

  return <div>Component content</div>;
}
```

2. **usePerformanceTimer** - Measure operation time:
```tsx
import { usePerformanceTimer } from '@/hooks/usePerformanceMonitor';

function MyComponent() {
  const { startTimer, endTimer } = usePerformanceTimer('Expensive Operation');

  const handleExpensiveOperation = () => {
    startTimer();
    // ... expensive operation
    endTimer();
  };
}
```

3. **useRenderTracker** - Track re-render causes:
```tsx
import { useRenderTracker } from '@/hooks/usePerformanceMonitor';

function MyComponent({ data, filter, onAction }) {
  useRenderTracker('MyComponent', [data, filter, onAction]);
  
  return <div>Component content</div>;
}
```

### Example Components

#### Optimized Components (`src/components/examples/OptimizedComponents.tsx`)
- Demonstrates React.memo, useMemo, and useCallback usage
- Includes performance monitoring
- Shows memoized user management and data processing

#### Performance Comparison (`src/components/examples/PerformanceComparison.tsx`)
- Side-by-side comparison of optimized vs non-optimized components
- Real-time render tracking
- Demonstrates performance differences

### Best Practices

1. **When to use React.memo:**
   - Components that receive the same props frequently
   - Components with expensive render logic
   - List items in large lists

2. **When to use useMemo:**
   - Expensive calculations (filtering, sorting, transformations)
   - Derived state that depends on multiple values
   - Object/array creation that's passed as props

3. **When to use useCallback:**
   - Functions passed as props to memoized children
   - Event handlers that don't depend on changing values
   - Functions used in useEffect dependencies

4. **Performance Monitoring:**
   - Use in development to identify optimization opportunities
   - Monitor render counts and timing
   - Track re-render causes

### Optimization Checklist

- [ ] Use React.memo for components that receive stable props
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for functions passed to memoized children
- [ ] Provide stable keys for list items
- [ ] Monitor performance with custom hooks
- [ ] Avoid creating objects/arrays in render
- [ ] Use proper dependency arrays in hooks

### Performance Tips

1. **Profile First:** Use React DevTools Profiler to identify bottlenecks
2. **Measure Impact:** Compare performance before and after optimizations
3. **Don't Over-Optimize:** Only optimize components that actually need it
4. **Monitor in Production:** Use performance monitoring in production builds
5. **Bundle Analysis:** Use tools like webpack-bundle-analyzer to optimize bundle size

See the example components for complete implementation examples.

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

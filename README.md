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

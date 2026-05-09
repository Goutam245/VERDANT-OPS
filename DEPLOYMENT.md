# Deploying from Lovable to GitHub, Netlify, and Vercel

This project stays on TanStack Start because that is the framework Lovable uses for preview, routing, and publishing. It can still be deployed externally from the GitHub repository.

## 1. Connect Lovable to GitHub

- In Lovable, open the **+** menu in the chat input.
- Choose **GitHub**.
- Select **Connect project** and create the repository.

## 2. Netlify settings

Netlify can use the included `netlify.toml`.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `22`

## 3. Vercel settings

Vercel can use the included `vercel.json`.

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

## 4. Environment variables

If the app later uses backend services, auth, storage, payments, or APIs, copy the required environment variables from Lovable into the Netlify/Vercel project settings before deploying.
# Nuxt App

Modern Vue 3 frontend SPA built with Nuxt 4 and Nuxt UI Pro.

## Requirements

- Node.js 24.0.0 or higher
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Configuration

### Environment Variables

- `NUXT_PUBLIC_BACKEND_URL`: Backend API URL (default: http://localhost:8080)

## Tech Stack

- [Nuxt](https://nuxt.com/) ^4.0.1
- [Vue 3](https://vuejs.org/)
- [Nuxt UI Pro](https://ui.nuxt.com/pro) ^3.3.0
- TypeScript
- Tailwind CSS

## Customization

- Global styles: `app/assets/css/main.css`
- Layout: `app/layouts/default.vue`
- Pages: `app/pages/`
- Nuxt config: `nuxt.config.ts`
- App config: `app/app.config.ts`

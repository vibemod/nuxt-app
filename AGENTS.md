# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project

- Web application
- Node.js >= 24.0.0
- Nuxt 4
- Vue 3
- Nuxt UI Pro
- TypeScript
- Tailwind CSS

## Commands

### Setup
```bash
make init        # Copy .env.example → .env
make project     # npm install + setup
```

### Development
```bash
make dev         # Start Nuxt dev server at localhost:3000
```

### Quality Assurance
```bash
make qa          # Run lint
make lint        # ESLint check
```

### Build & Preview
```bash
make build       # nuxt build
make preview     # nuxt preview (production build)
make generate    # nuxt generate (static)
```

## Architecture

```
├── app/
│   ├── app.config.ts       # App-level config
│   ├── app.vue             # Root component
│   ├── assets/css/         # Global styles (main.css)
│   ├── layouts/            # Layouts (default.vue)
│   └── pages/               # File-based routing (index.vue)
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.js      # Tailwind configuration
├── .env.example             # Example env (copy to .env via make init)
└── package.json            # Dependencies and scripts
```

## Configuration

- **Environment**: `NUXT_PUBLIC_BACKEND_URL` — Backend API URL (default: http://localhost:8080)
- **Global styles**: `app/assets/css/main.css`
- **Layout**: `app/layouts/default.vue`
- **Pages**: `app/pages/`

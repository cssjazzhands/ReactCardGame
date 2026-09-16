# Boilerplate for React / Express app written in TS

## Description

This is a web application boilerplate that integrates React, Vite, Express, and TypeScript. This setup provides a robust development environment with hot module replacement for the frontend and an efficient build system for both frontend and backend.

## Features

- React 19 for building user interfaces
- Vite 8 for an ultra-fast frontend development experience
  - Includes CSS modules
  - Uses rolldown bundler (Vite 8 default)
- Express 5 for API endpoints
- TypeScript 5 for type safety
- ESM-first — `"type": "module"` throughout the project
- Esbuild for efficient backend builds — watch mode with automatic server restart (no nodemon)
- Vitest for unit testing with junit output
- Explicit routing via `react-router` (`/src/pages`)
- `/src/public` for static assets
- Proxying of API endpoints through Vite during development
- Common typings between frontend and backend
- ESLint with rules from recent projects (react-hooks, security rules, pinned deps enforcement)
- Stylelint for CSS linting
- Prettier with standard rules
- VS Code debugging for frontend / backend
- Docker deployment
  - Only `prod` setup for now

### Notes

- Express `.env` reference is the typical `process.env.VALUE`
- Client-side (build time by Vite) `.env` reference is `import.meta.env.VALUE`
- Build-time constants `__APP_VERSION__` and `__GIT_COMMIT__` are injected by esbuild and Vite

## Tech stack versions

| Package              | Version |
| -------------------- | ------- |
| react / react-dom    | 19.x    |
| vite                 | 8.x     |
| express              | 5.x     |
| typescript           | 5.x     |
| vitest               | 4.x     |
| react-router         | 7.x     |
| dotenv               | 17.x    |
| esbuild              | 0.28.x  |
| @vitejs/plugin-react | 6.x     |
| stylelint            | 17.x    |

## Installation

1. To get started, clone the repository and install the dependencies:

   ```bash
   git clone https://github.com/bfeist/vite-express-ts.git
   cd vite-express-ts
   npm install
   ```

2. Then create a `.env` file by copying `.env.sample` to `.env`

## Usage

### Development

To start both the frontend and backend in development mode, run:

```bash
npm run dev
```

This starts the esbuild watch process, which builds the Express server and restarts it automatically on changes. Once the API is healthy, the Vite dev server starts for the frontend.

- Frontend: `http://localhost:9500`
- Backend API: `http://localhost:9501`

### Build

To build the application for production:

```bash
npm run build
```

Builds both frontend and backend. Output goes to `.local/vite/dist` and `.local/express/dist` respectively.

### Start Production Server

After building, start the production server with:

```bash
npm run api:prod
```

This runs the Express server that serves `/api/v1` endpoints on port 9501.

### Testing

```bash
npm run test            # vitest run (single pass)
npm run test:coverage   # vitest run with coverage report
npm run test:all        # lint + tsc + build + test
```

### Deploy via Docker

Before running Docker locally, create the self-signed development certificate once:

```bash
bash ./scripts/make-dev-ssl-cert.sh
```

This mirrors the setup used in the `../coda` codebase: the script writes `nginx.crt` and `nginx.key` into `./.local`, and those files are mounted into the nginx container at `/etc/pki/tls/...` for local HTTPS.

- `npm run docker:preview:rebuild`
  - Builds two docker images:
    - `nginx`
      - vite is used to build the front-end (React) to static assets in `/.local/vite/dist`
      - these are copied into the nginx image at the default nginx path
      - `/api/v1/` routes are proxied to the `express` server
    - `express`
      - esbuild is used to build to a static file `/.local/express/dist/api.js`
      - this file is copied to a node container and run with `node /api.js`
- `npm run docker:preview` to start the containers
- Go to `https://localhost` to hit the nginx server
- Your browser will likely show a self-signed certificate warning the first time; accept it for local development

## Structure

- `src/` — React frontend source
- `src/server/` — Express backend source
- `src/pages/` — Route components (add a `<Route>` in `App.tsx` for each)
- `src/utils/` — Shared utilities (available to both client and server via path alias)
- `src/typings/` — Global ambient type declarations
- `src/styles/` — Global CSS
- `vitest.config.mts` — Vitest configuration (extends `vite.config.mts`)
- `esbuild.mjs` — Esbuild script for bundling the Express server
- `stylelint.config.js` — CSS linting configuration
- `.local/vite/dist` — Built frontend files
- `.local/express/dist` — Built backend server files

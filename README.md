# Nationbuilder exercise

### How to run this locally

1. Copy [`.env.template`](./.env.template) to `.env` and add the Nationbuilder credentials
2. `yarn` in directory to install dependencies
3. `yarn dev` to start dev server
4. Visit [http://localhost:3000](http://localhost:3000) for a demo of the development tasks

### Inspecting the code

- **[lib/nationbuilder.ts](./lib/nationbuilder.ts)** for code that interacts directly with Nationbuilder's REST API
- **[pages/api](./pages/api)** for the serverless function definitions which consume these Nationbuilder helpers
- **[components/exercises](./components/exercises)** to see the shape of data that passes through to the serverless functions
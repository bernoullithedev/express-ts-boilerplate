Here’s a refined and polished version of your **Express.js + TypeScript + Biome** boilerplate README. I’ve improved grammar, tightened explanations, and adjusted formatting for clarity and readability while keeping your original content intact.

---

# 🚀 Express.js + TypeScript + Biome Boilerplate

A modern boilerplate to build scalable, secure, and maintainable REST APIs using **Express.js** and **TypeScript**, with code quality enforced via **Biome**.

---

## 📦 Tech Stack

- **[Express](https://expressjs.com/)** – Minimal and flexible Node.js web application framework.
- **[TypeScript](https://www.typescriptlang.org/)** – JavaScript with static types.
- **[Biome](https://biomejs.dev/)** – All-in-one tool for linting, formatting, and more.
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Loads environment variables from `.env` file.
- **[cors](https://www.npmjs.com/package/cors)** – Middleware for Cross-Origin Resource Sharing.
- **[helmet](https://helmetjs.github.io/)** – Sets secure HTTP headers.
- **[morgan](https://www.npmjs.com/package/morgan)** – HTTP request logger.
- **[winston](https://www.npmjs.com/package/winston)** – Versatile logging library.
- **[luxon](https://moment.github.io/luxon/)** – Date and time utility library.
- **[zod](https://zod.dev/)** – Type-safe schema validation library.

---

## ✨ Features

- 🧱 Modular project architecture
- 🛡️ Secure setup with Helmet and CORS
- 🔐 Authentication & Authorization ready
- ⚙️ Environment-based config management
- 🧪 Centralized error handling
- 🧾 Logging with Winston
- ✅ Type-safe validation using Zod
- 💅 Code linting and formatting via Biome
- ⚡ Deployed via Vercel (optional)

---

## 🧭 Project Structure

```
express-ts-boilerplate/
├── .env                         # Environment variables
├── .env.example                 # Sample environment file
├── .gitignore
├── .husky/                      # Pre-commit hook
│   └── pre-commit
├── api/                         # API entry layer (optional organization)
│   └── index.ts
├── biome.json                   # Biome config
├── config/                      # Environment-specific configuration
│   ├── custom-environment-variables.json
│   ├── default.json
│   ├── development.json
│   ├── production.json
│   └── stage.json
├── public/                      # Static assets
│   └── index.html
├── src/                         # Main application source
│   ├── app.ts                   # App bootstrap
│   ├── index.ts                 # Server start
│   ├── connections/             # Database/other service connections
│   ├── controllers/             # Route controllers
│   │   └── health.ts
│   ├── interactor/              # Business logic layer
│   ├── lib/                     # Shared utilities
│   │   ├── controllerWrapper.ts
│   │   └── error/
│   │       └── custom.error.ts
│   ├── middlewares/            # Middleware logic
│   │   ├── middlewares.ts
│   │   └── response.ts
│   ├── models/                  # Data models
│   ├── routes.ts                # API route definitions
│   ├── services/                # Service layer
│   └── utils/                   # Logger, helper functions
│       ├── logger.ts
│       └── winstonLogger.ts
├── package.json
├── tsconfig.json
└── vercel.json                  # Vercel deployment config
```

---

## ⚙️ Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/arnavsharma2711/express-ts-boilerplate.git
   cd express-ts-boilerplate
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Run in development mode:**

   ```bash
   npm run dev
   ```

---

## 🛠️ Scripts

| Script         | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Run server with live reload via `ts-node-dev` |
| `npm run build`| Transpile TypeScript to JavaScript |
| `npm run start`| Run the built server |
| `npm run format` | Format code using Biome |
| `npm run lint`   | Lint code using Biome |

---

## 🌐 Deployment

This project includes a `vercel.json` file for easy deployment on [Vercel](https://vercel.com/). Just push the repo to GitHub and import it into Vercel for automatic deployment.

---

## 🧪 TODOs / Future Enhancements

- Add unit and integration testing setup (Jest or Vitest)
- Add Swagger API docs
- JWT-based authentication
- Support for multiple database adapters (e.g., MongoDB, PostgreSQL)

---

Let me know if you'd like to add Docker support, a CI pipeline, or Prisma integration next!

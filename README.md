# Triads Future

Triads Future is a monochrome, calm, and editorial marketing prototype and showcase website built using Next.js 16 and Tailwind CSS v4, highlighting services, case studies, and insights for a modern premium agency.

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:
* **Node.js**: Version `>=20.9.0` (Verify using `node -v`)
* **pnpm**: Fast, disk space efficient package manager (Verify using `pnpm -v`, or install globally via `npm install -g pnpm`)
* **Git**: To clone the repository and manage version control

## Installation

Follow these copy-pasteable commands step-by-step to get the project running locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbinashShaji/Triads_future.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd triads_future
   ```

3. **Install the dependencies:**
   ```bash
   pnpm install
   ```

4. **Configure environment variables:**
   > [!NOTE]
   > The project currently runs fully self-contained on mock data and does not require any environment variables or API keys. You can skip setting up a `.env` or `.env.local` file.

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

6. **Open the application in your browser:**
   Go to [http://localhost:3000](http://localhost:3000) to see the running project.

---

## Available Scripts

The following scripts are defined in `package.json` and can be run using `pnpm`:

* **`pnpm dev`**: Starts the development server with hot-reloading at `http://localhost:3000`. Use this for local development.
* **`pnpm build`**: Builds the application for production usage. It compiles and optimizes the Next.js pages and Tailwind styles into the `.next` directory.
* **`pnpm start`**: Starts the Next.js production server. This requires running `pnpm build` first to compile the application.
* **`pnpm lint`**: Runs ESLint across the codebase to check for code quality, formatting guidelines, and lint issues.

---

## Project Structure

A high-level overview of the top-level folders and key directories in the project:

* **`src`**: Holds the main application source code including the pages, reusable React components, custom animations, mock data, and global utilities.
  * **`src/app`**: Uses the Next.js App Router to define the application's page routes (e.g., Home, `/about`, `/solutions`, `/work`, `/insights`, `/contact`). It also manages the global layout styling.
  * **`src/components`**: Contains reusable UI elements like buttons, cards, badges, and layout primitives such as the navigation menu, header, and footer.
  * **`src/animations`**: Holds reusable Framer Motion configurations and transition variants to power the site's calm, rising animation transitions.
  * **`src/mock`**: Contains local data structures (mock case studies, blog posts, and menu configurations) that supply static content to the pages.
  * **`src/providers`**: Houses global React Context Providers, including the Framer Motion settings and animation provider.
  * **`src/utils`**: Contains helper functions such as class name merge configurations (`cn`) that combine Tailwind CSS classes dynamically.
* **`public`**: Contains static assets served directly to the browser, such as the company logo and other vector brand resources.

---

## Troubleshooting

Here are solutions to common issues that might arise during your first run:

### Wrong Node.js Version
* **Issue**: The project or its dependencies (such as Next.js 16) fail to install or start, throwing syntax errors or engine mismatch errors.
* **Solution**: Ensure your active Node.js version is `>=20.9.0` by running `node -v`. If it is older, use a version manager like `nvm` to switch:
  ```bash
  nvm use 20
  # or
  nvm use 22
  ```

### Port Already in Use (Port 3000)
* **Issue**: Starting the development server throws an error indicating that port `3000` is already in use.
* **Solution**: You can specify a different port for the Next.js development server using the `--port` argument:
  ```bash
  pnpm dev -- --port 3001
  ```

### Native Dependency Errors
* **Issue**: Errors related to native dependencies like `sharp` or `unrs-resolver` during build or install.
* **Solution**: The project workspace handles these in `pnpm-workspace.yaml`. If you hit local compilation issues, clear your build cache and reinstall:
  ```bash
  # Remove cached build output and dependencies
  rm -rf .next node_modules
  
  # Clean install
  pnpm install
  ```

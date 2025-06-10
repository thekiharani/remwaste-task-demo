# Skip Selector - Front-End Redevelopment Challenge

This project is a complete redesign and rebuild of the "Choose Your Skip Size" page for a waste management service. The primary objective was to move beyond a simple reskin and engineer a fundamentally superior user experience, demonstrating a robust, modern, and maintainable front-end architecture.

**Live Demo:** **[https://remwaste-task-demo.vercel.app](https://remwaste-task-demo.vercel.app)**

## Engineering Approach and Philosophy

My approach was guided by three principles: transforming the user experience from a basic tool to a confident service, implementing a scalable and maintainable architecture, and ensuring data integrity through a resilient processing pipeline.

### 1. User Experience as a Service

The original design was a functional but unguided tool. This redesign transforms it into a service that builds user trust and facilitates confident decision-making.

- **Clarity and Guidance:** A high-visibility progress bar, clear pricing, and dynamically generated descriptions provide immediate context. The user always understands where they are in the booking process and has the necessary information to proceed.
- **Building Trust:** The clean, bright aesthetic was a deliberate choice to evoke professionalism and reliability. This visual language, combined with reassuring microcopy, establishes the platform as a legitimate and trustworthy service provider.

### 2. Architecture and Technology Justification

The technology stack was selected to meet modern standards for performance, type safety, and developer experience.

- **Foundation:** **Vite + React + TypeScript**. Vite provides an exceptionally fast development server and optimized builds. React's component model is the industry standard for building complex UIs, and TypeScript ensures strict type safety across the entire application, which is critical for reducing runtime errors and improving long-term maintainability.

- **Styling:** **Tailwind CSS**. A utility-first CSS framework was chosen for its ability to enable rapid and consistent UI development. By co-locating styles with markup, it eliminates context-switching and enforces a constrained design system, preventing CSS bloat and inconsistencies.

- **Server State Management:** **TanStack Query (React Query)**. I made the critical architectural decision to use TanStack Query instead of manual `useEffect` hooks for data fetching. This library abstracts away the complexity of server state, providing robust, out-of-the-box handling for loading, error, and success states. Its powerful features, particularly caching and the `select` option for data transformation, were integral to the data processing pipeline.

### 3. The Data Transformation Pipeline: A Solution for an Incomplete API

A significant engineering challenge was the API's data contract. The endpoint provides raw, UI-unfriendly data, lacking essential fields like descriptive names, images, and user-friendly pricing.

To address this, I engineered a data transformation pipeline to decouple the API's raw shape from the UI's presentation requirements. This is a crucial pattern for building resilient applications that can consume imperfect APIs.

**The Flow:**

> **API (Raw Data) → `useSkips` Hook → `processSkips` Utility → Components (Clean, UI-Ready Data)**

- **Type-Safe Contracts (`RawSkip` vs. `Skip`):** I defined two distinct TypeScript types in `src/types`. `RawSkip` is a 1:1 match of the API response, ensuring accurate data ingestion. `Skip` represents the clean, enriched data model our components expect. This creates a strong, self-documenting contract that prevents invalid data from reaching the UI.

- **The Processing Core (`src/utils/skipUtils.ts`):** This pure function is the heart of the pipeline. It is responsible for:
  1.  **Filtering:** Removing any "forbidden" skips from the list.
  2.  **Calculation:** Computing the final price from `price_before_vat` and `vat`.
  3.  **Dynamic Content Generation:** Creating user-friendly descriptions based on the skip's `size` and `allows_heavy_waste` properties.
  4.  **Data Mapping:** Translating API booleans (e.g., `allowed_on_road`) to more intuitive UI-facing booleans (`is_permit_required`).
  5.  **Data Enrichment:** Acting as a "shim" to add the names and image URLs currently missing from the API response.

This architecture ensures that our React components remain simple, declarative, and focused solely on presentation, as they receive data in the exact shape they need.

## Project Structure

The codebase is organized into a standard, feature-scalable structure to promote maintainability and a clear separation of concerns.

```
/ (root)
├── .env                # Local environment variables (untracked by Git)
├── .env.example        # Example environment file for repository
└── src/
    ├── components/   # Reusable, self-contained UI components (e.g., SkipCard)
    ├── hooks/        # Custom React hooks (e.g., useSkips)
    ├── pages/        # Page-level components that compose the UI
    ├── utils/        # Pure helper functions (e.g., processSkips data transformer)
    ├── types/        # TypeScript type definitions and interfaces
    └── public/       # Static assets (e.g., images)
```

## Project Configuration

### Path Aliasing

This project is configured with a path alias `@` which maps to the `src/` directory. This was configured in `tsconfig.json` and `vite.config.ts`.

**Justification:** Using an absolute path alias (`@/components/SkipCard`) is superior to deep relative paths (`../../../components/SkipCard`). It improves code readability and makes refactoring significantly easier, as components can be moved without needing to update their import paths.

### Environment Variables

The project uses an environment variable to define the API endpoint URL.

1.  Create a `.env` file in the project root by copying the example:
    ```bash
    cp .env.example .env
    ```
2.  Update the `VITE_API_URL` variable in the `.env` file with the correct endpoint.

## Running the Project Locally

1.  **Clone the repository:**

    ```bash
    # Clone via HTTPS
    git clone https://github.com/thekiharani/remwaste-task-demo.git

    # Clone via SSH
    git clone git@github.com:thekiharani/remwaste-task-demo.git

    # move to the task dir
    cd remwaste-task-demo
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables** as described above.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3002`.

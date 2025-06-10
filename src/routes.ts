import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Root } from '@/components/Root';
import { SkipSelectorPage } from '@/pages/SkipSelectorPage';

// 1. top-level "root" route: main app layout.
const rootRoute = createRootRoute({
  component: Root,
});

// 2. the "index" route (the page for the '/' URL) as a child of the root
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SkipSelectorPage,
});

// 2.1. have an alias for the index route
const skipSelectorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skip-selector',
  component: SkipSelectorPage,
});

// 3. assemble the route tree
const routeTree = rootRoute.addChildren([indexRoute, skipSelectorRoute]);

// 4. create the router instance
export const router = createRouter({ routeTree });

// 5. declare module for type-safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

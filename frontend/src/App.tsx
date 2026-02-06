import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Route as rootRoute } from './routes/__root.tsx';
import { Route as indexRoute } from './routes/index.tsx';
import { Route as adminRoute } from './routes/admin.tsx';

// Create the route tree manually since we aren't using the CLI generator
const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

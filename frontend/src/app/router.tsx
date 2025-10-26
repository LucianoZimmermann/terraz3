import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Shell } from "../features/shell/MainMenu";
import TractOwnersPage from "../features/tract_owner/components/page";

export function makeRouter(shellProps: {
  mode: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const rootRoute = createRootRoute({
    component: () => (
      <Shell {...shellProps}>
        <Outlet />
      </Shell>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div />,
  });

  const tractOwnersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/tract-owners",
    component: TractOwnersPage,
  });

  const routeTree = rootRoute.addChildren([indexRoute, tractOwnersRoute]);
  return createRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}

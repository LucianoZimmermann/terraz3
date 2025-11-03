import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Shell } from "../features/shell";
import TractOwnersPage from "../features/tract_owner/components/page";
import TractsPage from "../features/tract/components/page";
import ThirdPartiesPage from "../features/third_party/components/page";
import NeighborhoodsPage from "../features/neighborhood/components/page";
import QuotesPage from "../features/quotation/components/page";
import { Welcome } from "../common/atomic/organisms/Welcome";

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
    component: Welcome,
  });

  const tractOwnersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/tract-owners",
    component: TractOwnersPage,
  });

  const tractRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/tracts",
    component: TractsPage,
  });

  const thirdPartyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/third-parties",
    component: ThirdPartiesPage,
  });

  const neighborhoodRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/neighborhoods",
    component: NeighborhoodsPage,
  });

  const quotesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/quotes",
    component: QuotesPage,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    tractOwnersRoute,
    tractRoute,
    thirdPartyRoute,
    neighborhoodRoute,
    quotesRoute,
  ]);
  return createRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}

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
import QuotesPage from "../features/quotation/components/page";
import CreateQuotesPage from "../features/quotation/components/createPage";
import EditQuotePage from "../features/quotation/components/editPage";
import ViewQuotePage from "../features/quotation/components/viewPage";

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
    component: QuotesPage,
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

  const quotesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/quotes",
    component: QuotesPage,
  });

  const createQuoteRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/create-quote",
    component: CreateQuotesPage,
  });

  const editQuoteRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/edit-quote/$quoteId",
    component: EditQuotePage,
  });

  const viewQuoteRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/view-quote/$quoteId",
    component: ViewQuotePage,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    tractOwnersRoute,
    tractRoute,
    thirdPartyRoute,
    quotesRoute,
    createQuoteRoute,
    editQuoteRoute,
    viewQuoteRoute,
  ]);
  return createRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}

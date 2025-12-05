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
import LoginPage from "../features/login";

export function makeRouter(shellProps: {
  mode: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: LoginPage,
  });

  const appRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "app",
    component: () => (
      <Shell {...shellProps}>
        <Outlet />
      </Shell>
    ),
  });

  const tractOwnersRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "tract-owners",
    component: TractOwnersPage,
  });

  const tractRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "tracts",
    component: TractsPage,
  });

  const thirdPartyRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "third-parties",
    component: ThirdPartiesPage,
  });

  const quotesRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "quotes",
    component: QuotesPage,
  });

  const createQuoteRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "create-quote",
    component: CreateQuotesPage,
  });

  const editQuoteRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "edit-quote/$quoteId",
    component: EditQuotePage,
  });

  const viewQuoteRoute = createRoute({
    getParentRoute: () => appRoute,
    path: "view-quote/$quoteId",
    component: ViewQuotePage,
  });

  const routeTree = rootRoute.addChildren([
    loginRoute,
    appRoute.addChildren([
      tractOwnersRoute,
      tractRoute,
      thirdPartyRoute,
      quotesRoute,
      createQuoteRoute,
      editQuoteRoute,
      viewQuoteRoute,
    ]),
  ]);

  return createRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}

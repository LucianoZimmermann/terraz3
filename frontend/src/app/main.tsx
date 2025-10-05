import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { MUIProvider } from "./providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <MUIProvider>
        <App />
      </MUIProvider>
    </QueryProvider>
  </StrictMode>,
);

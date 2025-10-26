import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryProvider } from "./providers/query-provider";
import { MUIProvider } from "./providers/theme-provider";

function Root() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <QueryProvider>
      <MUIProvider mode={mode}>
        <App
          mode={mode}
          onToggleTheme={() =>
            setMode((m) => (m === "dark" ? "light" : "dark"))
          }
        />
      </MUIProvider>
    </QueryProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

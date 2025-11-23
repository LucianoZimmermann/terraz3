import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryProvider } from "./providers/query-provider";
import { MUIProvider } from "./providers/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "process";

const CLIENT_ID = env.GOOGLE_OAUTH_CLIENT_ID;

function Root() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <QueryProvider>
      <MUIProvider mode={mode}>
        <GoogleOAuthProvider clientId={CLIENT_ID!}>
          <App
            mode={mode}
            onToggleTheme={() =>
              setMode((m) => (m === "dark" ? "light" : "dark"))
            }
          />
        </GoogleOAuthProvider>
      </MUIProvider>
    </QueryProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

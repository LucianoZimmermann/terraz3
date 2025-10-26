import { RouterProvider } from "@tanstack/react-router";
import { makeRouter } from "./router";

export default function App({
  mode,
  onToggleTheme,
}: {
  mode: "dark" | "light";
  onToggleTheme: () => void;
}) {
  return <RouterProvider router={makeRouter({ mode, onToggleTheme })} />;
}

import { CssBaseline, ThemeProvider, createTheme, alpha } from "@mui/material";
import type React from "react";

const glass = (
  bg: string,
  border: string,
  shadow = "0 10px 30px rgba(0,0,0,0.25)",
) => ({
  background: bg,
  border: `1px solid ${border}`,
  backdropFilter: "blur(16px) saturate(120%)",
  WebkitBackdropFilter: "blur(16px) saturate(120%)",
  boxShadow: shadow,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8b5cf6" },
    secondary: { main: "#22d3ee" },
    background: {
      default: "#0b0b0f",
      paper: alpha("#11131a", 0.85), // 85% opaco
    },
    divider: alpha("#ffffff", 0.14),
    text: {
      primary: alpha("#ffffff", 0.92),
      secondary: alpha("#ffffff", 0.65),
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -20%, rgba(139,92,246,0.15), transparent), radial-gradient(800px 400px at 90% 0%, rgba(34,211,238,0.10), transparent)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(17,19,26,0.65)", "rgba(255,255,255,0.12)"),
        },
      ],
    },
    MuiAppBar: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(17,19,26,0.55)", "rgba(255,255,255,0.12)"),
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(17,19,26,0.6)", "rgba(255,255,255,0.12)"),
        },
      ],
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
  },
});

const lightBase = "#eef0f3";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7c3aed" },
    secondary: { main: "#06b6d4" },
    background: {
      default: lightBase,
      paper: alpha("#ffffff", 0.82),
    },
    divider: alpha("#000000", 0.12),
    text: {
      primary: alpha("#0b0b0f", 0.92),
      secondary: alpha("#0b0b0f", 0.65),
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightBase,
          backgroundImage:
            "radial-gradient(900px 400px at 8% -10%, rgba(124,58,237,0.08), transparent), radial-gradient(700px 350px at 92% 0%, rgba(6,182,212,0.06), transparent)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
      variants: [
        {
          props: { variant: "glass" },
          style: glass(
            "rgba(255,255,255,0.55)",
            "rgba(0,0,0,0.08)",
            "0 10px 30px rgba(0,0,0,0.15)",
          ),
        },
      ],
    },
    MuiAppBar: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass(
            "rgba(255,255,255,0.65)",
            "rgba(0,0,0,0.08)",
            "0 10px 30px rgba(0,0,0,0.12)",
          ),
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass(
            "rgba(255,255,255,0.6)",
            "rgba(0,0,0,0.08)",
            "0 10px 30px rgba(0,0,0,0.12)",
          ),
        },
      ],
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
  },
});

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    glass: true;
  }
}
declare module "@mui/material/AppBar" {
  interface AppBarPropsVariantOverrides {
    glass: true;
  }
}
declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    glass: true;
  }
}

export function MUIProvider({
  children,
  mode = "dark",
}: {
  children: React.ReactNode;
  mode?: "dark" | "light";
}) {
  const theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

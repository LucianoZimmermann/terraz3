// src/app/providers/mui-theme.ts
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type React from "react";

// opcional: module augmentation para permitir variant="glass"
declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    glass: true;
  }
}
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

const glass = (
  bg = "rgba(255,255,255,0.08)",
  border = "rgba(255,255,255,0.18)",
) => ({
  background: bg,
  border: `1px solid ${border}`,
  backdropFilter: "blur(16px) saturate(120%)",
  WebkitBackdropFilter: "blur(16px) saturate(120%)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8b5cf6" }, // roxo elegante
    secondary: { main: "#22d3ee" }, // ciano
    background: { default: "#0b0b0f", paper: "#121218" },
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
    MuiAppBar: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(18,18,24,0.45)", "rgba(255,255,255,0.12)"),
        },
      ],
      styleOverrides: {
        root: { borderBottom: "1px solid rgba(255,255,255,0.08)" },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(255,255,255,0.06)", "rgba(255,255,255,0.15)"),
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(255,255,255,0.05)", "rgba(255,255,255,0.14)"),
        },
      ],
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7c3aed" },
    secondary: { main: "#06b6d4" },
    background: { default: "#fafafa", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -20%, rgba(124,58,237,0.08), transparent), radial-gradient(800px 400px at 90% 0%, rgba(6,182,212,0.06), transparent)",
        },
      },
    },
    MuiAppBar: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(255,255,255,0.65)", "rgba(0,0,0,0.08)"),
        },
      ],
      styleOverrides: { root: { borderBottom: "1px solid rgba(0,0,0,0.06)" } },
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(255,255,255,0.55)", "rgba(0,0,0,0.08)"),
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "glass" },
          style: glass("rgba(255,255,255,0.5)", "rgba(0,0,0,0.08)"),
        },
      ],
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
  },
});

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

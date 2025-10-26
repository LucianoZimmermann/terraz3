// src/features/shell/Shell.tsx
import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LandscapeIcon from "@mui/icons-material/Landscape";
import PersonIcon from "@mui/icons-material/Person";

const DRAWER_W = 240;
const MINI_W = 72;

const items = [
  { label: "Cotações", icon: <ReceiptLongIcon />, to: "/quotes" },
  { label: "Bairros", icon: <LocationCityIcon />, to: "/neighborhoods" },
  { label: "Terceiros", icon: <HandshakeIcon />, to: "/third-parties" },
  { label: "Terrenos", icon: <LandscapeIcon />, to: "/tracts" },
  { label: "Donos de Terrenos", icon: <PersonIcon />, to: "/tract-owners" },
];

export function Shell({
  children,
  mode,
  onToggleTheme,
}: {
  children: React.ReactNode;
  mode: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        variant="glass"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 700, ml: 1, flexGrow: 1 }}>
            Terraz
          </Typography>

          {/* Toggle de tema no canto direito */}
          <IconButton
            color="inherit"
            aria-label="alternar tema"
            onClick={onToggleTheme}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? DRAWER_W : MINI_W,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_W : MINI_W,
            boxSizing: "border-box",
            transition: "width 200ms",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {items.map((it) => (
            <ListItemButton
              key={it.label}
              onClick={() => {
                /* navigate(it.to) */
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{it.icon}</ListItemIcon>
              {open && <ListItemText primary={it.label} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open ? `${DRAWER_W}px` : `${MINI_W}px`,
          transition: "margin 200ms",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

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
import { useNavigate } from "@tanstack/react-router";
import HomeIcon from "@mui/icons-material/Home";
import IconBtn from "../../common/atomic/atoms/buttons/IconButton";

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
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <AppBar
        position="fixed"
        variant="glass"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, color: "text.primary" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            sx={{ color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>

          <IconBtn aria-label="Home" onClick={() => navigate({ to: "/" })}>
            <HomeIcon color="primary" fontSize="small" />
          </IconBtn>

          <Typography variant="h6" sx={{ fontWeight: 700, ml: 1, flexGrow: 1 }}>
            Terraz
          </Typography>

          <IconButton
            aria-label="alternar tema"
            onClick={onToggleTheme}
            sx={{ color: "text.primary" }}
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
                navigate({ to: it.to });
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
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

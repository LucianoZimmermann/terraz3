// src/app/ui/layout/TopBar.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const items = [
  { label: "Neighborhoods", to: "/neighborhoods" },
  { label: "Addresses", to: "/addresses" },
  { label: "Tract Owners", to: "/tract-owners" },
  { label: "Third Parties", to: "/third-parties" },
  { label: "Tracts", to: "/tracts" },
  { label: "Quotes", to: "/quotes" },
  { label: "Factor Types", to: "/factor-types" },
  { label: "Factors", to: "/factors" },
];

export function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Terraz
        </Typography>

        <Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {items.map((it) => (
              <MenuItem
                key={it.to}
                component={RouterLink}
                to={it.to}
                onClick={() => setAnchorEl(null)}
              >
                {it.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

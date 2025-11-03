import { Link } from "@tanstack/react-router";
import { Box, Stack, Typography, Button } from "@mui/material";

export function Welcome() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        textAlign="center"
        sx={{ maxWidth: 720, width: "100%" }}
      >
        <Typography variant="h3">Bem-vindo</Typography>
        <Typography variant="body1">
          Use os atalhos abaixo para começar.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mt: 1 }}
        >
          <Button component={Link} to="/quotes" variant="outlined">
            Cotações
          </Button>
          <Button component={Link} to="/neighborhoods" variant="outlined">
            Bairros
          </Button>
          <Button component={Link} to="/third-parties" variant="outlined">
            Terceiros
          </Button>
          <Button component={Link} to="/tracts" variant="outlined">
            Terrenos
          </Button>
          <Button component={Link} to="/tract-owners" variant="outlined">
            Donos de Terrenos
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

// App.tsx
import { Container, Stack, Typography } from "@mui/material";
import { Shell } from "../features/shell/MainMenu";

export default function App({
  mode,
  onToggleTheme,
}: {
  mode: "dark" | "light";
  onToggleTheme: () => void;
}) {
  return (
    <Shell mode={mode} onToggleTheme={onToggleTheme}>
      <Container sx={{ mt: 10 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Bem-vindo ao Terraz</Typography>
          <Typography>
            Este é o sistema de gerenciamento de cotações e terrenos.
          </Typography>
        </Stack>
      </Container>
    </Shell>
  );
}

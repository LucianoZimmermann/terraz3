import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

type MeResponse = {
  authenticated: boolean;
  name?: string;
  email?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeResponse | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data: MeResponse = await res.json();
        if (data.authenticated) {
          setUser(data);
          navigate({ to: "/quotes" });
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Erro ao verificar sessão", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => theme.palette.background.default,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3} alignItems="stretch">
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Acessar o sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Faça login utilizando sua conta Google cadastrada no sistema.
            </Typography>
          </Box>

          {user?.authenticated && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
              }}
            >
              <Typography variant="body2">
                Você já está logado como{" "}
                <strong>{user.name ?? user.email}</strong>.
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleGoogleLogin}
            sx={{
              textTransform: "none",
              py: 1.2,
              fontWeight: 600,
            }}
          >
            Logar com o Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

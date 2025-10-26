import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTractOwners } from "../queries";
import Button from "../../../common/atomic/atoms/buttons/Button";

export default function TractOwnersPage() {
  const { data, isLoading, isError } = useTractOwners();

  if (isLoading)
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  if (isError)
    return (
      <Typography color="error" mt={4}>
        Falha ao carregar donos de terrenos.
      </Typography>
    );

  const rows = data ?? [];

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Donos de Terrenos</Typography>
      <Paper variant="glass">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.cpf}</TableCell>
                <TableCell>
                  <Button>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="body2">
                    Nenhum registro encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}

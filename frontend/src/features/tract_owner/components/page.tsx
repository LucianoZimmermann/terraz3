import { useState } from "react";
import { useTractOwners } from "../queries";
import {
  useDeleteTractOwner,
  useDeleteTractOwnerCascade,
  useUpdateTractOwner,
} from "../mutations";
import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import { TractOwner } from "../types";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { maskCPF } from "../../../common/utils";
import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import {
  extractProblem,
  getProblemCode,
} from "../../../common/api/types/AppError";
import {
  useOwnerDeletionConflict,
  useOwnerDeletionOpen,
  useProblemStore,
} from "../../../common/state/problem.store";

export default function TractOwnersPage() {
  const { data, isLoading, isError } = useTractOwners();
  const updateOwner = useUpdateTractOwner();
  const deleteOwner = useDeleteTractOwner();
  const deleteOwnerCascade = useDeleteTractOwnerCascade();

  const conflict = useOwnerDeletionConflict();
  const open = useOwnerDeletionOpen();
  const setProblem = useProblemStore((s) => s.setProblem);
  const clearProblem = useProblemStore((s) => s.clear);

  const [editRow, setEditRow] = useState<TractOwner | null>(null);

  function digits(s: string) {
    return s.replace(/\D/g, "");
  }

  function onEdit(id: number) {
    const row = (data || []).find((r) => r.id === id) || null;
    setEditRow(row);
  }

  function onDelete(id: number) {
    if (deleteOwner.isPending || open) return;
    deleteOwner.mutate(id, {
      onError: (err) => {
        if (err.code === "OWNER_HAS_DEPENDENTS") {
          const pd = extractProblem(err);

          console.log("pd", pd);

          if (pd) setProblem(pd);
          console.log("open", open);
        }
      },
    });
  }

  const columns: Array<ColumnDef<TractOwner>> = [
    { key: "name", header: "Nome" },
    { key: "cpf", header: "CPF", render: (r) => maskCPF(r.cpf) },
  ];

  const fields: Array<FieldDef<TractOwner>> = [
    { key: "name", label: "Nome", type: "text", required: true },
    {
      key: "cpf",
      label: "CPF",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="CPF"
          value={maskCPF(String(value ?? ""))}
          onChange={(e) => set(digits(e.target.value))}
        />
      ),
    },
  ];

  return (
    <>
      <EntityTable<TractOwner>
        title="Donos de Terrenos"
        data={data}
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        getRowId={(r) => r.id}
        actions={(row) => (
          <Stack direction="row" spacing={0.5}>
            <IconBtn aria-label="Editar" onClick={() => onEdit(row.id)}>
              <EditIcon color="primary" fontSize="small" />
            </IconBtn>
            <IconBtn
              aria-label="Excluir"
              color="error"
              onClick={() => onDelete(row.id)}
              disabled={deleteOwner.isPending || open}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconBtn>
          </Stack>
        )}
        paperVariant="glass"
      />

      <EntityEditModal<TractOwner>
        open={!!editRow}
        title="Editar Dono de Terreno"
        data={(editRow ?? {}) as Partial<TractOwner>}
        fields={fields}
        onClose={() => setEditRow(null)}
        onSubmit={(val) =>
          updateOwner.mutate(
            { id: val.id, body: { name: val.name, cpf: val.cpf } },
            { onSuccess: () => setEditRow(null) },
          )
        }
        submitLabel="Salvar"
        loading={updateOwner.isPending}
      />

      <Dialog open={open} onClose={clearProblem} fullWidth maxWidth="sm">
        <DialogTitle>
          Excluir dono e {conflict?.conflict.tractsCount ?? 0} terreno(s)
          vinculados?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Confirmar irá excluir o dono e os terrenos listados abaixo.
          </Typography>
          <List dense disablePadding>
            {(conflict?.conflict.tracts ?? []).map((t, idx) => (
              <div key={t.tractId}>
                {idx > 0 && <Divider />}
                <ListItem disableGutters>
                  <ListItemText
                    primary={`Terreno #${t.tractId}`}
                    secondary={`${t.street} — CEP ${t.cep}`}
                  />
                </ListItem>
              </div>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearProblem}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (deleteOwnerCascade.isPending) return;
              const ownerId = conflict?.conflict.ownerId;
              if (ownerId != null) {
                deleteOwnerCascade.mutate(ownerId, { onSuccess: clearProblem });
              }
            }}
            disabled={deleteOwnerCascade.isPending}
          >
            Excluir tudo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { maskCPF } from "../../../common/utils";
import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import type { AppError } from "../../../common/api/types/AppError";

function is409(err: unknown) {
  const e = err as any;
  return e?.status === 409 || e?.response?.status === 409;
}

export default function TractOwnersPage() {
  const { data, isLoading, isError } = useTractOwners();
  const updateOwner = useUpdateTractOwner();
  const deleteOwner = useDeleteTractOwner();
  const deleteOwnerCascade = useDeleteTractOwnerCascade();
  const [editRow, setEditRow] = useState<TractOwner | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  function digits(s: string) {
    return s.replace(/\D/g, "");
  }

  function onEdit(id: number) {
    const row = (data || []).find((r) => r.id === id) || null;
    setEditRow(row);
  }

  function onDelete(id: number) {
    deleteOwner.mutate(id, {
      onError: (err: AppError) => {
        if (is409(err)) setConfirmId(id);
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

      <Dialog
        open={confirmId !== null}
        onClose={() => setConfirmId(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Excluir dono e terrenos vinculados?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Há terrenos vinculados a este dono. Confirmar irá excluí-los junto
            com o dono.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (confirmId !== null) {
                deleteOwnerCascade.mutate(confirmId, {
                  onSuccess: () => setConfirmId(null),
                });
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

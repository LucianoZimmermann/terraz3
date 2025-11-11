import { useMemo, useState } from "react";
import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTracts } from "../queries";
import { Tract } from "../types";
import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import { useUpdateTract, useDeleteTract } from "../mutations";
import { useTractOwners } from "../../tract_owner/queries";

// NOVO: mutations de endereço
import { useUpdateAddress } from "../../address/mutations";

type TractForm = {
  id?: number;
  squareMeters: number | "";
  street: string;
  city: string;
  cep: string;
  tractOwnerId: number | "";
};

export default function TractsPage() {
  const { data, isLoading, isError } = useTracts();
  const { data: owners = [] } = useTractOwners();
  const updateTract = useUpdateTract();
  const deleteTract = useDeleteTract();

  // NOVO
  const updateAddr = useUpdateAddress();

  const [editRow, setEditRow] = useState<Tract | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const columns: Array<ColumnDef<Tract>> = [
    { key: "squareMeters", header: "Metros quadrados" },
    {
      key: "address",
      header: "Endereço",
      render: (r) => `${r.address?.street ?? ""}, ${r.address?.city ?? ""}`,
    },
    {
      key: "tractOwner",
      header: "Dono do terreno",
      render: (r) => r.tractOwner?.name ?? "-",
    },
  ];

  function onEdit(id: number) {
    const tract = data?.find((t) => t.id === id) ?? null;
    setEditRow(tract);
  }

  function onDelete(id: number) {
    setDeleteId(id);
  }

  const editData: Partial<TractForm> = useMemo(() => {
    if (!editRow) return {};
    return {
      id: editRow.id,
      squareMeters: editRow.squareMeters ?? "",
      street: editRow.address?.street ?? "",
      city: editRow.address?.city ?? "",
      cep: editRow.address?.cep ?? "",
      tractOwnerId: editRow.tractOwner?.id ?? "",
    };
  }, [editRow]);

  const fields: Array<FieldDef<TractForm>> = [
    {
      key: "squareMeters",
      label: "Metros quadrados",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Metros quadrados"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            set(v === "" ? "" : Number(v));
          }}
        />
      ),
    },
    {
      key: "street",
      label: "Rua",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Rua"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "city",
      label: "Cidade",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Cidade"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "cep",
      label: "CEP",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="CEP"
          value={maskCEP(String(value ?? ""))}
          onChange={(e) => set(onlyDigits(e.target.value))}
        />
      ),
    },
    {
      key: "tractOwnerId",
      label: "Dono do terreno",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          select
          label="Dono do terreno"
          value={value ?? ""}
          onChange={(e) => set(Number(e.target.value))}
        >
          {owners.map((o: { id: number; name: string }) => (
            <MenuItem key={o.id} value={o.id}>
              {o.name}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
  ];

  return (
    <>
      <EntityTable<Tract>
        title="Terrenos"
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
              disabled={deleteTract.isPending}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconBtn>
          </Stack>
        )}
        paperVariant="glass"
      />

      <EntityEditModal<TractForm>
        open={!!editRow}
        title="Editar Terreno"
        data={editData as Partial<TractForm>}
        fields={fields}
        onClose={() => setEditRow(null)}
        onSubmit={async (val) => {
          // 1) Atualiza endereço existente (PATCH). Não cria novo aqui.
          const addrId = editRow?.address?.id;
          if (addrId) {
            await updateAddr.mutateAsync({
              id: addrId,
              body: {
                street: val.street!,
                city: val.city!,
                cep: onlyDigits(val.cep!),
              },
            });
          }

          // 2) Atualiza o Tract com IDs. Não envie "address" no body.
          await updateTract.mutateAsync({
            id: val.id!,
            body: {
              squareMeters: Number(val.squareMeters),
              tractOwnerId: Number(val.tractOwnerId),
              // addressId não muda aqui. Se for trocar o endereço por outro, envie addressId.
            },
          });

          setEditRow(null);
        }}
        submitLabel="Salvar"
        loading={updateTract.isPending || updateAddr.isPending}
      />

      <Dialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Excluir terreno?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Confirme para excluir o terreno #{deleteId}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (deleteId == null || deleteTract.isPending) return;
              deleteTract.mutate(deleteId, {
                onSuccess: () => setDeleteId(null),
              });
            }}
            disabled={deleteTract.isPending}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/* utils locais */
function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}
function maskCEP(s: string) {
  const d = onlyDigits(s).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

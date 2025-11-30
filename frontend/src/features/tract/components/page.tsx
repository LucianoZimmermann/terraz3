import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
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
import { useMemo, useState } from "react";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import { useTractOwners } from "../../tract_owner/queries";
import { useCreateTract, useDeleteTract, useUpdateTract } from "../mutations";
import { useTracts } from "../queries";
import { Tract, TractForm } from "../types";
import { maskCEP, onlyDigits } from "../../../common/utils";

export default function TractsPage() {
  const { data, isLoading, isError } = useTracts();
  const { data: owners = [] } = useTractOwners();

  const createTract = useCreateTract();
  const updateTract = useUpdateTract();
  const deleteTract = useDeleteTract();

  const [editRow, setEditRow] = useState<Tract | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const columns: Array<ColumnDef<Tract>> = [
    { key: "squareMeters", header: "Metros quadrados" },
    {
      key: "city",
      header: "Endereço",
      render: (r) =>
        `${r?.street ?? ""}${
          r?.number ? `, ${r.number}` : ""
        } - ${r?.city ?? ""}${r?.state ? `/${r.state}` : ""}`,
    },
    {
      key: "neighborhood" as keyof Tract,
      header: "Bairro",
      render: (r) => `${r?.neighborhood ?? "-"}`,
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
      street: editRow.street ?? "",
      number: editRow.number ?? "",
      city: editRow.city ?? "",
      neighborhood: editRow.neighborhood ?? "",
      state: editRow.state ?? "",
      cep: editRow.cep ?? "",
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
          inputProps={{
            min: 0,
            step: 1,
            onWheel: (e) => e.currentTarget.blur(),
          }}
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
      key: "number",
      label: "Número",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Número"
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
      key: "state",
      label: "Estado",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Estado"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "neighborhood",
      label: "Bairro",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Bairro"
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
        onAddClick={() => setOpenCreate(true)}
        addButtonLabel="Novo Terreno"
      />

      <EntityAddModal<TractForm>
        open={openCreate}
        title="Novo Terreno"
        initialData={
          {
            squareMeters: "",
            street: "",
            number: "",
            city: "",
            neighborhood: "",
            state: "",
            cep: "",
            tractOwnerId: "",
          } as Partial<TractForm>
        }
        fields={fields}
        onClose={() => setOpenCreate(false)}
        onSubmit={(val) =>
          createTract.mutate(
            {
              squareMeters: Number(val.squareMeters),
              street: val.street!,
              number: val.number ?? "",
              city: val.city!,
              neighborhood: val.neighborhood!,
              state: val.state ?? "",
              cep: onlyDigits(val.cep!),
              tractOwnerId: Number(val.tractOwnerId),
            },
            { onSuccess: () => setOpenCreate(false) },
          )
        }
        submitLabel="Salvar"
        loading={createTract.isPending}
      />

      <EntityEditModal<TractForm>
        open={!!editRow}
        title="Editar Terreno"
        data={editData as Partial<TractForm>}
        fields={fields}
        onClose={() => setEditRow(null)}
        onSubmit={async (val) => {
          if (!editRow) return;

          try {
            await updateTract.mutateAsync({
              id: val.id!,
              body: {
                squareMeters: Number(val.squareMeters),
                tractOwnerId: Number(val.tractOwnerId),
                street: val.street!,
                number: val.number ?? "",
                city: val.city!,
                neighborhood: val.neighborhood!,
                state: val.state ?? "",
                cep: onlyDigits(val.cep!),
              },
            });

            setEditRow(null);
          } catch {
            alert("Erro ao atualizar terreno.");
          }
        }}
        submitLabel="Salvar"
        loading={updateTract.isPending}
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

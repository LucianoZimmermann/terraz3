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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useNeighborhoods } from "../queries";
import { Neighborhood } from "../types";
import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import {
  useCreateNeighborhood,
  useDeleteNeighborhood,
  useUpdateNeighborhood,
} from "../mutations";

type NeighborhoodForm = {
  id?: number;
  name: string;
  priceFactor: number | "";
};

export default function NeighborhoodsPage() {
  const { data, isLoading, isError } = useNeighborhoods();

  const createNeighborhood = useCreateNeighborhood();
  const updNeighborhood = useUpdateNeighborhood();
  const delNeighborhood = useDeleteNeighborhood();

  const [editRow, setEditRow] = useState<Neighborhood | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  function onEdit(id: number) {
    const row = data?.find((n) => n.id === id) ?? null;
    setEditRow(row);
  }

  function onDelete(id: number) {
    setDeleteId(id);
  }

  const columns: Array<ColumnDef<Neighborhood>> = [
    { key: "name", header: "Nome" },
    {
      key: "priceFactor",
      header: "Fator de Preço",
      render: (r) =>
        typeof r.priceFactor === "number" ? r.priceFactor.toFixed(2) : "-",
    },
  ];

  const editData: Partial<NeighborhoodForm> = useMemo(() => {
    if (!editRow) return {};
    return {
      id: editRow.id,
      name: editRow.name ?? "",
      priceFactor:
        typeof editRow.priceFactor === "number" ? editRow.priceFactor : "",
    };
  }, [editRow]);

  const fields: Array<FieldDef<NeighborhoodForm>> = [
    {
      key: "name",
      label: "Nome",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Nome"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "priceFactor",
      label: "Fator de Preço",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          label="Fator de Preço"
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            set(v === "" ? "" : Number(v));
          }}
        />
      ),
    },
  ];

  return (
    <>
      <EntityTable<Neighborhood>
        title="Bairros"
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
              disabled={delNeighborhood.isPending}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconBtn>
          </Stack>
        )}
        paperVariant="glass"
        onAddClick={() => setOpenCreate(true)}
        addButtonLabel="Novo Bairro"
      />

      <EntityAddModal<NeighborhoodForm>
        open={openCreate}
        title="Novo Bairro"
        initialData={{
          name: "",
          priceFactor: "",
        }}
        fields={fields}
        onClose={() => setOpenCreate(false)}
        onSubmit={(val) =>
          createNeighborhood.mutate(
            {
              name: val.name!,
              priceFactor: Number(val.priceFactor),
            },
            { onSuccess: () => setOpenCreate(false) },
          )
        }
        submitLabel="Salvar"
        loading={createNeighborhood.isPending}
      />

      <EntityEditModal<NeighborhoodForm>
        open={!!editRow}
        title="Editar Bairro"
        data={editData}
        fields={fields}
        onClose={() => setEditRow(null)}
        onSubmit={(val) =>
          updNeighborhood.mutate(
            {
              id: val.id!,
              body: {
                name: val.name!,
                priceFactor: Number(val.priceFactor),
              },
            },
            { onSuccess: () => setEditRow(null) },
          )
        }
        submitLabel="Salvar"
        loading={updNeighborhood.isPending}
      />

      <Dialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Excluir bairro?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Confirme para excluir o bairro #{deleteId}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (deleteId == null || delNeighborhood.isPending) return;
              delNeighborhood.mutate(deleteId, {
                onSuccess: () => setDeleteId(null),
              });
            }}
            disabled={delNeighborhood.isPending}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

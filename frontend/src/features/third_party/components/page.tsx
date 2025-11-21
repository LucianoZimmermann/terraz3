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

import { useThirdParties } from "../queries";
import { ThirdParty } from "../types";
import { renderFactorType } from "../../../common/utils";

import {
  EntityEditModal,
  FieldDef,
} from "../../../common/atomic/organisms/EntityEditModal";
import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import {
  useCreateThirdParty,
  useDeleteThirdParty,
  useUpdateThirdParty,
} from "../mutations";
import { useFactorTypes } from "../../factor_type/queries";

type ThirdPartyForm = {
  id?: number;
  name: string;
  cnpj: string;
  factorTypeId: number | "";
};

export default function ThirdPartiesPage() {
  const { data, isLoading, isError } = useThirdParties();
  const { data: factorTypes = [] } = useFactorTypes();

  const createThirdParty = useCreateThirdParty();
  const updThirdParty = useUpdateThirdParty();
  const delThirdParty = useDeleteThirdParty();

  const [editRow, setEditRow] = useState<ThirdParty | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  function onEdit(id: number) {
    setEditRow(data?.find((tp) => tp.id === id) ?? null);
  }

  function onDelete(id: number) {
    setDeleteId(id);
  }

  const columns: Array<ColumnDef<ThirdParty>> = [
    { key: "name", header: "Nome" },
    { key: "cnpj", header: "CNPJ" },
    {
      key: "factorType",
      header: "Tipo de serviço",
      render: (r) => renderFactorType(r.factorType?.factorTypeEnum),
    },
  ];

  const editData: Partial<ThirdPartyForm> = useMemo(() => {
    if (!editRow) return {};
    return {
      id: editRow.id,
      name: editRow.name ?? "",
      cnpj: editRow.cnpj ?? "",
      factorTypeId: editRow.factorType?.id ?? "",
    };
  }, [editRow]);

  const fields: Array<FieldDef<ThirdPartyForm>> = [
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
      key: "cnpj",
      label: "CNPJ",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="CNPJ"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "factorTypeId",
      label: "Tipo de serviço",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          select
          label="Tipo de serviço"
          value={value ?? ""}
          onChange={(e) => set(Number(e.target.value))}
        >
          {factorTypes.map(
            (ft: { id: number; factorTypeEnum: string; name?: string }) => (
              <MenuItem key={ft.id} value={ft.id}>
                {ft.name ?? renderFactorType(ft.factorTypeEnum)}
              </MenuItem>
            ),
          )}
        </TextField>
      ),
    },
  ];

  return (
    <>
      <EntityTable<ThirdParty>
        title="Terceiros"
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
              disabled={delThirdParty.isPending}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconBtn>
          </Stack>
        )}
        paperVariant="glass"
        onAddClick={() => setOpenCreate(true)}
        addButtonLabel="Novo Terceiro"
      />

      <EntityAddModal<ThirdPartyForm>
        open={openCreate}
        title="Novo Terceiro"
        initialData={{
          name: "",
          cnpj: "",
          factorTypeId: "",
        }}
        fields={fields}
        onClose={() => setOpenCreate(false)}
        onSubmit={(val) =>
          createThirdParty.mutate(
            {
              name: val.name,
              cnpj: val.cnpj,
              factorTypeId: Number(val.factorTypeId),
            },
            { onSuccess: () => setOpenCreate(false) },
          )
        }
        submitLabel="Salvar"
        loading={createThirdParty.isPending}
      />

      <EntityEditModal<ThirdPartyForm>
        open={!!editRow}
        title="Editar Terceiro"
        data={editData as Partial<ThirdPartyForm>}
        fields={fields}
        onClose={() => setEditRow(null)}
        onSubmit={async (val) => {
          if (!editRow) return;
          try {
            await updThirdParty.mutateAsync({
              id: val.id!,
              body: {
                name: val.name!,
                cnpj: val.cnpj!,
                factorTypeId: Number(val.factorTypeId),
              },
            });
            setEditRow(null);
          } catch (error) {
            alert("Falha ao atualizar terceiro: " + error);
          }
        }}
        submitLabel="Salvar"
        loading={updThirdParty.isPending}
      />

      <Dialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Excluir terceiro?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Confirme para excluir o terceiro #{deleteId}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (deleteId == null || delThirdParty.isPending) return;
              delThirdParty.mutate(deleteId, {
                onSuccess: () => setDeleteId(null),
              });
            }}
            disabled={delThirdParty.isPending}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

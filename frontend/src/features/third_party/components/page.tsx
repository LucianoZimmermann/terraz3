import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import { EntityTable } from "../../../common/atomic/organisms/EntityTable";

import { useThirdParties } from "../queries";
import { ThirdParty, ThirdPartyForm } from "../types";

import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import { EntityEditModal } from "../../../common/atomic/organisms/EntityEditModal";
import {
  useCreateThirdParty,
  useDeleteThirdParty,
  useUpdateThirdParty,
} from "../mutations";
import { columns, useThirdPartyFields } from "../utils";
export default function ThirdPartiesPage() {
  const { data, isLoading, isError } = useThirdParties();

  const createThirdParty = useCreateThirdParty();
  const updThirdParty = useUpdateThirdParty();
  const delThirdParty = useDeleteThirdParty();
  const fields = useThirdPartyFields();

  const [editRow, setEditRow] = useState<ThirdParty | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  function onEdit(id: number) {
    setEditRow(data?.find((tp) => tp.id === id) ?? null);
  }

  function onDelete(id: number) {
    setDeleteId(id);
  }

  const editData: Partial<ThirdPartyForm> = useMemo(() => {
    if (!editRow) return {};
    return {
      id: editRow.id,
      name: editRow.name ?? "",
      cnpj: editRow.cnpj ?? "",
      factorTypeId: editRow.factorType?.id ?? "",
    };
  }, [editRow]);

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
              phone: val.phone,
              contactName: val.contactName,
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

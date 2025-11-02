import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useThirdParties } from "../queries";
import { ThirdParty } from "../types";
import { renderFactorType } from "../../../common/utils";

export default function ThirdPartiesPage() {
  const { data, isLoading, isError } = useThirdParties();

  function onEdit(id: number) {
    // abrir modal, navegar, etc.
    // ex.: navigate(`/tract-owners/${id}/edit`);
  }

  function onDelete(id: number) {
    // abrir modal de confirmação, etc.
  }

  const columns: Array<ColumnDef<ThirdParty>> = [
    { key: "name", header: "Nome" },
    { key: "cnpj", header: "CNPJ" },
    {
      key: "factorType",
      header: "Tipo de serviço",
      render: (r) => renderFactorType(r.factorType.factorTypeEnum),
    },
  ];

  return (
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
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconBtn>
        </Stack>
      )}
      paperVariant="glass"
    />
  );
}

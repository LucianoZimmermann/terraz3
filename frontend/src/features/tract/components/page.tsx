import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTracts } from "../queries";
import { Tract } from "../types";

export default function TractsPage() {
  const { data, isLoading, isError } = useTracts();

  function onEdit(id: number) {
    // abrir modal, navegar, etc.
    // ex.: navigate(`/tract-owners/${id}/edit`);
  }

  function onDelete(id: number) {
    // abrir modal de confirmação, etc.
  }

  const columns: Array<ColumnDef<Tract>> = [
    { key: "squareMeters", header: "Metros quadrados" },
    {
      key: "address",
      header: "Endereço",
      render: (r) => r.address.street + ", " + r.address.city,
    },
    {
      key: "tractOwner",
      header: "Dono do terreno",
      render: (r) => r.tractOwner.name,
    },
  ];

  return (
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
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconBtn>
        </Stack>
      )}
      paperVariant="glass"
    />
  );
}

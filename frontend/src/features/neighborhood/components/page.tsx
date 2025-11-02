import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNeighborhoods } from "../queries";
import { Neighborhood } from "../types";

export default function NeighborhoodsPage() {
  const { data, isLoading, isError } = useNeighborhoods();

  function onEdit(id: number) {
    // abrir modal, navegar, etc.
    // ex.: navigate(`/tract-owners/${id}/edit`);
  }

  function onDelete(id: number) {
    // abrir modal de confirmação, etc.
  }

  const columns: Array<ColumnDef<Neighborhood>> = [
    { key: "name", header: "Nome" },
    { key: "priceFactor", header: "Fator de Preço" },
  ];

  return (
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
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconBtn>
        </Stack>
      )}
      paperVariant="glass"
    />
  );
}

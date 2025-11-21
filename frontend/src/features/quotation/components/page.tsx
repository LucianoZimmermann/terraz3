import {
  ColumnDef,
  EntityTable,
} from "../../../common/atomic/organisms/EntityTable";
import IconBtn from "../../../common/atomic/atoms/buttons/IconButton";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useQuotes } from "../queries";
import { Quote } from "../types";
import { renderQuoteFeasibility } from "../../../common/utils";
import { useNavigate } from "@tanstack/react-router";

export default function QuotesPage() {
  const { data, isLoading, isError } = useQuotes();

  const navigate = useNavigate();

  function onEdit(id: number) {
    // abrir modal, navegar, etc.
    // ex.: navigate(`/tract-owners/${id}/edit`);
  }

  function onDelete(id: number) {
    // abrir modal de confirmação, etc.
  }

  const columns: Array<ColumnDef<Quote>> = [
    {
      key: "tract",
      header: "Terreno",
      render: (row) =>
        row.tract.address.street + ", " + row.tract.address.neighborhood.name,
    },
    {
      key: "lotCount",
      header: "Número de lotes",
      render: (row) => row.lotCount.toFixed(1),
    },
    {
      key: "pricePerLot",
      header: "Preço por lote",
      render: (row) => `R$ ${row.pricePerLot.toFixed(2)}`,
    },
    {
      key: "feasibility",
      header: "Viabilidade",
      render: (row) => renderQuoteFeasibility(row.feasibility),
    },
    {
      key: "createDate",
      header: "Data de criação",
      render: (row) =>
        new Date(row.createDate).toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
    },
  ];

  return (
    <EntityTable<Quote>
      title="Cotações"
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
      onAddClick={() => {
        navigate({ to: "/create-quote" });
      }}
      addButtonLabel="Nova Cotação"
    />
  );
}

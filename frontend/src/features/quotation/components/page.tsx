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
import { useNavigate } from "@tanstack/react-router";
import { useCreateQuote, useDeleteQuote } from "../mutations";
import { useCreatedQuote } from "../../../common/store/createdQuote.store";

export default function QuotesPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuotes();
  const createQuote = useCreateQuote();
  const setCreatedQuoteId = useCreatedQuote((s) => s.setCreatedQuoteId);
  const deleteQuote = useDeleteQuote();

  function onEdit(id: number) {
    navigate({
      to: "/edit-quote/$quoteId",
      params: { quoteId: String(id) },
    });
  }

  function onDelete(id: number) {
    deleteQuote.mutateAsync(id);
  }

  const onAddQuote = async () => {
    const response = await createQuote.mutateAsync({
      factorList: [],
      lotCount: 0,
      pricePerLot: 0,
    });

    setCreatedQuoteId(response.id);
    navigate({ to: "/create-quote" });
  };

  const columns: Array<ColumnDef<Quote>> = [
    {
      key: "tract",
      header: "Terreno",
      render: (row) =>
        !!row.tract?.street && !!row.tract?.neighborhood
          ? (row.tract?.street ? row.tract?.street : "-") +
            ", " +
            (row.tract?.neighborhood ? row.tract?.neighborhood : "-")
          : "-",
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
      onAddClick={onAddQuote}
      addButtonLabel="Nova Cotação"
    />
  );
}

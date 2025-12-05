import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuote } from "../queries";
import { useFactorTypes } from "../../factor_type/queries";
import { useThirdParties } from "../../third_party/queries";
import { FACTOR_LABELS } from "../../factor_type/utils";
import { FactorTypeEnum } from "../../factor_type/types";

export default function ViewQuotePage() {
  const navigate = useNavigate();

  const { quoteId } = useParams({ from: "/app/view-quote/$quoteId" });
  const numericQuoteId = Number(quoteId);

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useQuote(numericQuoteId);

  const { data: factorTypes = [] } = useFactorTypes();
  const { data: thirdParties = [] } = useThirdParties();

  const factorRows = useMemo(() => {
    if (!factorTypes || factorTypes.length === 0 || !quote) return [];

    const quoteFactors =
      (quote as any).factorList ?? (quote as any).factors ?? [];

    return factorTypes.map((ft: any) => {
      const key = ft.factorTypeEnum as FactorTypeEnum;

      const factor = quoteFactors.find((f: any) => f.factorTypeId === ft.id);

      const thirdParty =
        factor && factor.thirdPartyId != null
          ? thirdParties.find((tp: any) => tp.id === factor.thirdPartyId)
          : null;

      return {
        id: ft.id as number,
        label: FACTOR_LABELS[key] ?? key,
        price: factor?.price ?? null,
        thirdPartyName: thirdParty?.name ?? "-",
      };
    });
  }, [factorTypes, quote, thirdParties]);

  if (isQuoteLoading || !quote) {
    return <Typography>Carregando cotação...</Typography>;
  }

  if (isQuoteError) {
    return (
      <Typography color="error">Erro ao carregar dados da cotação.</Typography>
    );
  }

  const totalLots = Number(quote.lotCount ?? 0);
  const ownerLots = Number((quote as any).tractOwnerLotCount ?? 0);
  const companyLots =
    Number.isNaN(totalLots) || Number.isNaN(ownerLots)
      ? null
      : totalLots - ownerLots;

  const formattedCreateDate = quote.createDate
    ? new Date(quote.createDate).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={3} sx={{ flex: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Detalhes da Cotação
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Criada em {formattedCreateDate}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={() => navigate({ to: "/quotes" })}
          >
            Voltar
          </Button>
        </Stack>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Terreno
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Endereço
            </Typography>
            <Typography variant="body1">
              {quote.tract?.street ?? "-"}
              {quote.tract?.number ? `, ${quote.tract.number}` : ""}
              {quote.tract?.neighborhood ? `, ${quote.tract.neighborhood}` : ""}
              {quote.tract?.city ? ` - ${quote.tract.city}` : ""}
              {quote.tract?.state ? `/${quote.tract.state}` : ""}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              CEP
            </Typography>
            <Typography variant="body1">{quote.tract?.cep ?? "-"}</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Dono do terreno
            </Typography>
            <Typography variant="body1">
              {[
                quote.tract?.tractOwner?.name ?? "-",
                quote.tract?.tractOwner?.phone ?? "-",
              ].join(" - ")}
            </Typography>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Lotes e valores
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            flexWrap="wrap"
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Total de lotes da cotação
              </Typography>
              <Typography variant="body1">
                {quote.lotCount != null ? quote.lotCount.toFixed(1) : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Lotes do dono do terreno
              </Typography>
              <Typography variant="body1">
                {(quote as any).tractOwnerLotCount != null
                  ? (quote as any).tractOwnerLotCount.toFixed(1)
                  : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Lotes da empresa
              </Typography>
              <Typography variant="body1">
                {companyLots != null ? companyLots.toFixed(1) : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Preço por lote
              </Typography>
              <Typography variant="body1">
                {quote.pricePerLot != null
                  ? `R$ ${quote.pricePerLot.toFixed(2)}`
                  : "-"}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Resultados financeiros
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            flexWrap="wrap"
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Valor total em serviços de terceiros
              </Typography>
              <Typography variant="body1">
                {quote.totalFactorsPrice != null
                  ? `R$ ${quote.totalFactorsPrice.toFixed(2)}`
                  : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Faturamento total da cotação
              </Typography>
              <Typography variant="body1">
                {quote.totalProfit != null
                  ? `R$ ${quote.totalProfit.toFixed(2)}`
                  : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Lucro líquido total (Terraz)
              </Typography>
              <Typography variant="body1">
                {quote.totalLiquidProfit != null
                  ? `R$ ${quote.totalLiquidProfit.toFixed(2)}`
                  : "-"}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Markup
              </Typography>
              <Typography variant="body1">
                {quote.markup != null ? quote.markup.toFixed(2) : "-"}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Fatores
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {factorRows.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum fator cadastrado.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {factorRows.map((row) => (
                <Box
                  key={row.id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    gap: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "background.default",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {row.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Terceiro: {row.thirdPartyName}
                    </Typography>
                  </Box>

                  <Box textAlign={{ xs: "left", sm: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                      Valor
                    </Typography>
                    <Typography variant="body1">
                      {row.price != null
                        ? `R$ ${Number(row.price).toFixed(2)}`
                        : "-"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate({ to: "/quotes" })}
          >
            Voltar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import { FieldDef } from "../../../common/atomic/organisms/EntityEditModal";
import { maskCEP, onlyDigits } from "../../../common/utils";

import { useFactorTypes } from "../../factor_type/queries";
import { FACTOR_LABELS } from "../../factor_type/utils";
import { FactorTypeEnum } from "../../factor_type/types";

import { useCreateThirdParty } from "../../third_party/mutations";
import { useThirdParties } from "../../third_party/queries";
import { ThirdPartyForm } from "../../third_party/types";
import { useThirdPartyFields } from "../../third_party/utils";

import { useCreateTract } from "../../tract/mutations";
import { useTracts } from "../../tract/queries";
import { Tract, TractForm } from "../../tract/types";

import { useTractOwners } from "../../tract_owner/queries";

import { CalculatedQuote, Quote } from "../types";
import { useUpdateQuote } from "../mutations";
import { useQuote } from "../queries";

type FactorFormState = {
  price: number | "";
  thirdPartyId: number | "";
};

const EMPTY_FACTORS_STATE: Record<FactorTypeEnum, FactorFormState> = {
  HYDRO_SANITARY_SYSTEM: { price: "", thirdPartyId: "" },
  RAINWATER_DRAINAGE_SYSTEM: { price: "", thirdPartyId: "" },
  PAVING: { price: "", thirdPartyId: "" },
  ELECTRICAL_NETWORK: { price: "", thirdPartyId: "" },
  EARTHWORKS: { price: "", thirdPartyId: "" },
};

export default function EditQuotePage() {
  const navigate = useNavigate();
  const { quoteId } = useParams({ from: "/edit-quote/$quoteId" });
  const numericQuoteId = Number(quoteId);

  const { data: tracts = [] } = useTracts();
  const { data: owners = [] } = useTractOwners();
  const { data: thirdParties = [] } = useThirdParties();
  const { data: factorTypes = [] } = useFactorTypes();
  const { data: quote, isLoading: isQuoteLoading } = useQuote(numericQuoteId);

  const createTract = useCreateTract();
  const createThirdParty = useCreateThirdParty();
  const updateQuote = useUpdateQuote();

  const fields = useThirdPartyFields();

  const [selectedTractId, setSelectedTractId] = useState<number | "">("");
  const [openTractModal, setOpenTractModal] = useState(false);

  const [lotCount, setLotCount] = useState<number>(0);
  const [pricePerLot, setPricePerLot] = useState<number>(0);
  const [ownerLotCount, setOwnerLotCount] = useState<number>(0);

  const [openThirdPartyModal, setOpenThirdPartyModal] = useState(false);

  const [factorFormState, setFactorFormState] =
    useState<Record<FactorTypeEnum, FactorFormState>>(EMPTY_FACTORS_STATE);

  const [quoteInitialized, setQuoteInitialized] = useState(false);
  const [factorsInitialized, setFactorsInitialized] = useState(false);

  useEffect(() => {
    if (!quote || quoteInitialized) return;

    const q = quote as Quote;

    setSelectedTractId(q.tract?.id ?? "");
    setLotCount(q.lotCount ?? 0);
    setOwnerLotCount((q as any).tractOwnerLotCount ?? 0);
    setPricePerLot(q.pricePerLot ?? 0);

    setQuoteInitialized(true);
  }, [quote, quoteInitialized]);

  useEffect(() => {
    if (!factorTypes || factorTypes.length === 0) return;
    const factorsFromApi = (quote as any)?.factors as
      | Array<{
          factorTypeId: number;
          price: number | null;
          thirdPartyId: number | null;
        }>
      | undefined;

    if (!factorsFromApi || factorsFromApi.length === 0) return;
    if (factorsInitialized) return;

    const initial: Record<FactorTypeEnum, FactorFormState> = {
      ...EMPTY_FACTORS_STATE,
    };

    factorTypes.forEach((ft: any) => {
      const key = ft.factorTypeEnum as FactorTypeEnum;

      const factorFromApi = factorsFromApi.find(
        (f) => f.factorTypeId === ft.id,
      );

      if (!factorFromApi) {
        return;
      }

      initial[key] = {
        price: factorFromApi.price != null ? Number(factorFromApi.price) : "",
        thirdPartyId:
          factorFromApi.thirdPartyId != null
            ? Number(factorFromApi.thirdPartyId)
            : "",
      };
    });

    setFactorFormState(initial);
    setFactorsInitialized(true);
  }, [factorTypes, quote, factorsInitialized]);

  const tractFields: Array<FieldDef<TractForm>> = useMemo(
    () => [
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
    ],
    [owners],
  );

  function updateFactorField<K extends keyof FactorFormState>(
    factorTypeEnum: FactorTypeEnum,
    field: K,
    value: FactorFormState[K],
  ) {
    setFactorFormState((prev) => ({
      ...prev,
      [factorTypeEnum]: {
        ...prev[factorTypeEnum],
        [field]: value,
      },
    }));
  }

  const factorsTotalValue = useMemo(() => {
    if (!factorTypes || factorTypes.length === 0) return 0;

    return factorTypes.reduce((total: number, f: any) => {
      const key = f.factorTypeEnum as FactorTypeEnum;
      const state = factorFormState[key];

      if (!state || state.price === "" || state.price == null) {
        return total;
      }

      const numericValue = Number(state.price);
      if (Number.isNaN(numericValue)) return total;

      return total + numericValue;
    }, 0);
  }, [factorFormState, factorTypes]);

  const companyLotCount = useMemo(() => {
    if (lotCount === 0 || ownerLotCount === 0) return null;
    const total = Number(lotCount);
    const owner = Number(ownerLotCount);
    if (Number.isNaN(total) || Number.isNaN(owner)) return null;
    return total - owner;
  }, [lotCount, ownerLotCount]);

  const handleSubmit = async () => {
    if (!selectedTractId || lotCount === 0 || ownerLotCount === 0) {
      alert(
        "Selecione um terreno, informe o número total de lotes e os lotes do dono do terreno.",
      );
      return;
    }

    const total = Number(lotCount);
    const owner = Number(ownerLotCount);

    if (Number.isNaN(total) || Number.isNaN(owner)) {
      alert("Informe valores numéricos válidos para os lotes.");
      return;
    }

    if (owner > total) {
      alert("Os lotes do dono do terreno não podem ser maiores que o total.");
      return;
    }

    const payload: CalculatedQuote = {
      tractId: Number(selectedTractId),
      pricePerLot: pricePerLot,
      lotCount: total,
      tractOwnerLotCount: owner,
      totalFactorsPrice: factorsTotalValue,
      factors: factorTypes.map((f: any) => {
        const key = f.factorTypeEnum as FactorTypeEnum;
        const state = factorFormState[key];

        return {
          factorTypeId: f.id,
          type: f.factorTypeEnum,
          price: state.price === "" ? null : Number(state.price),
          thirdPartyId: state.thirdPartyId || null,
        };
      }),
    };

    try {
      await updateQuote.mutateAsync({
        id: numericQuoteId,
        body: payload,
      });
      navigate({ to: "/quotes" });
    } catch (e) {
      console.error("Erro ao atualizar cotação", e);
      alert("Erro ao salvar cotação.");
    }
  };

  if (isQuoteLoading || !quote) {
    return <Typography>Carregando cotação...</Typography>;
  }

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
        <Typography variant="h5" fontWeight={600}>
          Editar Cotação
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Terreno
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              select
              value={selectedTractId || ""}
              onChange={(e) => {
                const v = e.target.value;
                setSelectedTractId(v === "" ? "" : Number(v));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {!selectedTractId ? "Selecione um terreno" : ""}
                  </InputAdornment>
                ),
              }}
            >
              {tracts.length === 0 ? (
                <MenuItem value="" disabled>
                  Nenhum terreno disponível
                </MenuItem>
              ) : (
                tracts.map((t: Tract) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.street}
                    {t.neighborhood ? `, ${t.neighborhood}` : ""}
                    {t.number ? `, ${t.number}` : ""} - {t.city}
                    {t.state ? `/${t.state}` : ""}{" "}
                  </MenuItem>
                ))
              )}
            </TextField>

            <Button
              variant="contained"
              onClick={() => setOpenTractModal(true)}
              sx={{
                whiteSpace: "nowrap",
                boxShadow: "inherit",
                flexShrink: 0,
                px: 2,
                py: 1,
              }}
            >
              Novo terreno
            </Button>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Valor por lote
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: 0,
                step: 100000,
                onWheel: (e) => e.currentTarget.blur(),
              }}
              value={pricePerLot ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setPricePerLot(v === "" ? 0 : Number(v));
              }}
              placeholder="0"
            />
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Quantidade de lotes
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              type="number"
              label="Total de lotes da cotação"
              inputProps={{
                min: 0,
                step: 1,
                onWheel: (e) => e.currentTarget.blur(),
              }}
              value={lotCount ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setLotCount(v === "" ? 0 : Number(v));
              }}
              placeholder="0"
            />

            <TextField
              fullWidth
              type="number"
              label="Lotes do dono do terreno"
              inputProps={{
                min: 0,
                step: 1,
                onWheel: (e) => e.currentTarget.blur(),
              }}
              value={ownerLotCount ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setOwnerLotCount(v === "" ? 0 : Number(v));
              }}
              placeholder="0"
            />
          </Stack>

          {companyLotCount != null && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Lotes da empresa: {companyLotCount}
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 2, flexShrink: 0 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Fatores
            </Typography>

            <Button
              variant="contained"
              onClick={() => setOpenThirdPartyModal(true)}
              sx={{
                whiteSpace: "nowrap",
                flexShrink: 0,
                minWidth: "fit-content",
                px: 2,
                py: 1,
              }}
            >
              Novo terceiro
            </Button>
          </Stack>

          <Stack spacing={3}>
            {(factorTypes ?? []).map((factor: any) => {
              const key = factor.factorTypeEnum as FactorTypeEnum;
              const state = factorFormState[key];

              const factorThirdParties = (thirdParties ?? []).filter(
                (tp: any) =>
                  tp.factorType?.factorTypeEnum === factor.factorTypeEnum,
              );

              return (
                <Stack key={factor.id} spacing={1}>
                  <Typography variant="body1" fontWeight={600}>
                    {FACTOR_LABELS[key] ?? key}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "center" }}
                  >
                    <TextField
                      fullWidth
                      type="number"
                      inputProps={{
                        min: 0,
                        step: 100000,
                        onWheel: (e) => e.currentTarget.blur(),
                      }}
                      value={
                        state.price === "" || state.price == null
                          ? ""
                          : Number(state.price).toFixed(2)
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") {
                          updateFactorField(key, "price", "");
                          return;
                        }

                        const n = Number(v);
                        if (!Number.isNaN(n)) {
                          updateFactorField(key, "price", n);
                        }
                      }}
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      select
                      label="Terceiro"
                      value={state.thirdPartyId || ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        updateFactorField(
                          key,
                          "thirdPartyId",
                          v === "" ? "" : Number(v),
                        );
                      }}
                    >
                      {factorThirdParties.length === 0 ? (
                        <MenuItem value="" disabled>
                          Nenhum terceiro disponível
                        </MenuItem>
                      ) : (
                        factorThirdParties.map((tp: any) => (
                          <MenuItem key={tp.id} value={tp.id}>
                            {tp.name}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Valor total em serviços de terceiros
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            R$ {factorsTotalValue.toFixed(2)}
          </Typography>
        </Paper>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate({ to: "/quotes" })}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Salvar alterações
          </Button>
        </Stack>
      </Stack>

      <EntityAddModal<TractForm>
        open={openTractModal}
        title="Novo Terreno"
        initialData={
          {
            squareMeters: "",
            street: "",
            number: "",
            city: "",
            state: "",
            cep: "",
            neighborhood: "",
            tractOwnerId: "",
          } as Partial<TractForm>
        }
        fields={tractFields}
        onClose={() => setOpenTractModal(false)}
        onSubmit={(val) =>
          createTract.mutate(
            {
              squareMeters: Number(val.squareMeters),
              street: val.street!,
              number: val.number ?? "",
              city: val.city!,
              neighborhood: val.neighborhood ?? "",
              state: val.state ?? "",
              cep: onlyDigits(val.cep!),
              tractOwnerId: Number(val.tractOwnerId),
            },
            {
              onSuccess: (created: Tract) => {
                setOpenTractModal(false);
                setSelectedTractId(created.id);
              },
            },
          )
        }
        submitLabel="Salvar"
        loading={createTract.isPending}
      />

      <EntityAddModal<ThirdPartyForm>
        open={openThirdPartyModal}
        title="Novo Terceiro"
        initialData={{
          name: "",
          cnpj: "",
          phone: "",
          contactName: "",
          factorTypeId: "",
        }}
        fields={fields}
        onClose={() => setOpenThirdPartyModal(false)}
        onSubmit={(val) =>
          createThirdParty.mutate(
            {
              name: val.name,
              phone: val.phone,
              cnpj: val.cnpj,
              contactName: val.contactName,
              factorTypeId: Number(val.factorTypeId),
            },
            { onSuccess: () => setOpenThirdPartyModal(false) },
          )
        }
        submitLabel="Salvar"
        loading={createThirdParty.isPending}
      />
    </Box>
  );
}

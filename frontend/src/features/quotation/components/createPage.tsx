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
import { useMemo, useState } from "react";
import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import { FieldDef } from "../../../common/atomic/organisms/EntityEditModal";
import { maskCEP, onlyDigits } from "../../../common/utils";
import { useFactorTypes } from "../../factor_type/queries";
import { FactorTypeEnum } from "../../factor_type/types";
import { FACTOR_LABELS } from "../../factor_type/utils";
import { useNeighborhoods } from "../../neighborhood/queries";
import { useCreateThirdParty } from "../../third_party/mutations";
import { useThirdParties } from "../../third_party/queries";
import { ThirdPartyForm } from "../../third_party/types";
import { useThirdPartyFields } from "../../third_party/utils";
import { useCreateTract } from "../../tract/mutations";
import { useTracts } from "../../tract/queries";
import { Tract, TractForm } from "../../tract/types";
import { useTractOwners } from "../../tract_owner/queries";
import { CalculatedQuote } from "../types";
import { useUpdateQuote } from "../mutations";
import { useCreatedQuote } from "../../../common/store/createdQuote.store";
import { useNavigate } from "@tanstack/react-router";

type FactorFormState = {
  price: number | "";
  thirdPartyId: number | "";
};

export default function CreateQuotesPage() {
  const navigate = useNavigate();
  const { data: tracts = [] } = useTracts();
  const { data: owners = [] } = useTractOwners();
  const { data: neighborhoods = [] } = useNeighborhoods();
  const { data: thirdParties = [] } = useThirdParties();
  const { data: factorTypes = [] } = useFactorTypes();
  const createTract = useCreateTract();
  const createThirdParty = useCreateThirdParty();
  const updateQuote = useUpdateQuote();
  const createdQuoteId = useCreatedQuote((s) => s.createdQuoteId);

  const fields = useThirdPartyFields();

  const [selectedTractId, setSelectedTractId] = useState<number | "">("");
  const [openTractModal, setOpenTractModal] = useState(false);

  const [lotCount, setLotCount] = useState<number | "">("");

  const [openThirdPartyModal, setOpenThirdPartyModal] = useState(false);
  const [factorTypeForNewThirdParty, setFactorTypeForNewThirdParty] =
    useState<FactorTypeEnum>("EARTHWORKS");

  const [factors, setFactors] = useState<
    Record<FactorTypeEnum, FactorFormState>
  >({
    HYDRO_SANITARY_SYSTEM: { price: "", thirdPartyId: "" },
    RAINWATER_DRAINAGE_SYSTEM: { price: "", thirdPartyId: "" },
    PAVING: { price: "", thirdPartyId: "" },
    ELECTRICAL_NETWORK: { price: "", thirdPartyId: "" },
    EARTHWORKS: { price: "", thirdPartyId: "" },
  });

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
            inputProps={{ min: 0, step: 1 }}
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
        key: "neighborhoodId",
        label: "Bairro",
        required: true,
        render: ({ value, set }) => (
          <TextField
            fullWidth
            select
            label="Bairro"
            value={value ?? ""}
            onChange={(e) => set(Number(e.target.value))}
          >
            {neighborhoods.map((n: { id: number; name: string }) => (
              <MenuItem key={n.id} value={n.id}>
                {n.name}
              </MenuItem>
            ))}
          </TextField>
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
    [neighborhoods, owners],
  );

  function updateFactor<K extends keyof FactorFormState>(
    factorTypeEnum: FactorTypeEnum,
    field: K,
    value: FactorFormState[K],
  ) {
    setFactors((prev) => ({
      ...prev,
      [factorTypeEnum]: {
        ...prev[factorTypeEnum],
        [field]: value,
      },
    }));
  }

  function handleOpenThirdPartyModal(factorTypeEnum: FactorTypeEnum) {
    setFactorTypeForNewThirdParty(factorTypeEnum);
    setOpenThirdPartyModal(true);
  }

  const factorsTotalValue = useMemo(() => {
    if (!factorTypes || factorTypes.length === 0) return 0;

    return factorTypes.reduce((total: number, f: any) => {
      const key = f.factorTypeEnum as FactorTypeEnum;
      const state = factors[key];

      if (!state || state.price === "" || state.price == null) {
        return total;
      }

      const numericValue = Number(state.price);
      if (Number.isNaN(numericValue)) return total;

      return total + numericValue;
    }, 0);
  }, [factors]);

  const handleSubmit = async () => {
    if (!selectedTractId || lotCount === "") {
      alert("Selecione um terreno e informe o número de lotes.");
      return;
    }

    if (!createdQuoteId) {
      alert("Nenhuma cotação base encontrada.");
      return;
    }

    const payload: CalculatedQuote = {
      tractId: Number(selectedTractId),
      lotCount: Number(lotCount),
      totalFactorsPrice: factorsTotalValue,
      factors: factorTypes.map((f: any) => {
        const key = f.factorTypeEnum as FactorTypeEnum;
        const state = factors[key];

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
        id: createdQuoteId,
        body: payload,
      });
    } catch (e) {
      console.error("Erro ao atualizar cotação", e);
      alert("Erro ao salvar cotação.");
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
            Nova Cotação
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
                      {t.number ? `, ${t.number}` : ""} - {t.city}
                      {t.state ? `/${t.state}` : ""}{" "}
                      {t.neighborhood?.name ? `(${t.neighborhood.name})` : ""}
                    </MenuItem>
                  ))
                )}
              </TextField>

              <Button
                variant="outlined"
                onClick={() => setOpenTractModal(true)}
                sx={{ whiteSpace: "nowrap" }}
              >
                Novo terreno
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Número de lotes
            </Typography>
            <TextField
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 10 }}
              value={lotCount ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setLotCount(v === "" ? "" : Number(v));
              }}
              placeholder="0.00"
            />
          </Paper>

          <Paper sx={{ p: 2, flexShrink: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Fatores
            </Typography>

            <Stack spacing={3}>
              {(factorTypes ?? []).map((factor: any) => {
                const key = factor.factorTypeEnum as FactorTypeEnum;
                const factorState = factors[key];

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
                        inputProps={{ min: 0, step: 1000 }}
                        value={
                          factorState.price === "" || factorState.price == null
                            ? ""
                            : Number(factorState.price).toFixed(2)
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "") {
                            updateFactor(key, "price", "");
                            return;
                          }

                          const n = Number(v);
                          if (!Number.isNaN(n)) {
                            updateFactor(key, "price", n);
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
                        value={factorState.thirdPartyId || ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          updateFactor(
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

                      <Button
                        variant="outlined"
                        onClick={() => setOpenTractModal(true)}
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
            <Button variant="outlined">Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Salvar cotação
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
              neighborhoodId: "",
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
                state: val.state ?? "",
                cep: onlyDigits(val.cep!),
                neighborhoodId: Number(val.neighborhoodId),
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
            factorTypeId: "",
          }}
          fields={fields}
          onClose={() => handleOpenThirdPartyModal(factorTypeForNewThirdParty)}
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
  };
}

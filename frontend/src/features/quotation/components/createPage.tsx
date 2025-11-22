import { useMemo, useState } from "react";
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
  Paper,
} from "@mui/material";
import { EntityAddModal } from "../../../common/atomic/organisms/EntityAddModal";
import { FieldDef } from "../../../common/atomic/organisms/EntityEditModal";
import { useTracts } from "../../tract/queries";
import { useCreateTract } from "../../tract/mutations";
import { Tract, TractForm } from "../../tract/types";
import { useNeighborhoods } from "../../neighborhood/queries";
import { useTractOwners } from "../../tract_owner/queries";
import { maskCEP, onlyDigits } from "../../../common/utils";

type FactorType =
  | "HYDRO_SANITARY_SYSTEM"
  | "RAINWATER_DRAINAGE_SYSTEM"
  | "PAVING"
  | "ELECTRICAL_NETWORK"
  | "EARTHWORKS";

type FactorFormState = {
  value: number | "";
  thirdPartyId: number | "";
};

type ThirdPartyOption = {
  id: number;
  name: string;
};

const FACTOR_TYPES: { key: FactorType; label: string }[] = [
  { key: "HYDRO_SANITARY_SYSTEM", label: "Sistema Hidrossanitário" },
  { key: "RAINWATER_DRAINAGE_SYSTEM", label: "Drenagem de Águas Pluviais" },
  { key: "PAVING", label: "Pavimentação" },
  { key: "ELECTRICAL_NETWORK", label: "Rede Elétrica" },
  { key: "EARTHWORKS", label: "Terraplanagem" },
];

export default function CreateQuotesPage() {
  const { data: tracts = [] } = useTracts();
  const { data: owners = [] } = useTractOwners();
  const { data: neighborhoods = [] } = useNeighborhoods();
  const createTract = useCreateTract();

  const [selectedTractId, setSelectedTractId] = useState<number | "">("");
  const [openTractModal, setOpenTractModal] = useState(false);

  const [lotCount, setLotCount] = useState<number | "">("");

  const [thirdParties, setThirdParties] = useState<ThirdPartyOption[]>([]);
  const [openThirdPartyModal, setOpenThirdPartyModal] = useState(false);
  const [newThirdPartyName, setNewThirdPartyName] = useState("");
  const [factorTypeForNewThirdParty, setFactorTypeForNewThirdParty] =
    useState<FactorType | null>(null);

  const [factors, setFactors] = useState<Record<FactorType, FactorFormState>>(
    () => {
      const initial: Record<FactorType, FactorFormState> = {
        HYDRO_SANITARY_SYSTEM: { value: "", thirdPartyId: "" },
        RAINWATER_DRAINAGE_SYSTEM: { value: "", thirdPartyId: "" },
        PAVING: { value: "", thirdPartyId: "" },
        ELECTRICAL_NETWORK: { value: "", thirdPartyId: "" },
        EARTHWORKS: { value: "", thirdPartyId: "" },
      };
      return initial;
    },
  );

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
    factorType: FactorType,
    field: K,
    value: FactorFormState[K],
  ) {
    setFactors((prev) => ({
      ...prev,
      [factorType]: {
        ...prev[factorType],
        [field]: value,
      },
    }));
  }

  function handleOpenThirdPartyModal(factorType: FactorType) {
    setFactorTypeForNewThirdParty(factorType);
    setNewThirdPartyName("");
    setOpenThirdPartyModal(true);
  }

  function handleCreateThirdParty() {
    if (!newThirdPartyName.trim() || !factorTypeForNewThirdParty) {
      return;
    }
    const newTp: ThirdPartyOption = {
      id: Date.now(),
      name: newThirdPartyName.trim(),
    };
    setThirdParties((prev) => [...prev, newTp]);
    setFactors((prev) => ({
      ...prev,
      [factorTypeForNewThirdParty]: {
        ...prev[factorTypeForNewThirdParty],
        thirdPartyId: newTp.id,
      },
    }));
    setOpenThirdPartyModal(false);
    setFactorTypeForNewThirdParty(null);
    setNewThirdPartyName("");
  }

  function handleSubmit() {
    if (!selectedTractId || lotCount === "") {
      alert("Selecione um terreno e informe o número de lotes.");
      return;
    }

    const payload = {
      tractId: Number(selectedTractId),
      lotCount: Number(lotCount),
      factors: FACTOR_TYPES.map((f) => ({
        type: f.key,
        value:
          factors[f.key].value === "" ? null : Number(factors[f.key].value),
        thirdPartyId: factors[f.key].thirdPartyId || null,
      })),
    };

    console.log("RequestQuoteDTO payload", payload);
    alert("Cotação montada no console. Agora é só integrar com a API.");
  }

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h5">Nova Cotação</Typography>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Terreno
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              select
              label="Terreno"
              value={selectedTractId || ""}
              onChange={(e) => {
                const v = e.target.value;
                setSelectedTractId(v === "" ? "" : Number(v));
              }}
            >
              <MenuItem value="">Selecione um terreno</MenuItem>
              {tracts.map((t: Tract) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.street}
                  {t.number ? `, ${t.number}` : ""} - {t.city}
                  {t.state ? `/${t.state}` : ""}{" "}
                  {t.neighborhood?.name ? `(${t.neighborhood.name})` : ""}
                </MenuItem>
              ))}
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
          <Typography variant="subtitle1" gutterBottom>
            Número de lotes
          </Typography>
          <TextField
            fullWidth
            label="Quantidade de lotes"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            value={lotCount ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setLotCount(v === "" ? "" : Number(v));
            }}
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Fatores
          </Typography>

          <Stack spacing={3}>
            {FACTOR_TYPES.map((factor) => {
              const factorState = factors[factor.key];
              return (
                <Stack key={factor.key} spacing={1}>
                  <Typography variant="body1" fontWeight={600}>
                    {factor.label}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "flex-end" }}
                  >
                    <TextField
                      fullWidth
                      label="Valor"
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      value={factorState.value ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        updateFactor(
                          factor.key,
                          "value",
                          v === "" ? "" : Number(v),
                        );
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
                          factor.key,
                          "thirdPartyId",
                          v === "" ? "" : Number(v),
                        );
                      }}
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      {thirdParties.map((tp) => (
                        <MenuItem key={tp.id} value={tp.id}>
                          {tp.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="outlined"
                      onClick={() => handleOpenThirdPartyModal(factor.key)}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Novo terceiro
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
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

      <Dialog
        open={openThirdPartyModal}
        onClose={() => setOpenThirdPartyModal(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Novo terceiro</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2">
              Informe o nome do terceiro que executará o serviço.
            </Typography>
            <TextField
              fullWidth
              label="Nome do terceiro"
              value={newThirdPartyName}
              onChange={(e) => setNewThirdPartyName(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenThirdPartyModal(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCreateThirdParty}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

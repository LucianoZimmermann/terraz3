import { MenuItem, TextField } from "@mui/material";
import { FieldDef } from "../../../common/atomic/organisms/EntityEditModal";
import { ThirdParty, ThirdPartyForm } from "../types";
import { renderFactorType } from "../../../common/utils";
import { useFactorTypes } from "../../factor_type/queries";
import { ColumnDef } from "../../../common/atomic/organisms/EntityTable";

export function useThirdPartyFields(): Array<FieldDef<ThirdPartyForm>> {
  const { data: factorTypes = [] } = useFactorTypes();

  const fields: Array<FieldDef<ThirdPartyForm>> = [
    {
      key: "name",
      label: "Nome",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Nome"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "cnpj",
      label: "CNPJ",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="CNPJ"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "phone",
      label: "Telefone",
      required: false,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Telefone"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "contactName",
      label: "Nome do contato",
      required: false,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          label="Nome do contato"
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        />
      ),
    },
    {
      key: "factorTypeId",
      label: "Tipo de serviço",
      required: true,
      render: ({ value, set }) => (
        <TextField
          fullWidth
          select
          label="Tipo de serviço"
          value={value ?? ""}
          onChange={(e) => set(Number(e.target.value))}
        >
          {factorTypes.map(
            (ft: { id: number; factorTypeEnum: string; name?: string }) => (
              <MenuItem key={ft.id} value={ft.id}>
                {ft.name ?? renderFactorType(ft.factorTypeEnum)}
              </MenuItem>
            ),
          )}
        </TextField>
      ),
    },
  ];

  return fields;
}

export const columns: Array<ColumnDef<ThirdParty>> = [
  { key: "name", header: "Nome" },
  { key: "cnpj", header: "CNPJ" },
  { key: "contactName", header: "Nome do contato" },
  { key: "phone", header: "Telefone" },
  {
    key: "factorType",
    header: "Tipo de serviço",
    render: (r) => renderFactorType(r.factorType?.factorTypeEnum),
  },
];

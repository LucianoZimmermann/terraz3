import { useState } from "react";
import { TextField } from "@/app/ui/atoms/TextField";
import { CrudPage } from "@/app/ui/templates/CrudPage";
import { useNeighborhoods, useCreateNeighborhood } from "./hooks";
import type {
  Neighborhood,
  NeighborhoodCreateDTO,
} from "@/app/core/api/neighborhoods/types";

function NeighborhoodForm({
  onSubmit,
}: {
  onSubmit: (b: NeighborhoodCreateDTO) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [priceFactor, setPF] = useState<number>(1);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, priceFactor });
      }}
    >
      <TextField
        fullWidth
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="number"
        label="Fator de Preço"
        inputProps={{ step: "0.01" }}
        value={priceFactor}
        onChange={(e) => setPF(Number(e.target.value))}
      />
    </form>
  );
}

export default function NeighborhoodsPage() {
  return (
    <CrudPage<Neighborhood, NeighborhoodCreateDTO, Record<string, never>>
      title="Bairros"
      useList={useNeighborhoods}
      useCreate={useCreateNeighborhood}
      columns={[
        { key: "id", header: "ID" },
        { key: "name", header: "Nome" },
        { key: "priceFactor", header: "Fator" },
      ]}
      Form={NeighborhoodForm}
    />
  );
}

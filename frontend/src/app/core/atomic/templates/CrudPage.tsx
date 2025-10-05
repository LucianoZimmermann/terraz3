import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { DataTable, Column } from "../organisms/DataTable";
import { CrudDialog } from "../organisms/CrudDialog";

type UseList<T, P> = (params?: P) => {
  data?: T[];
  isLoading: boolean;
  error: unknown;
};
type UseCreate<T, C> = () => { mutate: (body: C) => void; isPending: boolean };

export function CrudPage<T, C, P>({
  title,
  useList,
  useCreate,
  columns,
  Form,
  initialParams,
}: {
  title: string;
  useList: UseList<T, P>;
  useCreate: UseCreate<T, C>;
  columns: Column<T>[];
  Form: (p: { onSubmit: (b: C) => void; onCancel: () => void }) => JSX.Element;
  initialParams?: P;
}) {
  const [open, setOpen] = useState(false);
  const { data = [], isLoading } = useList(initialParams);
  const create = useCreate();

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <PrimaryButton onClick={() => setOpen(true)}>Novo</PrimaryButton>
      </Stack>

      {isLoading ? (
        <Typography color="text.secondary">Carregando…</Typography>
      ) : (
        <DataTable<T> rows={data} columns={columns} />
      )}

      <CrudDialog
        open={open}
        title={`Novo ${title}`}
        onClose={() => setOpen(false)}
        onSubmit={() => {}}
        submitting={create.isPending}
      >
        <Form
          onSubmit={(b) => {
            create.mutate(b);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </CrudDialog>
    </Stack>
  );
}

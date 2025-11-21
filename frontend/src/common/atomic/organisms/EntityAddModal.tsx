import { EntityEditModal, FieldDef } from "./EntityEditModal";

type Props<T extends Record<string, any>> = {
  open: boolean;
  title?: string;
  initialData?: Partial<T>;
  fields?: Array<FieldDef<T>>;
  omitKeysAuto?: Array<keyof T>;
  submitLabel?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (val: T) => void;
};

export function EntityAddModal<T extends Record<string, any>>({
  open,
  title,
  initialData,
  fields,
  omitKeysAuto,
  submitLabel = "Adicionar",
  loading,
  onClose,
  onSubmit,
}: Props<T>) {
  return (
    <EntityEditModal<T>
      open={open}
      title={title}
      data={initialData}
      fields={fields}
      omitKeysAuto={omitKeysAuto}
      submitLabel={submitLabel}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

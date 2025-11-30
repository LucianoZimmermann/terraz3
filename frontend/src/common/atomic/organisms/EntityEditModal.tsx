import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Stack,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "multiline";

export type FieldDef<T> = {
  key: keyof T;
  label?: string;
  type?: FieldType;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options?: Array<{ value: any; label: string }>;
  render?: (p: {
    value: any;
    set: (v: any) => void;
    data: T;
  }) => React.ReactNode;
  fullWidth?: boolean;
};

type Props<T extends Record<string, any>> = {
  open: boolean;
  title?: string;
  data?: Partial<T>;
  fields?: Array<FieldDef<T>>;
  omitKeysAuto?: Array<keyof T>;
  submitLabel?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (val: T) => void;
};

function toHeader(label: string) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

export function EntityEditModal<T extends Record<string, any>>({
  open,
  title,
  data,
  fields,
  omitKeysAuto = [],
  submitLabel = "Salvar",
  loading,
  onClose,
  onSubmit,
}: Props<T>) {
  const [form, setForm] = useState<T>((data || ({} as T)) as T);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm((data || ({} as T)) as T);
    setTouched({});
  }, [open, data]);

  const effectiveFields = useMemo<Array<FieldDef<T>>>(() => {
    if (fields && fields.length) return fields.filter((f) => !f.hidden);
    const d = (data || {}) as T;
    const keys = Object.keys(d) as Array<keyof T>;
    return keys
      .filter((k) => !omitKeysAuto.includes(k))
      .map((k) => ({
        key: k,
        label: toHeader(String(k)),
        type: "text",
        fullWidth: true,
      }));
  }, [fields, data, omitKeysAuto]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    for (const f of effectiveFields) {
      const v = (form as any)[f.key as string];
      if (f.required && (v === undefined || v === null || v === ""))
        e[String(f.key)] = "Obrigatório";
    }
    return e;
  }, [effectiveFields, form]);

  const setValue = <K extends keyof T>(key: K, value: any) => {
    setForm((prev) => ({ ...(prev || {}), [key]: value }) as T);
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      setTouched((t) => ({ ...t, [first]: true }));
      return;
    }
    onSubmit(form as T);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>
        <Grid container spacing={2} mt={0.5}>
          {effectiveFields.map((f) => {
            const k = f.key as string;
            const value = (form as any)[k];
            const showError = touched[k] && !!errors[k];
            if (f.render)
              return (
                <Grid key={k}>
                  {f.render({
                    value,
                    set: (v) => setValue(f.key, v),
                    data: form,
                  })}
                </Grid>
              );
            if (f.type === "checkbox")
              return (
                <Grid
                  sx={{
                    position: "sticky",
                    right: 0,
                  }}
                  key={k}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={(e) => setValue(f.key, e.target.checked)}
                      />
                    }
                    label={f.label || toHeader(k)}
                    disabled={f.disabled}
                  />
                </Grid>
              );
            if (f.type === "select")
              return (
                <Grid
                  sx={{
                    position: "sticky",
                    right: 0,
                  }}
                  key={k}
                >
                  <Select
                    fullWidth
                    value={value ?? ""}
                    onChange={(e) =>
                      setValue(f.key, (e.target as HTMLInputElement).value)
                    }
                    onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
                    disabled={f.disabled}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {(f.options || []).map((opt) => (
                      <MenuItem key={String(opt.value)} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              );
            return (
              <Grid
                sx={{
                  position: "sticky",
                  right: 0,
                }}
                key={k}
              >
                <TextField
                  fullWidth={f.fullWidth !== false}
                  type={
                    f.type === "number"
                      ? "number"
                      : f.type === "date"
                        ? "date"
                        : "text"
                  }
                  inputProps={{
                    min: 0,
                    step: 10000,
                    onWheel:
                      f.type === "number"
                        ? (e) => e.currentTarget.blur()
                        : undefined,
                  }}
                  label={f.label || toHeader(k)}
                  value={value ?? (f.type === "number" ? "" : "")}
                  onChange={(e) =>
                    setValue(
                      f.key,
                      f.type === "number"
                        ? e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                        : e.target.value,
                    )
                  }
                  onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
                  error={showError}
                  helperText={showError ? errors[k] : undefined}
                  disabled={f.disabled}
                  multiline={f.type === "multiline"}
                  minRows={f.type === "multiline" ? 3 : undefined}
                  InputLabelProps={
                    f.type === "date" ? { shrink: true } : undefined
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button onClick={onClose} variant="text">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!!loading}
          >
            {loading ? "Salvando..." : submitLabel}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

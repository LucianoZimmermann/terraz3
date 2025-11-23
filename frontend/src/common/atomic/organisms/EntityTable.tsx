import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

export type ColumnDef<T> = {
  key: keyof T;
  header?: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
  hidden?: boolean;
};

type Props<T extends Record<string, any>> = {
  data?: T[];
  isLoading?: boolean;
  isError?: boolean;
  title?: string;
  columns?: Array<ColumnDef<T>>;
  getRowId?: (row: T) => string | number;
  actionsHeader?: string;
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
  paperVariant?: "elevation" | "outlined" | "glass";
  size?: "small" | "medium";
  omitKeysAuto?: Array<keyof T>;
  onAddClick?: () => void;
  addButtonLabel?: string;
};

function toHeader(label: string) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

export function EntityTable<T extends Record<string, any>>({
  data,
  isLoading,
  isError,
  title,
  columns,
  getRowId,
  actions,
  actionsHeader = "",
  emptyMessage = "Nenhum registro encontrado.",
  paperVariant = "outlined",
  size = "small",
  omitKeysAuto = [],
  onAddClick,
  addButtonLabel = "Adicionar",
}: Props<T>) {
  const rows = data ?? [];

  const autoColumns = useMemo<Array<ColumnDef<T>>>(() => {
    if (columns && columns.length) return columns.filter((c) => !c.hidden);
    if (!rows.length) return [];
    const keys = Object.keys(rows[0]) as Array<keyof T>;
    return keys
      .filter((k) => !omitKeysAuto.includes(k))
      .map((k) => ({ key: k, header: toHeader(String(k)), align: "left" }));
  }, [columns, rows, omitKeysAuto]);

  if (isLoading)
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );

  if (isError)
    return (
      <Typography color="error" mt={4}>
        Falha ao carregar dados.
      </Typography>
    );

  return (
    <Stack spacing={2}>
      {title && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{title}</Typography>
          {onAddClick && (
            <Button variant="contained" size="small" onClick={onAddClick}>
              {addButtonLabel}
            </Button>
          )}
        </Stack>
      )}

      <Paper
        variant={paperVariant as any}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table size={size} sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {autoColumns.map((c) => (
                <TableCell key={String(c.key)} align={c.align ?? "left"}>
                  {c.header ?? toHeader(String(c.key))}
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  align="right"
                  sx={{
                    position: "sticky",
                    right: 0,
                  }}
                >
                  {actionsHeader}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, idx) => {
              const id =
                getRowId?.(row) ??
                (("id" in row ? (row as any).id : idx) as string | number);
              return (
                <TableRow key={id} hover>
                  {autoColumns.map((c) => (
                    <TableCell key={String(c.key)} align={c.align ?? "left"}>
                      {c.render ? c.render(row) : String(row[c.key] ?? "")}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell
                      align="right"
                      sx={{
                        position: "sticky",
                        right: 0,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        {actions(row)}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={(autoColumns.length || 1) + (actions ? 1 : 0)}
                >
                  <Typography variant="body2">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}

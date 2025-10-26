import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
export function CrudDialog({
  open,
  title,
  children,
  onClose,
  onSubmit,
  submitting,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onSubmit} disabled={!!submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Button as MUIButton, type ButtonProps } from "@mui/material";
import type { BtnVariant } from "./types";

type Props = Omit<ButtonProps, "color" | "variant"> & { v?: BtnVariant };

const map = (v: BtnVariant): ButtonProps => {
  switch (v) {
    case "primary":
      return { color: "primary", variant: "contained" };
    case "secondary":
      return { color: "secondary", variant: "contained" };
    case "danger":
      return { color: "error", variant: "contained" };
    case "ghost":
      return { color: "inherit", variant: "text" };
  }
};

export default function Button({ v = "primary", sx, ...rest }: Props) {
  const { color, variant } = map(v);
  return (
    <MUIButton
      color={color}
      variant={variant}
      sx={{ borderRadius: 2, textTransform: "none", ...sx }}
      {...rest}
    />
  );
}

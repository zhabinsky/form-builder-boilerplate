// export const TextField = () => {

import { TextField as MuiTextField } from "@mui/material";
import { ComponentProps } from "react";

export const TextField: React.FC<
  Omit<ComponentProps<typeof MuiTextField>, "style">
> = ({ ...props }) => {
  return <MuiTextField variant="outlined" {...props} />;
};

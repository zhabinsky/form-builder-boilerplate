import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const BooleanField: React.FC<{
  title?: string;
}> = ({ title }) => {
  const [state, setState] = useState<boolean | undefined>(undefined);

  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      {!!title && <InputLabel>{title}</InputLabel>}

      <ToggleButtonGroup
        value={state}
        exclusive
        sx={{
          width: "100%",

          "> *": {
            width: "100%",
          },
        }}
      >
        <ToggleButton
          value={false}
          disableRipple
          onClick={() => setState(false)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <ThumbDown fontSize="small" />
            <Typography>No</Typography>
          </Stack>
        </ToggleButton>

        <ToggleButton value={true} disableRipple onClick={() => setState(true)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ThumbUp fontSize="small" />
            <Typography>Yes</Typography>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

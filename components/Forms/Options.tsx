import { Box, ButtonBase, Grid, Stack } from "@mui/material";
import React from "react";

export const Options: React.FC<{
  options: any[];
  selectedOption?: any;
  onSelectOption: (id: any) => void;
  renderOption: (option: any) => React.ReactNode;
  itemProps?: any;
  p?: any;
  spacing?: any;
  unselectedItemOpacity?: any;
}> = ({
  options,
  selectedOption,
  onSelectOption,
  renderOption,
  itemProps,
  spacing = 1,
  unselectedItemOpacity = 0.3,
}) => {
  return (
    <Grid
      container
      spacing={spacing}
      sx={{
        userSelect: "none",
      }}
      alignItems="center"
    >
      {options.map((option) => {
        const isSelected = selectedOption === option;

        return (
          <Grid item xs={12} sm={6} lg={4} key={option.id} {...itemProps}>
            <Stack
              onClick={() => onSelectOption(option)}
              sx={{
                overflow: "hidden",

                opacity: isSelected ? 1 : unselectedItemOpacity,

                position: "relative",

                "&, &::after": {
                  transition: isSelected
                    ? "all 0.4s ease-out"
                    : "all 0.2s ease-out",
                },
                cursor: "pointer",
              }}
              alignItems="start"
              spacing={1}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {renderOption(option)}
              </Box>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

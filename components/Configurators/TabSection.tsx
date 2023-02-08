import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export const TabSection: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} mb={1}>
        {title}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {children}
    </Box>
  );
};

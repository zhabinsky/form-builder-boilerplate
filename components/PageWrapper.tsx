import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import { Header } from "./Header";
import { PageContent } from "./PageContent";

export const PageWrapper: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <PageContent sx={{ my: 1 }}>
        <Header />
      </PageContent>

      <Box>{children}</Box>
    </>
  );
};

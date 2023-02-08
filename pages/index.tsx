/* eslint-disable react/jsx-key */
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { FormPreview } from "../components/Forms/FormPreview";

import { ArrowBackIos } from "@mui/icons-material";
import { TabFields } from "../components/Configurators/TabFields";

type Tab = "design" | "fields" | "test";

export default function Create() {
  const [tab, setTab] = useState<Tab>("fields");

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: 50,
          px: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          divider={
            <Stack direction="row" alignItems="center">
              <ArrowBackIos
                fontSize="small"
                sx={{
                  transform: "translateX(-4px) rotate(180deg) scale(0.5)",
                  transformOrigin: "center",
                }}
              />
            </Stack>
          }
          spacing={1}
          sx={{
            userSelect: "none",

            "& > :nth-child(even)": {
              opacity: 0.5,
            },

            "& > *:nth-child(odd)": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            sx={{ fontWeight: tab === "fields" ? "bold" : undefined }}
            onClick={() => setTab("fields")}
          >
            Configurator
          </Box>

          <Box
            sx={{ fontWeight: tab === "test" ? "bold" : undefined }}
            onClick={() => setTab("test")}
          >
            Integration
          </Box>
        </Stack>

        <Button variant="contained">Next</Button>
      </Stack>

      <Box
        sx={{
          maxWidth: 1800,
          margin: "0 auto",

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1.5fr 1fr",
          },

          overflow: "hidden",

          gap: { xs: 2, lg: 3 },

          p: 2,

          "& > *": {
            height: { md: "calc(100vh - 82px)" },
            overflowY: { md: "scroll" },
            overflowX: "visible",
          },

          "& > *:first-child": {
            boxShadow: 2,
            borderRadius: 2,
          },

          "*::-webkit-scrollbar": {
            display: "none",
          },

          "*": {
            scrollWidth: "none",
            msOverflowStyle: "none",
          },
        }}
      >
        <FormPreview />

        <Stack spacing={2}>
          <TabFields />
        </Stack>
      </Box>
    </Box>
  );
}

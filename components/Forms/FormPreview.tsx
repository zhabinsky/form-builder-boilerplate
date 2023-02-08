import { Box } from "@mui/material";
import { useAtomValue } from "jotai";
import {
  atomCurrentPreviewStepIndex,
  atomFormConfig,
} from "../Configurators/atoms";
import { Form } from "./Form";

export const FormPreview: React.FC = () => {
  const form = useAtomValue(atomFormConfig);
  const forceStepIndex = useAtomValue(atomCurrentPreviewStepIndex);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Form form={form} stepIndex={forceStepIndex} key={forceStepIndex} />
    </Box>
  );
};

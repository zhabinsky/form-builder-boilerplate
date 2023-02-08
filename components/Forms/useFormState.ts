import { useMemo, useState } from "react";
import { Form } from "../types";

export const useFormState = (
  formConfig: Form,
  params?: { stepIndex?: number }
) => {
  const { stepIndex = 0 } = params ?? {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const form = formConfig;

  const [currentStepIndex, setCurrentStepIndex] = useState(stepIndex);

  const currentStep = form.steps[currentStepIndex];

  return {
    currentStep,
  };
};

import { atom } from "jotai";

import { makeid } from "../../utils/id";
import {
  AutoSubmittableFieldTypes,
  FieldTypes,
  Form,
  FormStep,
  TypesWithOption,
} from "../types";

export const random = (arr: any[]) =>
  arr[Math.floor(arr.length * Math.random())];

export const first = (arr: any[]) => arr[0];

export const atomCurrentPreviewStepIndex = atom(0);

export const atomFormConfig = atom<Form>({
  id: "some-id",

  steps: [
    {
      id: 1,

      title: "Heading Text",
      subtitle: "Description Text",
      notes: "Notes text",

      submitButtonText: "Submit",

      rules: [],

      fields: FieldTypes.map((type, i) => {
        return {
          id: i + 1,
          dataId: makeid(),
          title: "Field title",
          type,

          options: TypesWithOption.includes(type)
            ? [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]
            : undefined,
        };
      }),
    },
  ],
});

export const getStepByIndex = (form: Form, index: number) => {
  const totalSteps = form.steps.length;
  const indexSafe = index % totalSteps;

  return form.steps[indexSafe];
};

export const isStepAutoSubmitable = (step: FormStep) => {
  return (
    step.fields.length !== 0 &&
    !step.fields.some((e) => !AutoSubmittableFieldTypes.includes(e.type))
  );
};

export type DecorationProps = { theme: any };

export type Form = {
  id: string;
  steps: FormStep[];
};

export const FieldTypes = [
  "email",
  "url",
  "boolean",
  "rating",
  "number",
  "text",
  "textmultiline",
  "select",
  "selectmultiple",
] as const;

export type FieldType = typeof FieldTypes[number];

export const TypesWithOption: FieldType[] = ["selectmultiple", "select"];

export const AutoSubmittableFieldTypes: FieldType[] = [
  "boolean",
  "rating",
  "selectmultiple",
  "select",
];

export type FieldSelectOption = {
  value: string;
  label: string;
};

export type FormField = {
  id: number;
  dataId: string;
  title: string;
  type: FieldType;
  options?: FieldSelectOption[];
};

export const FormStepRuleCompareOperations = [
  "equal",
  "not-equal",
  "less-than",
  "more-than",
  "includes",
] as const;

export const FormStepRuleTypes = ["show-when", "hide-when"] as const;

export type FormStepRuleCompareOperation =
  typeof FormStepRuleCompareOperations[number];

export type FormStepRuleType = typeof FormStepRuleTypes[number];

export const FormStepRuleCompareOperationsByFieldType: {
  [key in FieldType]: FormStepRuleCompareOperation[];
} = {
  email: ["equal", "not-equal", "includes"],
  url: ["equal", "not-equal", "includes"],
  boolean: ["equal"],
  rating: ["equal", "not-equal", "less-than", "more-than"],
  number: ["equal", "not-equal", "less-than", "more-than"],
  text: ["equal", "not-equal", "less-than", "more-than"],
  textmultiline: ["equal", "not-equal", "includes"],
  select: ["equal", "not-equal"],
  selectmultiple: ["includes"],
};

export type FormStepRule = {
  type: FormStepRuleType;
  field: string;
  operation: FormStepRuleCompareOperation;
  value: any;
};

export type FormStep = {
  id: number;

  title: string;
  subtitle: string;
  notes: string;

  fields: FormField[];
  submitButtonText: string;
  rules: FormStepRule[];
};

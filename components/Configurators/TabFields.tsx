import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  NoSsr,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import {
  atomCurrentPreviewStepIndex,
  atomFormConfig,
  getStepByIndex,
  isStepAutoSubmitable,
} from "./atoms";
import { TabSection } from "./TabSection";
import {
  FieldType,
  FieldTypes,
  Form,
  FormField,
  FormStep,
  FormStepRule,
  FormStepRuleCompareOperationsByFieldType,
} from "../types";
import { SortableList } from "../SortableList/SortableList";
import { makeid } from "../../utils/id";
import { Add, DeleteOutline, LibraryAdd, Rule } from "@mui/icons-material";
import { DropdownMenu } from "../DropdownMenu";
import { TabFieldsField } from "./TabFieldsField";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const getPrevSteps = (form: Form, currentStepIndex: number) => {
  return form.steps.reduce((acc, step, stepIndex) => {
    if (stepIndex < currentStepIndex) acc.push(step);
    return acc;
  }, [] as FormStep[]);
};

const getFieldsBeforeStep = (form: Form, currentStepIndex: number) => {
  const stepsPrev = getPrevSteps(form, currentStepIndex);
  return stepsPrev.reduce((acc, step) => {
    acc.push(...step.fields);

    return acc;
  }, [] as FormField[]);
};

export const TabFields = () => {
  const [form, setForm] = useAtom(atomFormConfig);

  const updateStep = (step: FormStep, update: Partial<FormStep>) => {
    setForm({
      ...form,
      steps: form.steps.map((e) => {
        if (e === step) {
          return {
            ...step,
            ...update,
          };
        }
        return e;
      }),
    });
  };

  const updateField = (
    step: FormStep,
    field: FormField,
    update: Partial<FormField>
  ) => {
    updateStep(step, {
      fields: step.fields.map((e) => {
        if (e === field) {
          return {
            ...e,
            ...update,
          };
        }

        return e;
      }),
    });
  };

  const createField = (): FormField => {
    const dataIds = form.steps.reduce((acc, step) => {
      acc.push(...step.fields.map((e) => e.dataId));
      return acc;
    }, [] as string[]);

    const maxId = Math.max(
      ...form.steps.reduce((acc, step) => {
        acc.push(...step.fields.map((e) => e.id));
        return acc;
      }, [] as number[])
    );

    let dataId = makeid();

    while (dataIds.includes(dataId)) dataId = makeid();

    return { title: "Field title", type: "email", id: maxId + 1, dataId };
  };

  const addField = (step: FormStep, type: FieldType) => {
    updateStep(step, {
      fields: [
        ...step.fields,
        {
          ...createField(),
          type,
        },
      ],
    });
  };

  const addRule = (step: FormStep, field: FormField) => {
    updateStep(step, {
      rules: [
        ...step.rules,

        {
          type: "show-when",
          field: field.dataId,
          operation: "equal",
          value: "1",
        },
      ],
    });
  };

  const updateRule = (
    step: FormStep,
    rule: FormStepRule,
    update: Partial<FormStepRule>
  ) => {
    updateStep(step, {
      rules: step.rules.map((e) => {
        if (e === rule)
          return {
            ...rule,
            ...update,
          };

        return e;
      }),
    });
  };

  const removeRule = (step: FormStep, rule: FormStepRule) => {
    updateStep(step, {
      rules: step.rules.filter((e) => e !== rule),
    });
  };

  const removeField = (step: FormStep, field: FormField) => {
    const fields = step.fields.filter((e) => e !== field);

    updateStep(step, { fields });
  };

  const [currentPreviewStepIndex, setCurrentPreviewStepIndex] = useAtom(
    atomCurrentPreviewStepIndex
  );

  const createStep = (): FormStep => {
    const maxId = Math.max(...form.steps.map((e) => e.id));

    return {
      id: maxId + 1,

      title: "Heading Text",
      subtitle: `Description Text`,
      notes: "Notes Text",

      submitButtonText: "Submit",
      fields: [],
      rules: [],
    };
  };

  const addStep = () => {
    setForm({
      ...form,
      steps: [...form.steps, createStep()],
    });

    setCurrentPreviewStepIndex(form.steps.length);
  };

  const step = getStepByIndex(form, currentPreviewStepIndex);

  const deleteCurrentPage = () => {
    if (currentPreviewStepIndex >= form.steps.length - 1) {
      setCurrentPreviewStepIndex(form.steps.length - 2);
    }

    setForm({
      ...form,
      steps: form.steps.filter((e) => e !== step),
    });
  };

  const pagesSection = (
    <TabSection
      title={
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>Pages</Box>

          <Button startIcon={<LibraryAdd />} onClick={addStep} size="small">
            Add page
          </Button>
        </Stack>
      }
    >
      {form.steps.length > 1 ? (
        <Pagination
          size="small"
          count={form.steps.length}
          page={currentPreviewStepIndex + 1}
          onChange={(_, e) => setCurrentPreviewStepIndex(e - 1)}
        />
      ) : (
        <Typography variant="caption">
          {form.steps.length === 0
            ? "There are no pages, please add one"
            : "This form has just one page"}
        </Typography>
      )}
    </TabSection>
  );

  const prevStepsFields = useMemo(
    () => getFieldsBeforeStep(form, currentPreviewStepIndex),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPreviewStepIndex]
  );

  const prevStepsFieldsNotIncludedIRulesYet: FormField[] = useMemo(() => {
    if (!step) return [];

    const currentPageRulesFields = step.rules
      .map((rule) => rule.field)
      .reduce((acc, current) => {
        acc[current] = true;

        return acc;
      }, {} as Record<string, boolean>);

    return prevStepsFields.filter(
      (field) => !currentPageRulesFields[field.dataId]
    );
  }, [prevStepsFields, step]);

  const stepRulesWithFieldObjects = useMemo(() => {
    if (!step) return [];

    return step.rules.map((rule) => {
      const { field } = rule;

      const fieldObject = prevStepsFields.find((e) => e.dataId === field);

      return {
        fieldObject,
        rule,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (step) {
      const hasRulesWithoutObjects = stepRulesWithFieldObjects.some(
        (e) => !e.fieldObject
      );

      if (hasRulesWithoutObjects) {
        updateStep(step, {
          ...step,
          rules: stepRulesWithFieldObjects
            .filter((e) => !!e.fieldObject)
            .map((e) => e.rule),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepRulesWithFieldObjects]);

  if (!step) return pagesSection;

  const { title, subtitle, notes, fields, submitButtonText } = step;

  const stepIsAutoSubmittable = isStepAutoSubmitable(step);

  const canAddPageRule =
    currentPreviewStepIndex !== 0 &&
    prevStepsFieldsNotIncludedIRulesYet.length > 0;

  const submitButtonAction =
    currentPreviewStepIndex < form.steps.length - 1
      ? "Move to next page"
      : "Submit form";

  const createAddRuleButton = () => (
    <Box>
      <DropdownMenu
        hideArrow
        buttonProps={{
          startIcon: <Rule />,
          size: "small",
          disabled: !canAddPageRule,
        }}
        options={prevStepsFieldsNotIncludedIRulesYet.map((field) => {
          const { type, dataId } = field;

          return {
            title: (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: "100%" }}
                gap={2}
              >
                <Typography>{type}</Typography>

                <Typography>{dataId}</Typography>
              </Stack>
            ),
            onClick: () => addRule(step, field),
          };
        })}
      >
        Add page rule
      </DropdownMenu>
    </Box>
  );

  console.log(form);

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          {
            prevStepsFieldsNotIncludedIRulesYet,
            prevStepsFields,
            currentPreviewStepIndex,
          },
          null,
          2
        )}
      </pre> */}

      {pagesSection}

      <TabSection title="Texts">
        <Stack
          spacing={1}
          sx={{
            ".MuiInputAdornment-root": {
              opacity: 0,
              transition: "all 0.1s ease-out",
            },

            "& .MuiTextField-root:hover .MuiInputAdornment-root": {
              opacity: 1,
            },
          }}
        >
          <Box>
            <InputLabel shrink>Heading</InputLabel>

            <TextField
              size="small"
              sx={{
                fontWeight: "inherit",
                fontSize: "inherit",
                width: "100%",
              }}
              value={title}
              onChange={({ target: { value } }) => {
                updateStep(step, { title: value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        updateStep(step, { title: "" });
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <InputLabel shrink>Description</InputLabel>

            <TextField
              size="small"
              sx={{
                fontWeight: "inherit",
                fontSize: "inherit",
                width: "100%",
              }}
              value={subtitle}
              onChange={({ target: { value } }) => {
                updateStep(step, { subtitle: value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        updateStep(step, { subtitle: "" });
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <InputLabel shrink>Notes</InputLabel>

            <TextField
              size="small"
              sx={{
                fontWeight: "inherit",
                fontSize: "inherit",
                width: "100%",
              }}
              value={notes}
              onChange={({ target: { value } }) => {
                updateStep(step, { notes: value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        updateStep(step, { notes: "" });
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
      </TabSection>

      <TabSection
        title={
          <Stack direction="row" justifyContent="space-between">
            <Box>Fields</Box>

            <DropdownMenu
              hideArrow
              buttonProps={{ startIcon: <Add />, size: "small" }}
              options={FieldTypes.map((type) => {
                return {
                  title: type,
                  onClick: () => addField(step, type),
                };
              })}
            >
              Add field
            </DropdownMenu>
          </Stack>
        }
      >
        {step.fields.length > 0 ? (
          <NoSsr>
            <SortableList
              key={fields.length}
              items={fields}
              onChange={() => {}}
              renderItem={(field) => (
                <SortableList.Item id={field.id}>
                  <TabFieldsField
                    field={field}
                    onUpdate={(update) => updateField(step, field, update)}
                    onRemove={() => {
                      toast.success("Removed field");

                      removeField(step, field);
                    }}
                  />

                  {fields.length > 1 && <SortableList.DragHandle />}
                </SortableList.Item>
              )}
            />
          </NoSsr>
        ) : (
          <Typography variant="caption">This page has no fields</Typography>
        )}
      </TabSection>

      <TabSection title="Submit button">
        {!stepIsAutoSubmittable ? (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel shrink>Text</InputLabel>

              <TextField
                size="small"
                sx={{
                  fontWeight: "inherit",
                  fontSize: "inherit",
                  width: "100%",
                }}
                value={submitButtonText}
                onChange={({ target: { value } }) => {
                  updateStep(step, { submitButtonText: value });
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="caption">
            This page will be automatically submitted when user gives their
            answers.
          </Typography>
        )}
      </TabSection>

      {step.rules.length > 0 && (
        <TabSection
          title={
            <>
              <Stack direction="row" justifyContent="space-between">
                <Box>Page rules</Box>

                {createAddRuleButton()}
              </Stack>
            </>
          }
        >
          <Stack spacing={1}>
            {step.rules.map((rule) => {
              const { field, type, operation } = rule;

              const fieldObject = prevStepsFields.find(
                (e) => e.dataId === field
              );

              if (!fieldObject) return null;

              return (
                <Box key={field}>
                  <Stack direction="row" spacing={1}>
                    <Grid
                      container
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        <Select
                          fullWidth
                          value={type}
                          size="small"
                          onChange={(e) => {
                            updateRule(step, rule, {
                              type: e.target.value as any,
                            });
                          }}
                        >
                          <MenuItem value="show-when">Show when</MenuItem>
                          <MenuItem value="hide-when">Hide when</MenuItem>
                        </Select>
                      </Grid>

                      <Grid item xs={3}>
                        <Stack>
                          <Typography variant="caption">ID: {field}</Typography>

                          <Typography variant="caption" noWrap>
                            Type: {fieldObject.type}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={3}>
                        <Select
                          fullWidth
                          value={operation}
                          size="small"
                          onChange={(e) => {
                            updateRule(step, rule, {
                              operation: e.target.value as any,
                            });
                          }}
                        >
                          {FormStepRuleCompareOperationsByFieldType[
                            fieldObject.type
                          ].map((e) => {
                            return (
                              <MenuItem key={e} value={e}>
                                {e}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>

                      <Grid item xs={3}>
                        <RuleValue field={fieldObject} />
                      </Grid>
                    </Grid>

                    <Stack justifyContent="center">
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => {
                            removeRule(step, rule);
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </TabSection>
      )}

      <TabSection title="Advanced">
        <Stack spacing={1}>
          <Box>
            <Button
              size="small"
              variant="text"
              color="error"
              startIcon={<DeleteOutline />}
              onClick={deleteCurrentPage}
            >
              Delete page
            </Button>
          </Box>

          {step.rules.length === 0 && createAddRuleButton()}
        </Stack>
      </TabSection>
    </>
  );
};

const RuleValue: React.FC<{ field: FormField }> = ({ field }) => {
  switch (field.type) {
    case "select": {
      return (
        <Select size="small" fullWidth>
          {field.options?.map(({ value, label }) => {
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      );
    }

    case "selectmultiple": {
      return (
        <Select size="small" fullWidth>
          {field.options?.map(({ value, label }) => {
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      );
    }

    case "number": {
      return <TextField size="small" type="number" />;
    }

    case "rating": {
      return (
        <TextField
          size="small"
          type="number"
          fullWidth
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
      );
    }

    case "boolean": {
      return (
        <Select size="small" fullWidth>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      );
    }
  }

  return <TextField size="small" />;
};

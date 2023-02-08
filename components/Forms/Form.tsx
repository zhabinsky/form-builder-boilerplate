import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import React from "react";
import { isStepAutoSubmitable } from "../Configurators/atoms";
import { Form as FormType } from "../types";
import { BooleanField } from "./BooleanField";
import { RatingField } from "./RatingField";

import { TextField } from "./TextField";
import { useFormState } from "./useFormState";

export const Form: React.FC<{
  form: FormType;
  stepIndex?: number;
}> = ({ form, stepIndex = 0 }) => {
  const { currentStep } = useFormState(form, { stepIndex });

  if (!currentStep) return null;

  const { title, subtitle, notes, fields } = currentStep;

  const stepIsAutoSubmittable = isStepAutoSubmitable(currentStep);

  return (
    <>
      <Box
        component="form"
        sx={{
          position: "relative",

          px: {
            xs: 2,
            lg: 4,
            xl: 6,
          },

          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            content: '" "',
            zIndex: -1,
          }}
        />

        <Stack
          sx={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            zIndex: 9,
            py: {
              xs: 3,
              lg: 5,
            },
          }}
          justifyContent={{
            sm: "center",
          }}
        >
          <Stack
            spacing={2}
            justifyContent="center"
            sx={{
              width: "fit-content",
              height: "fit-content",

              minWidth: { xs: "fit-content" },

              position: "relative",
            }}
          >
            <Stack spacing={3} width="100%">
              {(!!subtitle || !!title) && (
                <Stack spacing={2}>
                  {!!title && (
                    <Typography
                      className="heading"
                      variant="h2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                  )}

                  {!!subtitle && (
                    <Typography variant="h6" fontWeight="normal">
                      {subtitle}
                    </Typography>
                  )}
                </Stack>
              )}

              {fields.length > 0 && (
                <Stack
                  spacing={{ xs: 2, md: 3 }}
                  className="fields-container"
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    maxHeight: "50vh",
                    overflowY: "scroll",
                  }}
                >
                  {fields.map((field) => {
                    const { id, title, type } = field;

                    if (type === "email") {
                      return (
                        <TextField
                          key={id}
                          fullWidth
                          placeholder={title}
                          type="email"
                          autoComplete="email"
                        />
                      );
                    }

                    if (type === "number") {
                      return (
                        <TextField
                          key={id}
                          fullWidth
                          placeholder={title}
                          type="number"
                        />
                      );
                    }

                    if (type === "url") {
                      return (
                        <TextField
                          key={id}
                          fullWidth
                          placeholder={title}
                          type="url"
                        />
                      );
                    }

                    if (type === "select") {
                      const { options = [] } = field;

                      if (options.length === 0) return null;

                      if (options.length < 6) {
                        return (
                          <FormControl fullWidth key={id}>
                            <Stack>
                              {!!title && (
                                <FormLabel
                                  id="demo-radio-buttons-group-label"
                                  sx={{ mb: 2 }}
                                >
                                  {title}
                                </FormLabel>
                              )}
                            </Stack>

                            <RadioGroup>
                              {options.map((option) => {
                                const { label, value } = option;

                                if (!label) return null;

                                return (
                                  <FormControlLabel
                                    key={value}
                                    value={value}
                                    control={<Radio size="medium" />}
                                    label={label}
                                  />
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                        );
                      }

                      return (
                        <Stack spacing={1} key={id} sx={{ width: "100%" }}>
                          {!!title && <InputLabel>{title}</InputLabel>}

                          <Select key={id} placeholder={title} fullWidth>
                            {options.map((option) => {
                              const { label, value } = option;

                              return (
                                <MenuItem key={value} value={value}>
                                  {label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Stack>
                      );
                    }

                    if (type === "selectmultiple") {
                      const { options = [] } = field;

                      if (options.length === 0) return null;

                      if (options.length < 6) {
                        return (
                          <FormControl fullWidth key={id}>
                            <Stack>
                              {!!title && (
                                <FormLabel
                                  id="demo-radio-buttons-group-label"
                                  sx={{ mb: 2 }}
                                >
                                  {title}
                                </FormLabel>
                              )}
                            </Stack>

                            <RadioGroup>
                              {options.map((option) => {
                                const { label, value } = option;

                                if (!label) return null;

                                return (
                                  <FormControlLabel
                                    key={value}
                                    value={value}
                                    control={<Checkbox name="gilad" />}
                                    label={label}
                                  />
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                        );
                      }

                      return (
                        <Stack spacing={1} key={id} sx={{ width: "100%" }}>
                          {!!title && <InputLabel>{title}</InputLabel>}

                          <Select
                            key={id}
                            placeholder={title}
                            fullWidth
                            multiple
                            value={[]}
                          >
                            {options.map((option) => {
                              const { label, value } = option;

                              return (
                                <MenuItem key={value} value={value}>
                                  {label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Stack>
                      );
                    }

                    if (type === "text") {
                      return (
                        <TextField key={id} fullWidth placeholder={title} />
                      );
                    }

                    if (type === "textmultiline") {
                      return (
                        <TextField
                          key={id}
                          fullWidth
                          multiline
                          minRows={2}
                          placeholder={title}
                        />
                      );
                    }

                    if (type === "rating") {
                      return <RatingField key={id} title={title} />;
                    }

                    if (type === "boolean") {
                      return <BooleanField key={id} title={title} />;
                    }

                    return <Typography key={id}>Unsupported field</Typography>;
                  })}
                </Stack>
              )}

              {!stepIsAutoSubmittable && (
                <Box>
                  <Button type="submit" variant="contained" size="large">
                    {currentStep.submitButtonText}
                  </Button>
                </Box>
              )}

              {!!notes && (
                <Typography sx={{ opacity: 0.6 }}>{notes}</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

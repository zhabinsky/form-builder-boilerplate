import { Add, DeleteOutline, InfoOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { makeid } from "../../utils/id";
import { FormField } from "../types";

export const TabFieldsField: React.FC<{
  field: FormField;
  onUpdate: (update: Partial<FormField>) => void;
  onRemove: () => void;
}> = ({ field, onUpdate, onRemove }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      pr={1}
      spacing={2}
    >
      <Stack width="100%">
        <Typography fontWeight="bolder">
          <TextField
            sx={{
              fontWeight: "inherit",
              fontSize: "inherit",
              width: "100%",
            }}
            value={field.title}
            placeholder={`Untitled ${field.type} field`}
            onChange={({ target: { value } }) => onUpdate({ title: value })}
            size="small"
          />
        </Typography>

        <Stack>
          {(field.type === "select" || field.type === "selectmultiple") && (
            <>
              {(!field.options || !field.options.length) && (
                <Box display="flex">
                  <Alert severity="error" sx={{ zoom: "75%", mt: 2, mb: 1 }}>
                    Please add options
                  </Alert>
                </Box>
              )}

              {!!field.options && field.options.length > 0 && (
                <Box mt={1}>
                  <Typography variant="caption" fontWeight="bold">
                    Options
                  </Typography>

                  <Stack
                    my={0.5}
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
                    {field.options.map((currentOption, i) => {
                      const { value, label } = currentOption;

                      return (
                        <TextField
                          key={value + String(i)}
                          value={label}
                          placeholder="Type option"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    onUpdate({
                                      options: field.options?.filter(
                                        (e) => e !== currentOption
                                      ),
                                    });
                                  }}
                                >
                                  <DeleteOutline fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(event) =>
                            onUpdate({
                              options: field.options?.map((e) => {
                                if (e === currentOption) {
                                  return {
                                    ...currentOption,
                                    label: event.target.value,
                                  };
                                }

                                return e;
                              }),
                            })
                          }
                          size="small"
                        />
                      );
                    })}
                  </Stack>
                </Box>
              )}

              <Box>
                <Button
                  size="small"
                  startIcon={<Add />}
                  sx={{ height: 20, fontSize: "10px" }}
                  onClick={() => {
                    const options = field.options ?? [];
                    onUpdate({
                      options: [
                        ...options,
                        {
                          value: makeid() + makeid(),
                          label: `Option ${options.length + 1}`,
                        },
                      ],
                    });
                  }}
                >
                  Add option
                </Button>
              </Box>
            </>
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ opacity: 0.6 }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
            <Typography variant="caption">
              {field.type}: {field.dataId}
            </Typography>

            <Tooltip
              arrow
              title={
                <>
                  This is the name of the field as it will be saved in the
                  database when user submits the form.
                  <br />
                  <br />
                  You might want to change it to something more meaningful.
                  Click to rename.
                </>
              }
            >
              <InfoOutlined sx={{ fontSize: "14px" }} />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>

      <Tooltip title="Delete this field" arrow>
        <IconButton sx={{ opacity: 0.5 }} size="small" onClick={onRemove}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

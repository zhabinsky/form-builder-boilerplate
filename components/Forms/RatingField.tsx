import { Box, InputLabel, Rating, Stack } from "@mui/material";

export const RatingField: React.FC<{
  title?: string;
}> = ({ title }) => {
  return (
    <Stack spacing={1}>
      {!!title && <InputLabel>{title}</InputLabel>}

      <Rating
        sx={{
          "& label, svg": {
            fontSize: "50px",
          },
        }}
        size="large"
      />
    </Stack>
  );
};

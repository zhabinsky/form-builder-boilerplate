import { Box } from "@mui/material";
import { ComponentProps } from "react";

const innerContainerStyle = {
  pl: {
    xs: 2,
    sm: 2,
    md: 3,
    xl: 0,
  },
  pr: {
    xs: 2,
    sm: 2,
    md: 3,
    xl: 0,
  },
};

const outerContainerStyle = {
  margin: "0 auto",
  width: "100%",
  maxWidth: 1080,
};

export const PageContent: React.FC<
  ComponentProps<typeof Box> & { sxOuter?: any }
> = ({ children, sx, sxOuter, ...props }) => {
  return (
    <Box sx={{ ...outerContainerStyle, ...sxOuter }} {...props}>
      <Box sx={{ ...innerContainerStyle, ...sx }} className="smooth">
        {children}
      </Box>
    </Box>
  );
};

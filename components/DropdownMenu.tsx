import { ArrowDropDown } from "@mui/icons-material";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import Link from "next/link";
import React, { ComponentProps, useEffect, useState } from "react";

export type DropdownMenuOption = {
  title: React.ReactNode;
  href?: string;
  hide?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export const DropdownMenu: React.FC<{
  hideArrow?: boolean;
  children: React.ReactNode;
  options: DropdownMenuOption[];
  buttonProps?: ComponentProps<typeof Button>;
}> = ({ children, options, buttonProps, hideArrow }) => {
  const [anchorEl, setAnchor] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchor(event.currentTarget);

  const handleClose = () => setAnchor(null);

  if (options.length === 0) return null;

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        {...buttonProps}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {children}

          {!hideArrow && (
            <ArrowDropDown
              sx={{
                fontSize: "1.2rem",
                opacity: 0.5,
                transform: !open ? "rotate(-90deg)" : undefined,
                transition: "all 0.25s ease-in",
                transitionDelay: "0.025s",
              }}
            />
          )}
        </Stack>
      </Button>

      {open && (
        <Menu
          sx={{
            transform: "translateY(10px)",
            svg: {
              fontSize: 16,
            },

            "& > * > *": {
              p: "0 !important",
            },
            "& > * > * > *:first-of-type": {
              pt: 1.5,
            },
            "& > * > * > *:last-child": {
              pb: 1.5,
            },
          }}
          anchorEl={anchorEl}
          onClose={handleClose}
          open
        >
          {options.map(({ title, onClick, href, hide, icon }) => {
            if (typeof hide === "boolean" && hide) return null;

            const key = href + String(title);

            const content = (
              <Stack direction="row" gap={1} alignItems="center" width="100%">
                {icon}

                {title}
              </Stack>
            );

            if (onClick) {
              return (
                <MenuItem
                  key={key}
                  onClick={() => {
                    onClick();
                    handleClose();
                  }}
                >
                  {content}
                </MenuItem>
              );
            }

            if (href) {
              return (
                <Link key={key} href={href} passHref>
                  <MenuItem component="a" onClick={handleClose}>
                    {content}
                  </MenuItem>
                </Link>
              );
            }

            return null;
          })}
        </Menu>
      )}
    </>
  );
};

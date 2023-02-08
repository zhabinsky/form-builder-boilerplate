import React, { createContext, useContext, useMemo } from "react";
import type { PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, styled } from "@mui/material";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  return (
    <SortableItemContext.Provider value={context}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: "1",
          alignItems: "center",
          p: 2,

          background: "white",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: 1,
          listStyle: "none",
          fontSize: "1rem",
          fontFamily: "sans-serif",
        }}
        component="li"
        className="SortableItem"
        ref={setNodeRef}
        style={{
          opacity: isDragging ? 0.4 : undefined,
          transform: CSS.Translate.toString(transform),
          transition,
        }}
      >
        {children}
      </Box>
    </SortableItemContext.Provider>
  );
}

const DragHandleContainer = styled(Box)({
  display: "flex",
  width: "18px",
  height: "35px",
  padding: "5px",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  touchAction: "none",
  cursor: "var(--cursor, pointer)",
  borderRadius: 2,
  border: "none",
  outline: "none",
  appearance: "none",
  backgroundColor: "transparent",
  WebkitTapHighlightColor: "transparent",

  "& svg": {
    flex: "0 0 auto",
    margin: "auto",
    height: "100%",
    overflow: "visible",
    fill: "#919eab",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  "&:focus-visible": {
    boxShadow: "0 0px 0px 2px #4c9ffe",
  },
});

export const DragHandle: React.FC = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <DragHandleContainer
      component="button"
      className="DragHandle"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </DragHandleContainer>
  );
};

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Maybe } from "graphql/jsutils/Maybe";
import type { CSSProperties, PropsWithChildren } from "react";
import { createContext, useMemo } from "react";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Maybe<DraggableAttributes>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export const SortableItemContext = createContext<Context>({
  attributes: {} as DraggableAttributes,
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
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

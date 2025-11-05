import { ExerciseAgeGroup } from "@/generated/graphql";
import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum ExerciseView {
  CARD = "card",
  LIST = "list",
}
export type ComposeView = ExerciseAgeGroup | "all";
type TState = {
  selectedContainer: string | null;
  selectedOrder: number | null;
  clipboardId: UniqueIdentifier | null;
  view: ComposeView;
  exerciseView: ExerciseView;
  name: string;
};

type TActions = {
  setSelected: (containerId: string, order: number) => void;
  setClipboard: (id: UniqueIdentifier) => void;
  clear: () => void;
  setView: (view: ComposeView) => void;
  setExerciseView: (view: ExerciseView) => void;
  setValue: (values: Partial<TState>) => void;
  setName: (name: string) => void;
};

const defaultState: TState = {
  selectedContainer: null,
  selectedOrder: null,
  clipboardId: null,
  view: "all",
  exerciseView: ExerciseView.CARD,
  name: "",
};

export const composeStore = create<TState & TActions>()(
  immer((set) => ({
    ...defaultState,
    setSelected: (containerId, order) => {
      set((state) => {
        state.selectedContainer = containerId;
        state.selectedOrder = order;
      });
    },
    setClipboard: (id) => {
      set((state) => {
        state.clipboardId = id;
      });
    },
    clear: () => {
      set((state) => {
        state.selectedOrder = null;
        state.selectedContainer = null;
      });
    },
    setView: (view) => {
      set((state) => {
        state.view = view;
      });
    },
    setExerciseView: (view) => {
      set((state) => {
        state.exerciseView = view;
      });
    },
    setValue: (values: Partial<TState>) => {
      set((state) => {
        Object.assign(state, values);
      });
    },
    setName: (name: string) => {
      set((state) => {
        state.name = name;
      });
    },
  })),
);

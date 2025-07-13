import { ExerciseAgeGroup } from "@/generated/graphql";
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
  view: ComposeView;
  exerciseView: ExerciseView;
  name: string;
};

type TActions = {
  setSelected: (containerId: string, order: number) => void;
  clear: () => void;
  setView: (view: ComposeView) => void;
  setExerciseView: (view: ExerciseView) => void;
  setValue: (values: Partial<TState>) => void;
  setName: (name: string) => void;
};

const defaultState: TState = {
  selectedContainer: null,
  selectedOrder: null,
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
    clear: () => {
      set((state) => {
        state.selectedContainer = null;
        state.selectedOrder = null;
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

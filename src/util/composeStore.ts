import { ExerciseAgeGroup } from "@/generated/graphql";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum ExerciseView {
  CARD = "card",
  LIST = "list",
}
type ComposeView = ExerciseAgeGroup | "all";
type TState = {
  selectedId: string | null;
  hoverLocation: string | null;
  hoverIndex: number | null;
  view: ComposeView;
  exerciseView: ExerciseView;
  name: string;
};

type TActions = {
  setSelectedId: (id: string | null) => void;
  setView: (view: ComposeView) => void;
  setExerciseView: (view: ExerciseView) => void;
  setValue: (values: Partial<TState>) => void;
  setName: (name: string) => void;
};

const defaultState: TState = {
  selectedId: null,
  hoverLocation: null,
  hoverIndex: null,
  view: "all",
  exerciseView: ExerciseView.CARD,
  name: "",
};

export const composeStore = create<TState & TActions>()(
  immer((set) => ({
    ...defaultState,
    setSelectedId: (id) => {
      set((state) => {
        state.selectedId = id;
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

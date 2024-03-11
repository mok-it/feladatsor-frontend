import { ExerciseAgeGroup } from "@/generated/graphql";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum ExerciseView {
  CARD = "card",
  LIST = "list",
}
type ComposeView = ExerciseAgeGroup | "all";
type TState = {
  highlightedFakeId: string | null;
  hoverLocation: string | null;
  hoverIndex: number | null;
  view: ComposeView;
  exerciseView: ExerciseView;
};

type TActions = {
  setHighlightedFakeId: (fakeId: string | null) => void;
  setHoverLocation: (location: string | null) => void;
  setHoverIndex: (index: number | null) => void;
  setView: (view: ComposeView) => void;
  setExerciseView: (view: ExerciseView) => void;
  setValue: (values: Partial<TState>) => void;
};


const defaultState: TState = {
  highlightedFakeId: null,
  hoverLocation: null,
  hoverIndex: null,
  view: "all",
  exerciseView: ExerciseView.CARD,
};

export const composeStore = create<TState & TActions>()(
  immer((set) => ({
    ...defaultState,
    setHighlightedFakeId: (fakeId) => {
      set((state) => {
        state.highlightedFakeId = fakeId;
      });
    },
    setHoverLocation: (location) => {
      set((state) => {
        state.hoverLocation = location;
      });
    },
    setHoverIndex: (index) => {
      set((state) => {
        state.hoverIndex = index;
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
    }
  })),
);

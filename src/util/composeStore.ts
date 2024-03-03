import { create } from 'zustand'

type TState = {
  highlightedFakeId: string | null
}

type TActions = {
  setHighlightedFakeId: (fakeId: string | null) => void
  setHoverLocation: (location: string | null) => void
  setHoverIndex: (index: number | null) => void
  setActiveItem: (item: ExerciseCardData | null) => void
  addExercise: (exercise: ExerciseCardData) => void
}

const defaultState: TState = {
  highlightedFakeId: null
}

export const composeStore = create<TState & TActions>()(
  immer(
    set => ({
      ...defaultState,
      setHighlightedFakeId: (fakeId) => {
        set(state => {
          state.highlightedFakeId = fakeId
        })
      },
      setHoverLocation: (location) => {
        set(state => {
          state.hoverLocation = location
        })
      },
      setHoverIndex: (index) => {
        set(state => {
          state.hoverIndex = index
        })
      },
      setActiveItem: (item) => {
        set(state => {
          state.activeItem = item
        })
      },
      addExercise: (exercise) => {
        set(state => {
          state.exercises.push(exercise)
        })
      }
    }))
)

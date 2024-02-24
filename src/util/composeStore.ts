import { create } from 'zustand'

type TState = {
  highlightedFakeId: string | null
}

type TActions = {
  setHighlightedFakeId: (fakeId: string | null) => void
}

const defaultState: TState = {
  highlightedFakeId: null
}

export const composeStore = create<TState & TActions>(set => ({
  ...defaultState,
  setHighlightedFakeId: (fakeId) => {
    set({ highlightedFakeId: fakeId })
  }
}))
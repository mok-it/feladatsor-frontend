import dayjs from 'dayjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ExerciseCardData } from './types'

type TState = {
  highlightedFakeId: string | null
  hoverLocation: string | null
  hoverIndex: number | null
  activeItem: ExerciseCardData | null
  exercises: ExerciseCardData[]
}

type TActions = {
  setHighlightedFakeId: (fakeId: string | null) => void
  setHoverLocation: (location: string | null) => void
  setHoverIndex: (index: number | null) => void
  setActiveItem: (item: ExerciseCardData | null) => void
  addExercise: (exercise: ExerciseCardData) => void
}


export const mock: ExerciseCardData = {
  id: "1",
  data: {
    __typename: "Exercise",
    fakeId: "24-0123-4567",
    checks: [],
    difficulty: [
      { ageGroup: "KOALA", difficulty: 10, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "MEDVEBOCS",
        difficulty: 8,
        __typename: "ExerciseDifficulty",
      },
      { ageGroup: "KISMEDVE", difficulty: 4, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "NAGYMEDVE",
        difficulty: 2,
        __typename: "ExerciseDifficulty",
      },
      {
        ageGroup: "JEGESMEDVE",
        difficulty: 1,
        __typename: "ExerciseDifficulty",
      },
    ],
    helpingQuestions: [],
    history: [],
    id: "1",
    description: "description",
    solution: "solution",
    alternativeDifficultyExercises: [],
    sameLogicExercises: [],
    comments: [],
    solutionOptions: [],
    status: "CREATED",
    tags: [],
    elaboration: "elaboration",
    elaborationImage: null,
    exerciseImage: null,
    isCompetitionFinal: false,
    solveIdea: "",
    source: "source",
    createdBy: {
      __typename: "User",
      id: "1",
      name: "name",
      email: "email",
      exercises: [],
      updatedAt: dayjs().toISOString(),
      createdAt: dayjs().toISOString(),
      userName: "userName",
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  },
};

export const mock2 = {
  data: {
    ...mock.data,
    fakeId: "ab-2837-1234",
  },
  id: "2",
};
export const mock3 = {
  data: {
    ...mock.data,
    fakeId: "ku-2837-1234",
  },
  id: "3",
};

const defaultState: TState = {
  highlightedFakeId: null,
  hoverLocation: null,
  hoverIndex: null,
  activeItem: null,
  exercises: [mock, mock2, mock3],
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
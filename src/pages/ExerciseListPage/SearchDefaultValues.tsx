import { ExerciseQuery } from "@/pages/ExerciseListPage/ExerciseListPage.tsx";

export const searchDefaultValues: ExerciseQuery = {
  searchQuery: "",
  difficulty: {
    KOALA: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    MEDVEBOCS: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    NAGYMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    KISMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    JEGESMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
  },
};

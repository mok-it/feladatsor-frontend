import { ExerciseInput } from "@/generated/graphql.tsx";

export const createExerciseInitialValue: ExerciseInput = {
  description: "",
  difficulty: [
    {
      difficulty: 0,
      ageGroup: "KOALA",
    },
    {
      difficulty: 0,
      ageGroup: "KISMEDVE",
    },
    {
      difficulty: 0,
      ageGroup: "MEDVEBOCS",
    },
    {
      difficulty: 0,
      ageGroup: "NAGYMEDVE",
    },
    {
      difficulty: 0,
      ageGroup: "JEGESMEDVE",
    },
  ],
  helpingQuestions: [],
  solution: "",
  solutionOptions: [],
  status: "DRAFT",
  tags: [],
};

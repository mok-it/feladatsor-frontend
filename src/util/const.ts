import {
  Exercise,
  ExerciseAgeGroup,
  ExerciseCheckType,
} from "@/generated/graphql";
import { ExerciseFieldsType, ExerciseQuery } from "./types";

export const levels: { [key in number]: { name: string } } = {
  0: { name: "Zöld" },
  1: { name: "Bronz" },
  2: { name: "Ezüst" },
  3: { name: "Arany" },
};

export const difficultyItemCount: Record<number, number> = {
  0: 5,
  1: 5,
  2: 4,
  3: 3,
};

export const ageGroupTexts: Record<ExerciseAgeGroup, string> = {
  KOALA: "Koala",
  KISMEDVE: "Kismedve",
  MEDVEBOCS: "Medvebocs",
  NAGYMEDVE: "Nagymedve",
  JEGESMEDVE: "Jegesmedve",
};

export const translateCheck = (type: ExerciseCheckType) => {
  switch (type) {
    case "GOOD":
      return "Elfogadva";
    case "TO_DELETE":
      return "Törlendő";
    case "CHANGE_REQUIRED":
      return "Javítandó";
  }
};

const names: Partial<Record<keyof Exercise, string>> = {
  checks: "Ellenőrzések",
  difficulty: "Nehézség",
  description: "Leírás",
  helpingQuestions: "Segítő kérdések",
  exerciseImage: "Kép",
  solution: "Megoldás",
  solveIdea: "Ötlet a megoldáshoz",
  tags: "Címkék",
  status: "Státusz",
};

export const translateFieldName = (name: string) => {
  return names[name as keyof typeof names] || name;
};

export const searchDefaultValues: ExerciseQuery = {
  excludeTags: [],
  includeTags: [],
  searchQuery: "",
  isFinal: false,
  difficulty: {
    KOALA: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    MEDVEBOCS: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    KISMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    NAGYMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
    JEGESMEDVE: {
      difficulty: [0, 4],
      isEnabled: false,
    },
  },
};

export const createExerciseInitialValue: ExerciseFieldsType = {
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
  sameLogicGroup: "",
};

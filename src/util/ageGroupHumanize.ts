import { ExerciseAgeGroup } from "@/generated/graphql.tsx";

export const ageGroupHumanize: {
  [key in ExerciseAgeGroup]: {
    title: string;
  };
} = {
  NAGYMEDVE: {
    title: "Nagy Medve",
  },
  MEDVEBOCS: {
    title: "Medvebocs",
  },
  KISMEDVE: {
    title: "Kis Medve",
  },
  JEGESMEDVE: {
    title: "Jeges Medve",
  },
  KOALA: {
    title: "Koala",
  },
};

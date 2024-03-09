import { ExerciseAgeGroup } from "@/generated/graphql.tsx";

type AgeGroupTextsType = {
  [key in ExerciseAgeGroup]: string;
};

export const ageGroupTexts: AgeGroupTextsType = {
  KOALA: "Koala",
  KISMEDVE: "Kismedve",
  MEDVEBOCS: "Medvebocs",
  NAGYMEDVE: "Nagymedve",
  JEGESMEDVE: "Jegesmedve",
};

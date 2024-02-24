import { ExerciseAgeGroup } from "@/generated/graphql";

export const ageGroups: { [key in ExerciseAgeGroup]: { name: string } } = {
  KOALA: { name: "Koala" },
  MEDVEBOCS: { name: "Medvebocs" },
  KISMEDVE: { name: "Kismedve" },
  NAGYMEDVE: { name: "Nagymedve" },
  JEGESMEDVE: { name: "Jegesmedve" },
};

export const levels: { [key in number]: { name: string } } = {
  0: { name: "Zöld" },
  1: { name: "Bronz" },
  2: { name: "Ezüst" },
  3: { name: "Arany" },
};

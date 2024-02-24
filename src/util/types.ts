import { ExerciseAgeGroup } from "@/generated/graphql";

export const ageGroups: { [key in ExerciseAgeGroup]: { name: string } } = {
  KOALA: { name: "Koala" },
  MEDVEBOCS: { name: "Medvebocs" },
  KISMEDVE: { name: "Kismedve" },
  NAGYMEDVE: { name: "Nagymedve" },
  JEGESMEDVE: { name: "Jegesmedve" },
};

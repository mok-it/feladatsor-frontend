import { ExerciseCheckType } from "@/generated/graphql";

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

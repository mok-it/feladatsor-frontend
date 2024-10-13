import { Exercise } from "@/generated/graphql";

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

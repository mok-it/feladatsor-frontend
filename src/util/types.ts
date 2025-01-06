import { Exercise, ExerciseAgeGroup } from "@/generated/graphql";

declare global {
  interface Window {
    MathJax: unknown;
  }
}

export type ExerciseCardData = {
  id: string;
  data: Exercise & { id: string };
};

export type ExercisePlacements = {
  [key in string]: {
    [key in ExerciseAgeGroup]: number;
  };
};

export enum ExerciseStatusEnum {
  APPROVED = "APPROVED",
  CREATED = "CREATED",
  DELETED = "DELETED",
  DRAFT = "DRAFT",
}

export type ExerciseTag = {
  id: string;
  name: string;
  exerciseCount: number;
  children: Partial<ExerciseTag>[];
};

export type DifficultySelect = {
  [key in ExerciseAgeGroup]: {
    difficulty: [number, number]; // [min, max]
    isEnabled: boolean;
  };
};

export type ExerciseQuery = {
  difficulty: DifficultySelect;
  searchQuery: string;
  isFinal: boolean;
  includeTags: string[];
  excludeTags: string[];
};

import {
  ExerciseDifficultyInput,
  ExerciseStatus,
  InputMaybe,
  Scalars,
} from "@/generated/graphql";

export type ExerciseFieldsType = {
  description: Scalars["String"]["input"];
  difficulty: Array<ExerciseDifficultyInput>;
  exerciseImage?: InputMaybe<Scalars["String"]["input"]>;
  helpingQuestions: Array<Scalars["String"]["input"]>;
  isCompetitionFinal?: InputMaybe<Scalars["Boolean"]["input"]>;
  sameLogicGroup: InputMaybe<Scalars["ID"]["input"]>;
  solution: Scalars["String"]["input"];
  solutionImage?: InputMaybe<Scalars["String"]["input"]>;
  solutionOptions: Array<Scalars["String"]["input"]>;
  solveIdea?: InputMaybe<Scalars["String"]["input"]>;
  solveIdeaImage?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<Scalars["String"]["input"]>;
  status?: ExerciseStatus;
  tags: Array<InputMaybe<Scalars["ID"]["input"]>>;
  contributors: Array<Scalars["String"]["input"]>;

  exerciseImageUrl?: string | null | undefined;
  solutionImageUrl?: string | null | undefined;
  solveIdeaImageUrl?: string | null | undefined;
};

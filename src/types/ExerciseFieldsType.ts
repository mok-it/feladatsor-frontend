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

  exerciseImageUrl?: string | null | undefined;
  solutionImageUrl?: string | null | undefined;
  solveIdeaImageUrl?: string | null | undefined;
};

import ExerciseCard from "@/components/ExerciseCard";
import { Exercise } from "@/generated/graphql";
import dayjs from "dayjs";
import { FC } from "react";

type FakeId = { fakeId: string };

const mock: Exercise & FakeId = {
  __typename: "Exercise",
  fakeId: "24-0123-4567",
  name: "name",
  checks: [],
  difficulty: [
    { ageGroup: "KOALA", difficulty: 10, __typename: "ExerciseDifficulty" },
    { ageGroup: "MEDVEBOCS", difficulty: 8, __typename: "ExerciseDifficulty" },
    { ageGroup: "KISMEDVE", difficulty: 4, __typename: "ExerciseDifficulty" },
    { ageGroup: "NAGYMEDVE", difficulty: 2, __typename: "ExerciseDifficulty" },
    { ageGroup: "JEGESMEDVE", difficulty: 1, __typename: "ExerciseDifficulty" },
  ],
  helpingQuestions: [],
  history: [],
  similarExercises: [],
  id: "1",
  description: "description",
  solution: "solution",
  createdBy: {
    __typename: "User",
    id: "1",
    name: "name",
    email: "email",
    exercises: [],
    updatedAt: dayjs().toISOString(),
    createdAt: dayjs().toISOString(),
    userName: "userName",
  },
  createdAt: dayjs().toISOString(),
  updatedAt: dayjs().toISOString(),
};

const ExerciseCompose: FC = () => {
  return (
    <div>
      <h1>Exercise Compose</h1>
      <ExerciseCard exercise={mock} />
    </div>
  );
};

export default ExerciseCompose;

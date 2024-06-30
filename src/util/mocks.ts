import dayjs from "dayjs";
import { ExerciseCardData } from "./types";

export const mock: ExerciseCardData = {
  id: "1",
  data: {
    __typename: "Exercise",
    fakeId: "24-0123-4567",
    checks: [],
    difficulty: [
      { ageGroup: "KOALA", difficulty: 4, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "MEDVEBOCS",
        difficulty: 3,
        __typename: "ExerciseDifficulty",
      },
      { ageGroup: "KISMEDVE", difficulty: 4, __typename: "ExerciseDifficulty" },
      {
        ageGroup: "NAGYMEDVE",
        difficulty: 2,
        __typename: "ExerciseDifficulty",
      },
      {
        ageGroup: "JEGESMEDVE",
        difficulty: 0,
        __typename: "ExerciseDifficulty",
      },
    ],
    helpingQuestions: ["Ki az a Matusz?", "Mi az a cigány?"],
    history: [],
    id: "1",
    description:
      "Bomátakertben járt Matusz a cigányokkal. Matusz a cigányoknak adott egy kis pénzt, hogy ne bántsák. A cigányok megkérdezték, hogy mennyi pénzt adott nekik. Matusz azt mondta, hogy 10 forintot. A cigányok azt mondták, hogy 10 forintot adtál nekünk, de 10 forintot adtál a cigányoknak is. Matusz azt mondta, hogy 10 forintot adott nekik. Mennyi pénzt adott nekik Matusz?",
    solution: "solution",
    alternativeDifficultyExercises: [],
    sameLogicExercises: [],
    comments: [],
    solutionOptions: ["10", "69", "matusz sosem ad pénzt", "0 "],
    status: "CREATED",
    tags: [],
    elaboration: "elaboration",
    elaborationImage: null,
    exerciseImage:
      "https://i.kym-cdn.com/entries/icons/facebook/000/021/464/14608107_1180665285312703_1558693314_n.jpg",
    isCompetitionFinal: false,
    solveIdea: "",
    source: "source",
    createdBy: {
      __typename: "User",
      id: "1",
      roles: ["USER"],
      name: "name",
      email: "email",
      exercises: [],
      updatedAt: dayjs().toISOString(),
      createdAt: dayjs().toISOString(),
      userName: "userName",
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  },
};

export const mock2 = {
  data: {
    ...mock.data,
    fakeId: "ab-2837-1234",
  },
  id: "2",
};
export const mock3 = {
  data: {
    ...mock.data,
    fakeId: "ku-2837-1234",
  },
  id: "3",
};

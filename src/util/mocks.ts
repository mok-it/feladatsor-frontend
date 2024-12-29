import dayjs from "dayjs";
import { ExerciseCardData } from "./types";

export const mock: ExerciseCardData = {
  id: "1",
  data: {
    __typename: "Exercise",
    id: "24-0123-4567",
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
    description:
      "Bomátakertben járt Matusz a cigányokkal. Matusz a cigányoknak adott egy kis pénzt, hogy ne bántsák. A cigányok megkérdezték, hogy mennyi pénzt adott nekik. Matusz azt mondta, hogy 10 forintot. A cigányok azt mondták, hogy 10 forintot adtál nekünk, de 10 forintot adtál a cigányoknak is. Matusz azt mondta, hogy 10 forintot adott nekik. Mennyi pénzt adott nekik Matusz?",
    solution: "solution",
    comments: [],
    solutionOptions: ["10", "69", "matusz sosem ad pénzt", "0 "],
    status: "CREATED",
    tags: [],
    exerciseImage: {
      __typename: "Image",
      id: "1",
      url: "https://i.kym-cdn.com/entries/icons/facebook/000/021/464/14608107_1180665285312703_1558693314_n.jpg",
    },
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
    id: "ab-2837-1234",
    description:
      "Dr. Balogh Tamás és Perjési Gábor együtt pisálnak a Pisa-patakba. Tamás 4 km/h-val, Gábor pedig a jobb kezével. Matusz Imre viszont ezt nem akarta annyiban hagyni, ezért ő is csatlakozott hozzájuk. Matusz 3 km/h-val, de a bal kezével. Melyikük ér hamarabb a patakhoz?",
    helpingQuestions: [
      "Mit ivott Dr. Balogh Tamás aznap este?",
      "Melyikőjük a legnagyobb fasz?",
    ],
    solutionOptions: [
      "Dr. Balogh Tamás",
      "Perjési Gábor",
      "Matusz Imre",
      "Ezekből az adatokból nem lehet megmondani.",
    ],
    exerciseImage:
      "https://osztalykirandulas.hu/wp-content/uploads/2023/12/be1n.jpg",
  },
  id: "2",
};
export const mock3 = {
  data: {
    ...mock.data,
    id: "ku-2837-1234",
  },
  id: "3",
};

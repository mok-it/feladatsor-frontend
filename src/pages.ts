import { ProfilePage } from "@/pages/ProfilePage.tsx";
import { ExerciseSheets } from "@/pages/exerciseSheets/ExerciseSheets.tsx";
import { FC } from "react";
import { IconType } from "react-icons";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import {
  MdDashboard,
  MdOutlineCheckCircle,
  MdOutlineEdit,
  MdOutlineNewLabel,
} from "react-icons/md";
import { AdminPage } from "./pages/Admin.tsx";
import { ExerciseCheckPage } from "./pages/ExerciseCheck/ExerciseCheckPage.tsx";
import { ExerciseListPage } from "./pages/ExerciseListPage/ExerciseListPage.tsx";
import { HomePage } from "./pages/HomePage";
import { TagsPage } from "./pages/TagsPage.tsx";
import { CreateExercise } from "./pages/createExercise/CreateExercise.tsx";

interface Page {
  name: string;
  path: string;
  component: (() => JSX.Element) | FC;
  icon: IconType;
}

export const pages: Page[] = [
  {
    name: "Kezdőlap",
    path: "/",
    component: HomePage,
    icon: HiOutlineHome,
  },
  {
    name: "Beküldés",
    path: "/exercise",
    component: CreateExercise,
    icon: MdOutlineEdit,
  },
  {
    name: "Keresés",
    path: "/list-exercises",
    component: ExerciseListPage,
    icon: IoSearch,
  },
  {
    name: "Ellenőrzés",
    path: "/check-exercise",
    component: ExerciseCheckPage,
    icon: MdOutlineCheckCircle,
  },
  {
    name: "Profil",
    path: "/profile",
    component: ProfilePage,
    icon: FaRegUser,
  },
  {
    name: "Feladatsor",
    path: "/exercise-compose",
    component: ExerciseSheets,
    icon: MdDashboard,
  },
  {
    name: "Admin",
    path: "/admin",
    component: AdminPage,
    icon: FaUsers,
  },
  {
    name: "Cimkék",
    path: "/tags",
    component: TagsPage,
    icon: MdOutlineNewLabel,
  },
];

import { FC } from "react";
import { IconType } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { IoNewspaperOutline, IoSearch } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import Compose from "./pages/Compose.tsx";
import { ExerciseListPage } from "./pages/ExerciseListPage";
import { HomePage } from "./pages/HomePage";
import { CreateExercise } from "./pages/createExercise/CreateExercise.tsx";
import { ProfilePage } from "@/pages/ProfilePage.tsx";

interface Page {
  name: string;
  path: string;
  component: (() => JSX.Element) | FC;
  icon: IconType;
}

export const pages: Page[] = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
    icon: HiOutlineHome,
  },
  {
    name: "Feladat beküldés",
    path: "/exercise",
    component: CreateExercise,
    icon: IoNewspaperOutline,
  },
  {
    name: "Feladatok",
    path: "/list-exercises",
    component: ExerciseListPage,
    icon: IoSearch,
  },
  {
    name: "Profil",
    path: "/profile",
    component: ProfilePage,
    icon: FaRegUser,
  },
  {
    name: "Feladat ellenőzés",
    path: "/check-exercise",
    component: HomePage,
    icon: FaPencil,
  },
  {
    name: "Feladatsor",
    path: "/exercise-compose",
    component: Compose,
    icon: MdDashboard,
  },
];

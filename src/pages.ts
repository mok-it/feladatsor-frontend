import { HiOutlineHome } from "react-icons/hi";
import { IconType } from "react-icons";
import { HomePage } from "./pages/HomePage";
import { CreateExercise } from "./pages/CreateExercise";
import { IoNewspaperOutline, IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface Page {
  name: string;
  path: string;
  component: () => JSX.Element;
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
    path: "/exercises",
    component: HomePage,
    icon: IoSearch,
  },
  {
    name: "Profil",
    path: "/profile",
    component: HomePage,
    icon: FaRegUser,
  },
  {
    name: "Feladat ellenőzés",
    path: "/check-exercise",
    component: HomePage,
    icon: FaPencil,
  },
];

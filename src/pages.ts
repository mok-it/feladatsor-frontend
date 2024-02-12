import { HiOutlineHome } from "react-icons/hi";
import { IconType } from "react-icons";
import { HomePage } from "./pages/HomePage";
import { CreateExercise } from "./pages/CreateExercise";
import { IoNewspaperOutline } from "react-icons/io5";

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
];

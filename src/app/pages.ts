import {HiOutlineHome} from "react-icons/hi";
import {IconType} from "react-icons";
import {HomePage} from "./pages/home";

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
];

import { ProfilePage } from "@/pages/ProfilePage.tsx";
import { ExerciseSheets } from "@/pages/exerciseSheets/ExerciseSheets.tsx";
import { FC } from "react";
import { IconType } from "react-icons";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import {
  MdBugReport,
  MdDashboard,
  MdOutlineCheckCircle,
  MdOutlineEdit,
  MdOutlineNewLabel,
} from "react-icons/md";
import { AdminPage } from "./pages/AdminPage";
import { BugReport } from "./pages/BugReport.tsx";
import { ExerciseCheckPage } from "./pages/ExerciseCheck/ExerciseCheckPage.tsx";
import { ExerciseListPage } from "./pages/ExerciseListPage/ExerciseListPage.tsx";
import { HomePage } from "./pages/HomePage";
import { TagsPage } from "./pages/TagsPage.tsx";
import { CreateExercise } from "./pages/createExercise/CreateExercise.tsx";
import { Role } from "@/generated/graphql";

interface Page {
  name: string;
  path: string;
  component: (() => JSX.Element) | FC;
  icon: IconType;
  /**
   * Required roles to access this page
   * If empty or undefined, page is accessible to all authenticated users
   */
  requiredRoles?: Role[];
  /**
   * Whether to require ALL roles instead of just one
   * @default false
   */
  requireAllRoles?: boolean;
}

export const pages: Page[] = [
  {
    name: "Kezdőlap",
    path: "/",
    component: HomePage,
    icon: HiOutlineHome,
    // Home page accessible to all authenticated users
  },
  {
    name: "Beküldés",
    path: "/exercise",
    component: CreateExercise,
    icon: MdOutlineEdit,
    requiredRoles: ["USER"], // USER role required to create exercises
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
    requiredRoles: ["CHECK_EXERCISE"], // CHECK_EXERCISE role required
  },
  {
    name: "Profil",
    path: "/profile",
    component: ProfilePage,
    icon: FaRegUser,
    // Profile page accessible to all authenticated users
  },
  {
    name: "Feladatsor",
    path: "/exercise-compose",
    component: ExerciseSheets,
    icon: MdDashboard,
    requiredRoles: ["EXERCISE_SHEET"], // EXERCISE_SHEET role required
  },
  {
    name: "Hibabejelentés",
    path: "/bug-report",
    component: BugReport,
    icon: MdBugReport,
    // Bug report accessible to all authenticated users
  },
  {
    name: "Admin",
    path: "/admin",
    component: AdminPage,
    icon: FaUsers,
    requiredRoles: ["ADMIN"], // ADMIN role required
  },
  {
    name: "Cimkék",
    path: "/tags",
    component: TagsPage,
    icon: MdOutlineNewLabel,
    // Tags page accessible to all authenticated users
  },
];

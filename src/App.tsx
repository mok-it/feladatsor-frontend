import ComposePage from "@/pages/compose/ComposePage.tsx";
import Login from "@/pages/Login.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { pages } from "./pages";
import ExerciseDetails from "./pages/ExerciseDetails";
import { userAtom } from "./util/atoms";
import { Page404 } from "@/components/404.tsx";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_GRAPHQL_ENDPOINT, { method: "HEAD" }).catch(
      () => {},
    );
  }, []);

  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        setUser({ isLoggedIn: false, user: null });
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [setUser, user]);

  if (!user) return null;

  const isAuthenticated = user.isLoggedIn;

  if (!isAuthenticated) {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          {pages.map((page) => (
            <Route
              key={page.name}
              path={page.path}
              element={
                page.requiredRoles && page.requiredRoles.length > 0 ? (
                  <ProtectedRoute
                    roles={page.requiredRoles}
                    requireAll={page.requireAllRoles}
                  >
                    <page.component />
                  </ProtectedRoute>
                ) : (
                  <page.component />
                )
              }
            />
          ))}
          <Route path={"/exercise/:id"} element={<ExerciseDetails />} />
          <Route
            path={"/exercise-compose/:id"}
            element={
              <ProtectedRoute roles={["EXERCISE_SHEET"]}>
                <ComposePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

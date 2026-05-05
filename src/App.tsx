import { Page404 } from "@/components/404.tsx";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ExerciseSheetPage } from "@/pages/exerciseSheets/ExerciseSheetPage";
import Login from "@/pages/Login.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { pages } from "./pages";
import { useAuth } from "./pages/AuthContext";
import ExerciseDetails from "./pages/ExerciseDetails";

function App() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_GRAPHQL_ENDPOINT, { method: "HEAD" }).catch(
      () => {},
    );
  }, []);

  if (isLoggedIn === null) return null;

  if (isLoggedIn === false) {
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
                <ExerciseSheetPage />
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

import { useAtom } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { pages } from "./pages";
import ExerciseDetails from "./pages/ExerciseDetails";
import { userAtom } from "./util/atoms";
import Login from "@/pages/Login.tsx";

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        setUser({ isLoggedIn: false, user: null });
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [setUser, user]);

  if (!user) {
    return null;
  }
  if (!user.isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          {pages.map((page) => (
            <Route
              key={page.name}
              path={page.path}
              element={<page.component />}
            />
          ))}
          <Route path={"/exercise/:fakeId"} element={<ExerciseDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

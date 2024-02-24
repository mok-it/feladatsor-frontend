import { useAtomValue } from "jotai";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { pages } from "./pages";
import Login from "./pages/Login";
import { userAtom } from "./util/atoms";
import "./App.css";

function App() {
  const user = useAtomValue(userAtom);

  if (!user) {
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

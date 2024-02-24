import { useAtomValue } from "jotai";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { pages } from "./pages";
import Login from "./pages/Login";
import { ThemeProvider } from "./theme";
import { userAtom } from "./util/atoms";

function App() {

  const user = useAtomValue(userAtom);

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;

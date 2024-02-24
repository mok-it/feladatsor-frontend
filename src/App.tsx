import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { pages } from "./pages";
import { ThemeProvider } from "./theme";

function App() {
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

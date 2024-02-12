import { Box, Stack } from "@mui/material";
import React from "react";
import ThemeProvider from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pages } from "./pages";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <Stack direction="row">
          <Sidebar />
          <Box p={4} m={2} width="100%">
            <Routes>
              {pages.map((page) => (
                <Route
                  key={page.name}
                  path={page.path}
                  element={<page.component />}
                />
              ))}
            </Routes>
          </Box>
        </Stack>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

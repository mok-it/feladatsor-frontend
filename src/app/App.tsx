import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { WithSidebar } from "@/components/withSidebard";
import "./global.css";
import { pages } from "./pages";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <BrowserRouter basename="/">
      <WithSidebar
        sidebarContent={SidebarContent}
        mobileDashboardHeader={CustomHeader}
      >
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.name}
              path={page.path}
              element={<page.component />}
            />
          ))}
        </Routes>
      </WithSidebar>
    </BrowserRouter>
  );
}

export default App;

const CustomHeader = () => {
  return (
    <div className="flex px-4">
      <span className="text-2xl font-extrabold">FeBe</span>
    </div>
  );
};

const SidebarContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CustomHeader />
      <div className="mt-6 d-flex">
        {pages.map((item) => (
          <Button className="flex-grow" onClick={() => navigate(item.path)}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

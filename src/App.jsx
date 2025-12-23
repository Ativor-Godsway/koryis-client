import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <main>
      <div className="">
        <ScrollToTop />
        <Outlet />
      </div>
    </main>
  );
}

export default App;

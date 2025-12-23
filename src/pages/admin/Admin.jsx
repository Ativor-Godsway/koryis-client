import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function Admin() {
  return (
    <div className="h-screen flex bg-neutral-100">
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 p-1 py-14 md:p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

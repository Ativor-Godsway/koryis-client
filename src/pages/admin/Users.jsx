import { useState } from "react";
import UserTable from "./components/UserTable";

export default function Users() {
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(""); // RESET SEARCH when switching tabs
  };

  return (
    <div className="p-2 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Users Management
      </h1>

      <div className=" flex flex-col-reverse md:flex-row justify-end md:justify-between md:items-center items-end  border-b mb-6">
        {/* Tabs */}
        <div className="flex gap-4 pb-2 ">
          {["students", "parents", "teachers", "schools"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-2 px-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search by ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <UserTable type={activeTab} searchTerm={searchTerm} />
    </div>
  );
}

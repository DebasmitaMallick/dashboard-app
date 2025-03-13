import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/dashboard";
import RightSection from "../components/right-section";

const Home = () => {
  return (
    <main className="flex gap-4 bg-[#e8e4ec] px-6 py-5 rounded-md">
      <div className="w-1/4">
        <Navbar />
      </div>

      <div className="w-full">
        <Dashboard />
      </div>

      <div className="w-[30%]">
        <RightSection />
      </div>
    </main>
  );
};

export default Home;

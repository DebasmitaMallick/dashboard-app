import React, { useState, useEffect } from "react";
import InfoCards from "./components/info-cards";
import ComparisonChart from "./components/comparison-chart/index.jsx";
import CustomButton from "../CustomButton.jsx";
import TopProducts from "./components/top-products/index.jsx";
import axios from "axios";

const Dashboard = () => {
  const [year, setYear] = useState("lastYear"); // "lastYear" or "currentYear"
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard data from the API
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dashboard-cards?period=${year}`);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fetch data on year change
  useEffect(() => {
    fetchDashboardData();
  }, [year]);

  // Handle year change from dropdown
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div id="dashboard" className="bg-white rounded-md px-5 flex flex-col justify-between h-full w-full">
      <div id="dashboard-header" className="py-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-2.5 text-stone-600">Dashboard</h2>

        {/* Year Dropdown */}
        <div className="flex gap-1.5 items-center font-semibold text-stone-600">
          <p>Compared to</p>
          <CustomButton
            wrapper={"select"}
            name="compared-to"
            id="compared-to"
            className="rounded-3xl px-3 py-2.5 border-2 border-stone-300 cursor-pointer decoration-0"
            onChange={handleYearChange}
            value={year}
          >
            <option value="lastYear">Last year</option>
            <option value="currentYear">Current year</option>
          </CustomButton>
        </div>
      </div>

      {/* Render InfoCards with fetched data */}
      {dashboardData && <InfoCards data={dashboardData} />}

      <ComparisonChart year={year} />
      <TopProducts />
    </div>
  );
};

export default Dashboard;

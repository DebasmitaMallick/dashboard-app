import React, { useEffect, useState } from "react";
import CustomButton from "../../../CustomButton";
import Chart from "./components/Chart";
import axios from "axios";

const MONTHS = [1, 2, 3, 4, 5, 6];

const ComparisonChart = ({ year }) => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(6);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comparison");
      const formattedData = response.data.map((item) => ({
        name: item.month,
        lastYear: item.last_year,
        thisYear: item.this_year,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle dropdown change to filter months
  const handleMonthChange = (event) => {
    setSelectedMonths(parseInt(event.target.value, 10));
  };

  // Update chart data based on selected months
  useEffect(() => {
    const slicedData = chartData.slice(-selectedMonths);
    // Show both years but highlight the selected year
    const updatedData = slicedData.map((item) => ({
      name: item.name,
      lastYear: year === "last" ? item.lastYear : null,
      thisYear: year === "current" ? item.thisYear : null,
      showLastYear: item.lastYear,
      showThisYear: item.thisYear,
    }));
    setFilteredData(updatedData);
  }, [chartData, year, selectedMonths]);

  return (
    <div id="comparison-chart" className="py-12 w-full h-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-stone-600">Comparison</h2>

        {/* Month Dropdown */}
        <CustomButton
          wrapper={"select"}
          name="compared-to"
          id="compared-to"
          onChange={handleMonthChange}
          value={selectedMonths}
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month} {month > 1 ? "months" : "month"}
            </option>
          ))}
        </CustomButton>
      </div>

      {/* Chart with both years */}
      <Chart data={filteredData} year={year} />
    </div>
  );
};

export default ComparisonChart;

import React, { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const CustomersByDevice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [growth, setGrowth] = useState({ webSales: 0, offlineSales: 0 });

  // Fetch sales data from the backend
  const fetchSalesData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales");

      // Format and sort data by date
      const formattedData = response.data
        .map((item) => ({
          name: item.date,
          webSales: item.web_sales,
          offlineSales: item.offline_sales,
        }))
        .sort((a, b) => new Date(a.name) - new Date(b.name));

      setData(formattedData);
      setLoading(false);

      // Calculate growth percentage
      calculateGrowth(formattedData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  // Calculate growth between first and last entries
  const calculateGrowth = (data) => {
    if (data.length < 2) return;

    const first = data[0];
    const last = data[data.length - 1];

    const webSalesGrowth =
      ((last.webSales - first.webSales) / first.webSales) * 100;
    const offlineSalesGrowth =
      ((last.offlineSales - first.offlineSales) / first.offlineSales) * 100;

    setGrowth({
      webSales: webSalesGrowth.toFixed(1),
      offlineSales: offlineSalesGrowth.toFixed(1),
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Customers by device</h2>

      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <>
          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              {/* Horizontal Grid */}
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              {/* Y-axis (Visible without "-" axis line) */}
              <YAxis
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />

              {/* Tooltip */}
              <Tooltip formatter={(value) => value.toLocaleString()} />

              {/* Lines */}
              <Line
                type="monotone"
                dataKey="webSales"
                stroke="#0068f7"
                strokeWidth={2}
                dot={false}
                name="Web Sales"
              />
              <Line
                type="monotone"
                dataKey="offlineSales"
                stroke="#b1effe"
                strokeWidth={2}
                dot={false}
                name="Offline Sales"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Legend and Growth */}
          <div id="legends" className="flex justify-center gap-5">
            <div className="flex flex-col justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#0068f7] inline-block"></span>
                <span>Web sales</span>
              </div>
              <span className="font-semibold">{growth.webSales}%</span>
            </div>

            <div className="flex flex-col justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#b1effe] inline-block"></span>
                <span>Offline sales</span>
              </div>
              <span className="font-semibold">{growth.offlineSales}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomersByDevice;

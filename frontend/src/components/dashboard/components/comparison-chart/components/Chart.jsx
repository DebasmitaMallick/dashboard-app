import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, year }) => {

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap={40}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value / 1000}k`} />
        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
        <Legend iconType="square" />

        {/* Last Year - Toggle Colors */}
        <Bar
          dataKey="showLastYear"
          fill={year === "lastYear" ? "#0068f7" : "#b1effe"} // Bold blue if selected, soft blue if not
          name="Last year"
        />

        {/* This Year - Toggle Colors */}
        <Bar
          dataKey="showThisYear"
          fill={year === "lastYear" ? "#b1effe" : "#0068f7"} // Bold blue if selected, soft blue if not
          name="This year"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

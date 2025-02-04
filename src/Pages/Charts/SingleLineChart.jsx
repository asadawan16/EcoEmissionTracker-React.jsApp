import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import apiClient from "../../api";
import "./LineChart.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

const SingleLineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await apiClient.get("/graph/emission-line-chart-data");
        const data = response.data;
        console.log(data);

        // Format the data
        const totalQuantities = data.map((item) => item.totalQuantity || 0);
        const totalEmissions = data.map((item) => item.totalEmissions || 0);

        setChartData({
          labels: totalQuantities, // X-axis: Total Quantity
          datasets: [
            {
              label: "Total Emissions vs Total Quantity",
              data: totalEmissions, // Y-axis: Total Emissions
              borderColor: "#FF5733", // Orange line
              backgroundColor: "rgba(255, 87, 51, 0.2)", // Light orange fill
              fill: true,
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchLineChartData();
  }, []);

  if (!chartData) {
    return <div>Loading Line Chart...</div>;
  }

  return (
    <div className="LineChart">
      <h3>Emissions vs Quantity</h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              type: "linear", // Ensure linear scale for quantities
              title: {
                display: true,
                text: "Total Quantity",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Total Emissions",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SingleLineChart;

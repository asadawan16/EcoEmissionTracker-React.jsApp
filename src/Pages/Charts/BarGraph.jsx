import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import apiClient from "../../api";
import "./BarGraph.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MultiBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await apiClient.get("/graph/emission-line-chart-data");
        const data = response.data;
        console.log(data);

        // Format the data
        const labels = data.map((item) =>
          new Date(item.date).toLocaleString("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
          })
        );
        const totalQuantities = data.map((item) => item.totalQuantity || 0);
        const totalEmissions = data.map((item) => item.totalEmissions || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Quantity",
              data: totalQuantities,
              backgroundColor: "rgba(66, 133, 244, 0.8)", // Blue bars
              borderColor: "#4285F4",
              borderWidth: 1,
            },
            {
              label: "Total Emissions",
              data: totalEmissions,
              backgroundColor: "rgba(234, 67, 53, 0.8)", // Red bars
              borderColor: "#EA4335",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, []);

  if (!chartData) {
    return <div>Loading Bar Chart...</div>;
  }

  return (
    <div className="BarChart">
      <h3>Emission Summary</h3>
      <Bar
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
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Values",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default MultiBarChart;

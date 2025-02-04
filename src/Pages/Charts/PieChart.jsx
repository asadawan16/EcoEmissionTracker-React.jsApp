import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
import apiClient from "../../api";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ darkmode }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const response = await apiClient.get("/graph/emission-pie-chart-data");
      const data = response.data;

      // Map data into labels and datasets
      const labels = data.map((item) => item.category);
      const counts = data.map((item) => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Emission Categories",
            data: counts,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          },
        ],
      });
    };

    fetchPieChartData();
  }, []);

  if (!chartData) {
    return <div>Loading Pie Chart...</div>;
  }

  return (
    <div className={darkmode ? "darkchartMode" : "chart"}>
      <h2>Emission Categories</h2>
      <div className="piechart">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: darkmode ? "#fff" : "#000", // Set legend label color
                },
              },
              tooltip: {
                bodyColor: darkmode ? "#fff" : "#000", // Optional: tooltip text color
                titleColor: darkmode ? "#fff" : "#000", // Optional: tooltip title color
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;

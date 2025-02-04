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

const SingleBarChart = () => {
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
        const totalValues = data.map(
          (item) => (item.totalQuantity || 0) + (item.totalEmissions || 0)
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Combined Emission Data",
              data: totalValues,
              backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal bars
              borderColor: "#4BC0C0",
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
      <h3>Emission Data</h3>
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
                text: "Total Combined Value",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SingleBarChart;

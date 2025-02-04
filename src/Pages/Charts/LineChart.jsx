// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import apiClient from "../../api";
// import "./LineChart.css";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Filler,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineChart = ({ darkmode }) => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchLineChartData = async () => {
//       try {
//         const response = await apiClient.get("/graph/emission-line-chart-data");
//         const data = response.data;

//         // Format the data
//         const labels = data.map((item) =>
//           new Date(item.date).toLocaleString("en-GB", {
//             dateStyle: "short",
//             timeStyle: "short",
//           })
//         );
//         const totalQuantities = data.map((item) => item.totalQuantity || 0);
//         const totalEmissions = data.map((item) => item.totalEmissions || 0);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Total Quantity",
//               data: totalQuantities,
//               borderColor: "#4285F4",
//               backgroundColor: "rgba(66, 133, 244, 0.2)",
//               fill: true,
//               tension: 0.4,
//               borderWidth: 2,
//               yAxisID: "y-axis-quantity", // Link to the Quantity axis
//             },
//             {
//               label: "Total Emissions",
//               data: totalEmissions,
//               borderColor: "#EA4335",
//               backgroundColor: "rgba(234, 67, 53, 0.2)",
//               fill: true,
//               tension: 0.4,
//               borderWidth: 2,
//               yAxisID: "y-axis-emissions", // Link to the Emissions axis
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchLineChartData();
//   }, []);

//   if (!chartData) {
//     return <div>Loading Line Chart...</div>;
//   }

//   return (
//     <div className={darkmode ? "line-chart-dark" : "line-chart"}>
//       <h3>Emission Trends</h3>
//       <Line
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true,
//               position: "top",
//               labels: {
//                 color: darkmode ? "#fff" : "#000", // Change legend label colors
//               },
//             },
//           },
//           scales: {
//             x: {
//               ticks: {
//                 color: darkmode ? "#fff" : "#000", // Change x-axis tick label color
//                 maxRotation: 45,
//                 minRotation: 0,
//               },
//               title: {
//                 display: true,
//                 text: "Date",
//                 color: darkmode ? "#fff" : "#000", // Change x-axis title color
//               },
//             },
//             "y-axis-quantity": {
//               type: "linear",
//               position: "left",
//               ticks: {
//                 color: darkmode ? "#fff" : "#000", // Change y-axis tick label color
//               },
//               title: {
//                 display: true,
//                 text: "Total Quantity",
//                 color: darkmode ? "#fff" : "#000", // Change y-axis title color
//               },
//             },
//             "y-axis-emissions": {
//               type: "linear",
//               position: "right",
//               ticks: {
//                 color: darkmode ? "#fff" : "#000", // Change y-axis tick label color
//               },
//               title: {
//                 display: true,
//                 text: "Total Emissions",
//                 color: darkmode ? "#fff" : "#000", // Change y-axis title color
//               },
//               grid: {
//                 drawOnChartArea: false, // Prevent grid lines from overlapping
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default LineChart;
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

const LineChart = ({ darkmode }) => {
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/graph/emission-categories");
        setCategories(response.data); // Assuming the endpoint returns unique categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await apiClient.get(
          `/graph/emission-line-chart-data?category=${selectedCategory}`
        );
        const data = response.data;

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
              borderColor: "#4285F4",
              backgroundColor: "rgba(66, 133, 244, 0.2)",
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              yAxisID: "y-axis-quantity",
            },
            {
              label: "Total Emissions",
              data: totalEmissions,
              borderColor: "#EA4335",
              backgroundColor: "rgba(234, 67, 53, 0.2)",
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              yAxisID: "y-axis-emissions",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchLineChartData();
  }, [selectedCategory]);

  if (!chartData) {
    return <div>Loading Line Chart...</div>;
  }

  return (
    <div className={darkmode ? "line-chart-dark" : "line-chart"}>
      <h3>Emission Trends</h3>
      <div className="category-select">
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: darkmode ? "#fff" : "#000",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: darkmode ? "#fff" : "#000",
                maxRotation: 45,
                minRotation: 0,
              },
              title: {
                display: true,
                text: "Date",
                color: darkmode ? "#fff" : "#000",
              },
            },
            "y-axis-quantity": {
              type: "linear",
              position: "left",
              ticks: {
                color: darkmode ? "#fff" : "#000",
              },
              title: {
                display: true,
                text: "Total Quantity",
                color: darkmode ? "#fff" : "#000",
              },
            },
            "y-axis-emissions": {
              type: "linear",
              position: "right",
              ticks: {
                color: darkmode ? "#fff" : "#000",
              },
              title: {
                display: true,
                text: "Total Emissions",
                color: darkmode ? "#fff" : "#000",
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;

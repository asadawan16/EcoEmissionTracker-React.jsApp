import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import Header from "../Header/Header";
import GlobalBanner from "../Banner/GlobalBanner";
import LineChart from "../Charts/LineChart";
import Footer from "../Footer/Footer";
import "./EmissionsSummary.css";
import DataTable from "../Admin/DataTable";
import MultiBarChart from "../Charts/BarGraph";
import SingleBarChart from "../Charts/SingleBarGraph";
import SingleLineChart from "../Charts/SingleLineChart";
import useDataFetch from "../Admin/FetchData";
import EmissionSummaryTable from "./SummaryTable";

const EmissionSummary = () => {
  const { data } = useDataFetch("/emission/getEmissionSummary", false);

  // State for active filter
  const [activeFilter, setActiveFilter] = useState({
    key: "date",
    order: "desc",
  });

  // Filter options
  const filterOptions = [
    { label: "Emission Category", key: "emissionCategory" },
    { label: "Date (Oldest First)", key: "date", order: "asc" },
    { label: "Date (Newest First)", key: "date", order: "desc" },
  ];

  console.log(data);

  return (
    <div>
      <Header />
      <GlobalBanner title={"Emission Summary"} />
      {data && data.emissionSummary.length !== 0 ? (
        <div className="summaryContent">
          <div className="summarygraph">
            <LineChart />
            {/* <SingleLineChart />
            <MultiBarChart />
            <SingleBarChart /> */}
          </div>
          <div className="emissionTable">
            <EmissionSummaryTable
              endpoint="/emission/getEmissionSummary"
              darkmode={true}
            />
          </div>
        </div>
      ) : (
        <div className="noData">
          <p>No emission data found.</p>
          <Link to="/calculateemissions" className="calculateButton">
            Calculate Emissions
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EmissionSummary;

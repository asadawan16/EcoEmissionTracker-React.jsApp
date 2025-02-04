import React, { useEffect, useState } from "react";
import "./SummaryTable.css"; // Using the same CSS as DataTable
import useDataFetch from "../Admin/FetchData";

const EmissionSummaryTable = ({ endpoint, darkmode }) => {
  const { data, loading, error, fetchData, pageNumber, setPageNumber } =
    useDataFetch(endpoint, false);

  // States for filtering and sorting
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("option1");
  const [sortOption, setSortOption] = useState("option1");
  const [filteredEmissions, setFilteredEmissions] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when endpoint or page changes
  }, [endpoint, pageNumber]);

  useEffect(() => {
    if (data?.emissionSummary) {
      const emissionsFiltered = data.emissionSummary
        .filter((emission) => {
          const matchesUserId = emission.userId
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase());
          const matchesUserName = emission.userName
            ?.toLowerCase()
            .includes(searchInput.toLowerCase());
          const matchesCategory =
            selectedCategory === "option1" ||
            emission.emissionCategory === selectedCategory;
          return (matchesUserId || matchesUserName) && matchesCategory;
        })
        .sort((a, b) => {
          if (sortOption === "option2") {
            return new Date(a.date) - new Date(b.date); // Earliest to Oldest
          } else if (sortOption === "option3") {
            return new Date(b.date) - new Date(a.date); // Oldest to Earliest
          }
          return 0; // No sorting
        });
      setFilteredEmissions(emissionsFiltered);
    }
  }, [data, searchInput, selectedCategory, sortOption]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="Data-Table">
      <h1>Emission Summary</h1>
      <div className="optionsSection">
        <div className="searchoption">
          <input
            type="text"
            placeholder="Search by ID or "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="filterbyCategory">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="option1">Filter by Category</option>
            {data?.emissionSummary
              ?.map((item) => item.emissionCategory)
              .filter((value, index, self) => self.indexOf(value) === index) // Unique categories
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <div className="sortoption">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="option1">Sort</option>
            <option value="option2">Earliest to Oldest</option>
            <option value="option3">Oldest to Earliest</option>
          </select>
        </div>
      </div>
      <table className="usertable">
        <thead>
          <tr className="tableheader">
            <th>User ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Total Emissions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {filteredEmissions.map((emission) => (
            <tr key={emission.date}>
              <td>{emission.userId}</td>
              <td>{emission.emissionCategory}</td>
              <td>{emission.emissionDescription}</td>
              <td>{emission.quantity}</td>
              <td>{emission.emissionUnit}</td>
              <td>{emission.totalEmissions.toFixed(2)}</td>
              <td>
                {new Date(emission.date).toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page-navigation">
        <button
          disabled={!data || pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <span className="page-info">
          Page {pageNumber} of {data?.totalPages || 1}
        </span>
        <button
          disabled={!data || pageNumber === data.totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmissionSummaryTable;

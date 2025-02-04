import { React, useEffect, useState } from "react";
import "./DataTable.css";
import useDataFetch from "./FetchData";

const DataTable = ({
  title,
  children,
  disableToggle = false,
  toggle,
  endpoint,
  summarytoggle,
  darkmode,
}) => {
  const { data, loading, error, fetchData, pageNumber, setPageNumber } =
    useDataFetch(endpoint, false);

  // States for filtering, sorting, and search
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("option1");
  const [selectedRole, setSelectedRole] = useState("option1");
  const [sortOption, setSortOption] = useState("option1");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredEmissions, setFilteredEmissions] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch new data when dependencies change
  }, [toggle, endpoint, pageNumber]);

  useEffect(() => {
    if (data) {
      // Filtering for `totalUsers`
      if (data.users) {
        const usersFiltered = data.users.filter((user) => {
          const matchesId = user.id
            .toString()
            .toLowerCase()
            .startsWith(searchInput.toLowerCase());
          const matchesUserName = user.userName
            ?.toLowerCase()
            .startsWith(searchInput.toLowerCase());
          const matchesRole =
            selectedRole === "option1" ||
            (selectedRole === "Super Admin" && user.isSuperAdmin) ||
            (selectedRole === "Admin" && user.isAdmin) ||
            (selectedRole === "User" && !user.isSuperAdmin && !user.isAdmin);
          return (matchesId || matchesUserName) && matchesRole;
        });
        setFilteredUsers(usersFiltered);
      }

      // Filtering for `emissionRequest`
      if (data.emissionSummary) {
        const emissionsFiltered = data.emissionSummary
          .filter((emission) => {
            const matchesUserId = emission.userId
              .toString()
              .toLowerCase()
              .startsWith(searchInput.toLowerCase());
            const matchesUserName = emission.userName
              ?.toLowerCase()
              .startsWith(searchInput.toLowerCase());
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

      // Filtering for `queryRequest`
      if (data.messages) {
        const messagesFiltered = data.messages.filter((message) => {
          const matchesId = message.id
            .toString()
            .toLowerCase()
            .startsWith(searchInput.toLowerCase());
          const matchesName = message.name
            ?.toLowerCase()
            .startsWith(searchInput.toLowerCase());
          return matchesId || matchesName;
        });
        setFilteredMessages(messagesFiltered);
      }
    }
  }, [data, searchInput, selectedCategory, selectedRole, sortOption]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="Data-Table" id={darkmode ? "DarkMode" : "LightMode"}>
      <h1>{title}</h1>
      <div className="optionsSection">
        <div className="searchoption">
          <input
            type="text"
            placeholder="Search by ID or Username/Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {disableToggle === false
          ? toggle.emissionRequest &&
            data.emissionSummary && (
              <div className="filterbyCategory">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="option1">Filter by Category</option>
                  {data.emissionSummary
                    .map((item) => item.emissionCategory)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ) // Unique categories
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
            )
          : null}
        {disableToggle === false
          ? toggle.totalUsers &&
            data.users && (
              <div className="filterbyCategory">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="option1">Filter by Role</option>
                  <option value="option1">All</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            )
          : null}
        {!toggle.totalUsers && (
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
        )}
      </div>
      <table className="usertable">
        <thead>
          <tr className="tableheader">{children}</tr>
        </thead>
        <tbody className="tablebody">
          {disableToggle === false
            ? toggle.totalUsers &&
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.id}</td>
                  <td>
                    {user.isSuperAdmin
                      ? "Super Admin"
                      : user.isAdmin
                      ? "Admin"
                      : "User"}
                  </td>
                </tr>
              ))
            : null}

          {disableToggle === false
            ? toggle.queryRequest &&
              filteredMessages.map((message) => (
                <tr key={message.id}>
                  <td>{message.id}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.subject}</td>
                  <td>{message.message}</td>
                  <td>
                    {new Date(message.createdAt).toLocaleString("en-GB", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))
            : null}
          {disableToggle === false
            ? toggle.emissionRequest &&
              filteredEmissions.map((emission) => (
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
              ))
            : null}
          {summarytoggle === true &&
            filteredEmissions.map((emission) => (
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
      {/* <div className="page-navigation">
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
      </div> */}
    </div>
  );
};

export default DataTable;

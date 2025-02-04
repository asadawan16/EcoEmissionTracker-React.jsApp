import { React, useState, useEffect, useContext } from "react";
import "./CalculateEmissions.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api";
const CalculateEmissions = () => {
  // State Management
  const [SelectedEmissionFactor, setSelectedEmissionFactor] = useState(0);
  const [EmissionQuantity, setEmissionQuantity] = useState(0);
  const [TotalEmissions, setTotalEmissions] = useState(0);
  const [EmissionDescription, setEmissionDescription] = useState("");
  const { isloggedin } = useContext(AuthContext); // Check if user is logged in
  const [emissionsData, setEmissionsData] = useState([]);
  const [SelectedUnit, setSelectedUnit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [FilteredData, setFilteredData] = useState([]);
  const [toggledisabled, setToggleDisabled] = useState(false);

  // Method to Get Emission Data from Api
  const fetchEmissionsData = async () => {
    const token = localStorage.getItem("authToken"); // Check token value
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    try {
      const response = await apiClient.get("/emission/factors");
      console.log(response.data);
      setEmissionsData(response.data);
    } catch (error) {
      console.error(
        "Error fetching emissions data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // Method to post/save Emission data
  const HandleSaveEmissions = async (e) => {
    e.preventDefault();
    setToggleDisabled(true);

    // Validate inputs
    if (
      !selectedCategory ||
      !SelectedUnit ||
      !EmissionDescription ||
      !EmissionQuantity ||
      !SelectedEmissionFactor
    ) {
      alert("Please fill all fields before saving.");
      setToggleDisabled(false);
      return;
    }

    try {
      console.log({
        EmissionCategory: selectedCategory,
        EmissionUnit: SelectedUnit,
        EmissionDescription: EmissionDescription,
        EmissionFactor: SelectedEmissionFactor,
        Quantity: EmissionQuantity,
        TotalEmissions: TotalEmissions,
      });

      console.log("Token being sent:", localStorage.getItem("authToken"));

      const response = await apiClient.post(
        "/emission/saveSummary", // Endpoint
        {
          EmissionCategory: selectedCategory,
          EmissionUnit: SelectedUnit,
          EmissionDescription: EmissionDescription,
          EmissionFactor: SelectedEmissionFactor,
          Quantity: EmissionQuantity,
          TotalEmissions: TotalEmissions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      alert("Data Saved Successfully");
      // Reset form fields
      setSelectedCategory("");
      setEmissionQuantity(0);
      setEmissionDescription("");
      setTotalEmissions(0);
      setSelectedUnit("");
      setSelectedEmissionFactor(0);
    } catch (error) {
      console.error(
        "Error saving data:",
        error.response?.data || error.message
      );
      alert("An error occurred while saving data. Please try again.");
    } finally {
      setToggleDisabled(false); //  re-enable the button
    }
  };

  // Calling FetchEmissionData on page reload
  useEffect(() => {
    if (isloggedin) {
      fetchEmissionsData();
      const token = localStorage.getItem("authToken"); // Check token value
      console.log(token);
    } else {
      navigate("/home");
    }
  }, [isloggedin]); // Ensure data fetch only if logged in

  // Filtering Data based on User category selection
  useEffect(() => {
    if (selectedCategory) {
      const filtered = emissionsData.filter(
        (item) => item.emissionCategory === `${selectedCategory}`

      );
      setFilteredData(filtered);
    }
  }, [selectedCategory, emissionsData]);

  //  Function to manage category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Header />
      <div id="CalculateEmissions">
        <div className="container">
          <div className="emissions">
            <div className="emission-category">
              <h1>Calculate Emissions</h1>
              <span>Calculate, Track, and Reduce Your Emissions </span>
              {[
                ...new Set(
                  emissionsData.map((group) => group.emissionCategory)
                ),
              ].map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <form action="" id="emission-form" onSubmit={HandleSaveEmissions}>
              <label htmlFor="Emission-group">Emission Group</label>
              <input
                type="text"
                value={selectedCategory}
                placeholder="select Emission Category"
              />
              <div className="quantity-unit">
                <div className="quantity">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    required
                    value={EmissionQuantity}
                    onChange={(e) => {
                      setEmissionQuantity(parseFloat(e.target.value));
                      setTotalEmissions(
                        parseFloat(e.target.value) * SelectedEmissionFactor
                      );
                    }}
                  />
                </div>
                <div className="unit">
                  <label htmlFor="unit">Unit</label>
                  <div className="unit">
                    <select
                      name="unit"
                      id="unit"
                      value={SelectedUnit}
                      required
                      onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      {[
                        ...new Set(
                          FilteredData.map((data) => data.emissionUnit)
                        ),
                      ].map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <label htmlFor="select emission factor">
                Select Emission Factor
              </label>
              <select
                id="emission-factor"
                onChange={(e) => {
                  const selectedFactor = FilteredData.find(
                    (item) => item.factor === parseFloat(e.target.value)
                  );
                  if (selectedFactor) {
                    setSelectedEmissionFactor(selectedFactor.factor);
                    setEmissionDescription(selectedFactor.emissionDescription);
                    setTotalEmissions(EmissionQuantity * selectedFactor.factor);
                  }
                }}
              >
                {SelectedUnit != null || "" ? (
                  <>
                    <option value="">Select Emission Factor</option>
                    {FilteredData.filter(
                      (data) => data.emissionUnit === SelectedUnit
                    ).map((item) => (
                      <option key={item.id} value={item.factor}>
                        {item.emissionDescription} - {item.emissionUnit} -{item.factor}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>

              <label htmlFor="Emission Factor">CO2 Emission Factor</label>
              <input
                type="number"
                value={parseFloat(SelectedEmissionFactor) || 0}
                readOnly
              />
              <label htmlFor="Total Emissions">Total Emissions</label>
              <input type="number" value={TotalEmissions} readOnly />
              <button
                type="submit"
                disabled={toggledisabled}
                style={
                  toggledisabled ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CalculateEmissions;
import React from "react";
import "./Home-banner.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const Homebanner = () => {
  const { isloggedin } = useContext(AuthContext);

  return (
    <div className="home-banner">
        <div className="container">

      <h1>Eco Emission Tracker </h1>
      <span>Calculate, Track, and Reduce Your Emissions</span>
      <p>
        Easily calculate, track, and reduce your carbon emissions with the
        EcoEmission Tracker app. Input your vehicle details, fuel types, and
        mileage to monitor your impact and make eco-conscious decisions. Take
        control of your emissions and join us in creating a cleaner, greener
        future.
      </p>
      <Link to={isloggedin ? "/calculateemissions" : "/signup"}>{isloggedin? 'Calculate Emissions':'Register'}</Link>
        </div>
    </div>
  );
};

export default Homebanner;

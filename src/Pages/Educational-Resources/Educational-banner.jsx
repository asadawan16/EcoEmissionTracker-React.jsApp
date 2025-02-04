import React from "react";
import './Educational-banner.css';
import shape from '../../assets/edu-res-banner-bg.png'
const Edubanner = () => {
  return (
    <div className="edu-banner">
      <h1>Our Educational Resources Section</h1>
      <p>
        Welcome to our Educational Resources section, where we provide valuable
        information and tools to help you understand and reduce your carbon
        footprint from transportation. Explore the resources below to learn more
        about the environmental impact of transportation and discover ways to
        make more sustainable transportation choices.
      </p>
      <div className="edu-design">
        <img src={shape} alt="" />
      </div>
    </div>
  );
};

export default Edubanner;

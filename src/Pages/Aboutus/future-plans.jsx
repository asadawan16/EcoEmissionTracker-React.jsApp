import React from "react";
import "./future-plans.css";
import image1 from "../../assets/plan-icon-1.png";
import image2 from "../../assets/plan-icon-2.png";
import image3 from "../../assets/plan-icon-3.png";
import image4 from "../../assets/plan-icon-4.png";
const Futureplans = () => {
    const plansData =[
        {id:1 ,img:image1  , title:"Enhanced Emission Tracking" , description:"Expand the app's emission tracking capabilities to include home energy consumption, industrial processes, and agriculture-related emissions."},
        {id:2 ,img:image2  , title:"Comprehensive Emission Reports" , description:"Provide users with comprehensive reports that not only include their transportation-related emissions but also their emissions from other sources."},
        {id:3 ,img:image3  , title:"Partnerships and Collaborations" , description:"Partner with organizations and businesses in the energy, industrial, and agricultural sectors to promote sustainable practices and offer users incentives for reducing their emissions in these areas."},
        {id:4 ,img:image4  , title:"User Engagement" , description:"Engage users through interactive features, such as challenges or goals, to encourage them to reduce their emissions from all sources and track their progress over time."},
    ]
  return (
    <div className="future-plans">
      <div className="container">
        <h2>Our Future Plans</h2>
        <p>
          We are committed to continuously improving our EcoEmission Tracker app
          to provide users with the tracking and reducing their carbon emissions
        </p>
        <ul className="plan-grid"
        >
          {plansData.map((plan) => (
            <li key={plan.id} className="plan"
            style={{
                backgroundColor: plan.id === 1  ? '#FFFAF3' : plan.id==2 ? '#F8FFF2' : plan.id === 3 ? '#F8FBFF' : '#FFFEF2',
                
              }}>
                <img src={plan.img} alt="" />
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Futureplans;

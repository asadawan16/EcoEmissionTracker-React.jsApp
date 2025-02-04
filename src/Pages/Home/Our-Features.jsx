import React from "react";
import "./Our-Features.css";
import icon1 from "../../assets/features-icon-1.png";
import icon2 from "../../assets/features-icon-2.png";
import icon3 from "../../assets/features-icon-3.png";
import icon4 from "../../assets/features-icon-4.png";
const Features = () => {
  const FeatureData = [ 
    { id:1 , image: icon1, title: "Simple Emission  Calculation" , description:'Calculate your carbon footprint effortlessly by inputting your vehicle details, fuel type, and mileage. Gain immediate insights into your environmental impact and take steps towards a greener lifestyle'},
    { id:2 , image: icon2, title: "Personalized Emission Dashboard" , description:'Track your emission progress with a personalized dashboard. Monitor your carbon footprint over time, set reduction goals, and witness the positive changes you are making for the planet.'},
    { id:3 , image: icon3, title: "Educational Resources" , description:'Explore our rich library of educational resources. Learn about eco-friendly transportation options, discover tips for reducing emissions, and become empowered to make environmentally conscious decisions'},
    { id:4 , image: icon4, title: "User-Friendly Interface" , description:'Whether you are a first-time visitor or a seasoned environmental advocate, our user-friendly interface ensures a seamless experience. Log in to access personalized features or register to start your eco-journey today'}
  
  ]
  return (
    <div className="features">
      <h2>Our Features</h2>
      <p className="feature-desc">
        Explore below to discover the core features of our app designed to
        simplify emission calculation, personalize your eco-journey, educate on
        sustainable practices, and ensure a seamless user experience for all.
      </p>
    <ul className="feature-grid">

      {FeatureData.map((feature) => (
        <li key={feature.id} className="feature"
        style={{
          backgroundColor: feature.id === 1 || feature.id === 3 ? '#F8FFF2' : '#FFFAF3'
        }}>
          <img src={feature.image} alt={feature.title} />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </li>
      ))}
      
    </ul>
    </div>
  );
};

export default Features;

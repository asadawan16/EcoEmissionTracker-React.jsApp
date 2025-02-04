import React from "react";
import './Why-choose-us.css'
const Whychooseus = () => {
    const ChooseusData =[
        {id: 1 , title:'Accuracy and Precision' , description:'Our app utilizes advanced algorithms to ensure accurate and precise emission calculations based on your vehicle type, fuel usage, and mileage. You can trust our data to make informed decisions about reducing your carbon footprintWe have a strong expertise in diverse industrial domains.'},
        { id:2 , title: 'Educational Empowerment' ,description:'Gain access to a wealth of educational resources designed to deepen your understanding of carbon emissions and sustainable transportation practices. From informative articles to engaging videos, we empower you to make eco-conscious choices' },
        {id:3 , title: 'Commitment to Sustainability' , description:'We are committed to making a positive impact on the environment. By choosing our app, you are joining a global community dedicated to reducing carbon emissions and preserving our planet for future generation'},
        {id:4 , title: 'Personalized Insights' , description:'We provide personalized insights tailored to your unique transportation habits. Our dashboard offers a comprehensive overview of your emission data, allowing you to set goals and track your progress towards a greener lifestyle'},
        {id:5 , title: 'Intuitive User Experience' , description:'Our user-friendly interface ensures a seamless experience for users of all levels. Whether you are a first-time eco-warrior or a seasoned environmentalist, navigating through our app is easy and straightforward'},
        {id:6 , title: 'Continuous Improvement' , description:'We are constantly evolving and improving our app to better serve your needs. Your feedback is invaluable to us, and we are always listening to ensure that our app remains the best choice for tracking and reducing your carbon footprint'},
    ]
    const getClassName = (id) => {
        if (id === 1 || id === 3) return 'feature bg-color1';
        if (id === 2 || id === 5) return 'feature bg-color2';
        if (id === 4 || id === 6) return 'feature bg-color3';
        return 'feature';
      };      
  return (
    <div className="why-choose-us">
    

      <h2>Why Choose Us</h2>
      <p className="choose-description">
        Choose us for accurate emission calculations tailored to your vehicle,
        personalized tracking dashboards for your eco-journey, and a commitment
        to sustainability with easy-to-use tools for making greener choices
      </p>
      <ul className="Choose-us-grid">
       {ChooseusData.map(({ id, title, description }) =>
       <li key={id} id="benefit"   className={getClassName(id)}>
          <h3>{title}</h3>
          <p>{description}</p>
            </li>
        )}

      </ul>
        </div>
  );
};

export default Whychooseus;

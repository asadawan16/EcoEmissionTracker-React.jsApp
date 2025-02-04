import React from "react";
import "./Our-goals.css";
import image1 from "../../assets/goal-icon-1.png";
import image2 from "../../assets/goal-icon-2.png";
import image3 from "../../assets/goal-icon-3.png";
import image4 from "../../assets/goal-icon-4.png";
const OurGoals = () => {
  const GoalsData = [
    {
      id: 1,
      img: image1,
      title: "Foster Environmental Awareness",
      description:
        "We encourage users to think creatively about their transportation habits and how they can reduce their carbon footprint. By providing personalized emission tracking and analysis, we empower users to make environmentally conscious choices"
    },
    {
      id: 2,
      img: image2,
      title: "Encourage Behavior Change",
      description:
        " Our goal is to motivate users to adopt sustainable transportation habits. By providing personalized feedback and practical tips, we aim to empower users to make greener choices in their daily commute and travel activities."
    },
    {
      id: 3,
      img: image3,
      title: "Educate and Inform",
      description:
        "We aim to educate users about the environmental impact of transportation and the importance of reducing carbon emissions. Through informative articles and videos, we strive to provide users with the knowledge they need to make informed decisions."
        },
    {
      id: 4,
      img: image4,
      title: "Promote Accountability",
      description:
        "Encourage users to take responsibility for their environmental impact. Provide tools for monitoring and setting emission reduction goals. Foster a sense of accountability and empowerment in environmental stewardship."
    },
  ];
  return (
    <div className="our-goals">
      <div className="container">
        <h2>Our Goals</h2>
        <p>
          At EcoEmission Tracker, our goal is to empower individuals to
          understand and reduce their carbon footprint from transportation
          activities. We believe that by providing accessible and comprehensive
          tools, we can help users make informed decisions and contribute to a
          more sustainable environment. Through our app, we aim to:
        </p>
        <ul className="goal-grid">
          {GoalsData.map((goal) => (
            <li key={goal.id} className="goal">
              <img src={goal.img} alt="" />
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurGoals;

import React from "react";
import "./our-vision.css";
import vision from "../../assets/vision.png";
import mission from "../../assets/mission.png";
import valuesimg from "../../assets/values.png";
const OurVision = () => {
  return (
    <div className="our-vision">
      <div className="container">
        <div className="vision">
          <div className="vision-image">
            <img src={vision} alt="" />
          </div>
          <div className="vision-description">
            <h2>OUR VISION</h2>
            <p>
              To create a sustainable future where individuals are empowered to
              make informed transportation choices that reduce carbon emissions
              and mitigate climate change, leading to a cleaner and healthier
              planet for future generations.
            </p>
          </div>
        </div>
        <div className="mission">
          <div className="mission-description">
            <h2>OUR MISSION</h2>
            <p>
              Our mission is to provide a user-friendly platform that enables
              individuals to easily calculate, track, and reduce their carbon
              footprint from transportation activities. We aim to raise
              awareness about the environmental impact of transportation and
              inspire behavior change towards more sustainable transportation
              options.
            </p>
          </div>
          <div className="mission-image">
            <img src={mission} alt="" />
          </div>
        </div>
        <div className="Ourvalues">
          <div className="Ourvalues-image">
            <img src={valuesimg} alt="" />
          </div>
          <div className="Ourvalues-description">
            <h2>OUR VALUES</h2>
            <p>
              Sustainability: We prioritize sustainability in all aspects of our
              app, promoting environmentally conscious transportation choices to
              reduce carbon emissions. Empowerment: We empower individuals to
              take control of their carbon footprint by providing them with the
              tools and knowledge needed to make sustainable transportation
              decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;

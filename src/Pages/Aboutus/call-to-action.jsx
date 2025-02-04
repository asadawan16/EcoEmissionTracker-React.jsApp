import React from "react";
import "./call-to-action.css";
import shape from "../../assets/cta-design.png";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <div className="call-to-action">
      <div className="container">
        <div className="cta-bg">
          <img src={shape} alt="" />
        </div>
        <div className="call">
          <h2>
            <span>Together</span>, let's shape a greener future through
            sustainable transportation choices
          </h2>
          <p>
            Join us on this impactful journey to reduce your carbon footprint
            through informed transportation choices
          </p>
        </div>

        {/* <div className="join-btn">
          <Link>Join Now</Link>
        </div> */}
      </div>
    </div>
  );
};

export default CTA;

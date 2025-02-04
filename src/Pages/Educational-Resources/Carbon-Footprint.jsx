import React from "react";
import "./Carbon-footprint.css";
import blogImage1 from "./../../assets/blog-image-1.png";
import blogImage2 from "./../../assets/blog-image-2.png";
import blogImage3 from "./../../assets/blog-image-3.png";
const CarbonFootprint = () => {
  return (
    <div className="carbon-footprint">
      <div className="container">
        <h2>Understanding Carbon Footprint</h2>
        <div className="blog-grid">
          <div className="blog">
            <div className="blog-img">
              <img src={blogImage1} alt="" />
            </div>
            <div className="blog-description">
              <h3>What is a Carbon Footprint and Why Does It Matter?</h3>
              <p>
                In today's world, the term "carbon footprint" has become
                increasingly prevalent in discussions surrounding environmental
                sustainability and climate change.
              </p>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <img src={blogImage2} alt="" />
            </div>
            <div className="blog-description">
              <h3>Demystifying GHG Emissions: Understanding the Basics</h3>
              <p>
                At its core, GHG emissions refer to the release of greenhouse
                gases into the Earth's atmosphere, contributing to the
                greenhouse effect—a natural phenomenon vital for sustaining life
                on Earth.
              </p>
            </div>
          </div>
          <div className="blog">
            <div className="blog-img">
              <img src={blogImage3} alt="" />
            </div>
            <div className="blog-description">
              <h3>Deciphering Carbon Footprint: A Comprehensive Guide</h3>
              <p>
                In an era dominated by discussions of environmental
                sustainability and climate change, the term "carbon footprint"
                has emerged as a key concept in understanding human impact on
                the planet. But what exactly does it entail, and why is it
                crucial for us to comprehend? Let's embark on a journey to
                decipher the intricacies of carbon footprint, unraveling its
                significance and implications for our world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprint;

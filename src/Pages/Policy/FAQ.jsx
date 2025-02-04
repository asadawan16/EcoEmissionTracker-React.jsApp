import { React, useState } from "react";
import "./FAQ.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const FAQ = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const FAQdata = [
    {
      id: 1,
      Question: "What does the profile management feature allow me to do?",
      Answer:
        "As a registered user, you can update your personal details, change your password, and manage your preferences directly through the profile section.",
    },
    {
      id: 2,
      Question: "How do I input my vehicle details into the app?",
      Answer:
        "To input your vehicle details, simply navigate to the 'Calculate Emissions' section and follow the prompts to enter your vehicle type, fuel type, and mileage!",
    },
    {
      id: 3,
      Question: "Can I track my progress in reducing emissions?",
      Answer:
        "Yes, the app provides an emission summary with historical data and insights, helping you monitor and reduce your carbon footprint over time.",
    },
    {
      id: 4,
      Question: "Is the emission calculation accurate?",
      Answer:
        "The app uses industry-standard emission factors and data to ensure accurate calculations for all sources.",
    },
    {
      id: 5,
      Question: "Can I calculate emissions as a visitor?",
      Answer:
        "No, the emission calculation feature is only available to registered users. Visitors can explore resources to learn more about emissions and sustainability.",
    },

    {
      id: 6,
      Question: "What kind of educational content is available?",
      Answer:
        "The app provides articles, videos, and guides on climate change, carbon emissions, and actionable steps to reduce your environmental footprint.",
    },
  ];

  const handleToggle = (id) => {
    setExpandedFAQ((prev) => (prev === id ? null : id)); // Toggle the FAQ
  };
  return (
    <>
      <Header />
      <div className="faq">
        <div className="container">
          <h1>Frequently asked questions</h1>
          <span>We're happy to answer your questions</span>

          <ul className="faq-grid">
            {FAQdata.map((item) => (
              <li className="faq" key={item.id}>
                <div className="faq-question">
                  <h2>{item.Question}</h2>
                  <button onClick={() => handleToggle(item.id)}>
                    {expandedFAQ === item.id ? "-" : "+"}
                  </button>
                </div>
                <p
                  className={`faq-answer ${
                    expandedFAQ === item.id ? "expand" : "collapse"
                  }`}
                  onTransitionEnd={() => {
                    if (expandedFAQ !== item.id) setExpandedFAQ(null);
                  }}
                >
                  {item.Answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;

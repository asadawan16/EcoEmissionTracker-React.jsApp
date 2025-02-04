import React from "react";
import "./privacy-policy.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const Privacypolicy = () => {
  return (<>
        <Header/>
    <div className="privacy-policy">
      <div className="container">
        <h1>Our Privacy Policy</h1>
    
        <p>
          Protecting your privacy is paramount to us at EcoEmission Tracker. We
          are dedicated to respecting your privacy regarding any information we
          may collect from you. This policy outlines how we collect, use,
          protect, and share your personal information across our app, website,
          and affiliated platforms.
        </p>
        <p>
          We collect personal information only when it is necessary to provide
          you with our services. This may include your name, email address,
          location, and other relevant details. We do so with your consent and
          in a manner that is fair and transparent. We will always inform you
          why we are collecting your information and how it will be used.
        </p>
        <p>
          We retain collected information for as long as necessary to provide
          you with our services and fulfill any legal or regulatory obligations.
          We take commercially acceptable measures to protect your data from
          loss, theft, unauthorized access, disclosure, copying, use, or
          modification.
        </p>
        <p>
          We do not share your personally identifying information publicly or
          with third parties, except when required to by law. Our website and
          app may contain links to external sites that are not operated by us.
          We cannot be held responsible for the content and practices of these
          sites and recommend reviewing their privacy policies.
        </p>
        <p>
          You are free to refuse our request for your personal information, but
          this may impact our ability to provide you with certain services. Your
          continued use of our app and website constitutes acceptance of our
          privacy practices. If you have any questions about how we handle your
          data or our privacy policy, please contact us.
        </p>
        <p>
          This policy is effective as of 9 April 2024. We reserve the right to
          update or change our privacy policy at any time. Any changes will be
          posted on this page. Your use of our services following any such
          changes constitutes acceptance of the revised policy.
        </p>
        <p>This policy is effective as of 9 April 2024.</p>
      </div>
    </div>
        <Footer/>
  </>
  );
};

export default Privacypolicy;

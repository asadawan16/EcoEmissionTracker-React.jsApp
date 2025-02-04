import React from "react";
import "./Cookie-policy.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const Cookiepolicy = () => {
  return (
    <>
      <Header />
      <div className="cookie-policy">
        <div className="container">
          <h1>Our website uses cookies</h1>
          <p>
            our website uses cookies to enhance your browsing experience and
            provide personalized content. Cookies are small text files that are
            stored on your device to help us improve our website and services.
            By continuing to use our website, you consent to the use of cookies
            as described in our Privacy Policy.
          </p>
          <p>
            Cookies allow us to collect information about your browsing
            behavior, preferences, and interactions with our website. This
            information helps us analyze traffic patterns, identify popular
            content, and improve the overall user experience. We may also use
            cookies to track advertising campaigns and measure their
            effectiveness.
          </p>
          <p>
            You have the option to disable cookies in your browser settings, but
            please note that this may affect the functionality of our website.
            By accepting cookies, you are helping us provide you with a better,
            more personalized experience.
          </p>
          <p>
            For more information about how we use cookies and how you can manage
            your cookie preferences, please refer to our Privacy Policy. If you
            have any questions or concerns about our use of cookies, please
            contact us.
          </p>
          <p>
            This website uses cookies to improve user experience. By using our
            website you consent to all cookies in accordance with our Cookie
            Policy.
          </p>
          <p>
            By continuing, we assume your permission to deploy cookies as
            detailed in our Privacy Policy.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cookiepolicy;

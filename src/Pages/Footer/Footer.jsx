import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import logo from "../../assets/logo.png";

const Footer = () => {
  const [newslettermail, setnewslettermail] = useState("");
  return (
    <footer>
      <ul className="social">
        <div className="logo">
          <img src={logo} alt="" />
          <h2>Eco Emission Tracker</h2>
        </div>
        <li className="address">
          <Link>
            <CiLocationOn className="footer-icon" />4 Khayaban-e-Johar,H 9/4
            H-9, Islamabad, Islamabad Capital Territory 44000
          </Link>
        </li>
        <li>
          <Link>
            <MdOutlineMail className="footer-icon" />
            ecotracker@gmail.com
          </Link>
        </li>
        <li>
          <Link>
            <BiPhoneCall className="footer-icon" />
            +92 309-688-3295
          </Link>
        </li>
      </ul>
      <ul>
        <h2>Our Services</h2>
        <li>
          <Link to={"/calculateemissions"}>Emission Calculation</Link>
        </li>
        <li>
          <Link to={"/emissionsummary"}>Emission Summary</Link>
        </li>
        <li>
          <Link to={"/educationalresources"}>Educational Resources</Link>
        </li>
        <li>
          <Link to={"/faq"}>FAQ</Link>
        </li>
      </ul>
      <ul>
        <h2>Quick Links</h2>
        <li>
          <Link to={"/privacypolicy"}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={"/cookiepolicy"}>Additional Links</Link>
        </li>
        <li>
          <Link>Blogs</Link>
        </li>
        <li>
          <Link to={"/contactus"}>Contact us</Link>
        </li>
      </ul>
      <ul className="social">
        <h2>Our Social Media</h2>
        <li>
          <BsFacebook className="footer-icon" />
          <Link>Facebook</Link>
        </li>
        <li>
          <BsTwitterX className="footer-icon" />
          <Link>X</Link>
        </li>
        <li>
          <FaInstagram className="footer-icon" />
          <Link>Instagram</Link>
        </li>
        <li>
          <FaYoutube className="footer-icon" />
          <Link>Youtube</Link>
        </li>
        <li>
          <FaLinkedin className="footer-icon" />
          <Link>Linkedin</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

import { React, useState } from "react";
import axios from "axios";
import "./contact-us-form.css";
import { CiLocationOn } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post('https://localhost:7083/api/contact', {
        name,
        email,
        subject,
        message
      });
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) { 
      console.error("Error sending message:", error);
      alert(error.response.data);
    }
  };

  return (
    <div className="contactus-form">
      <div className="contact-details">
        <h2>Let's talk with us</h2>
        <p>
          Questions, comments, or suggestions? Simply fill in the form and
          we’ll be in touch shortly.
        </p>
        <ul>
          <li>
            <CiLocationOn className="contact-icon" /> 4 Khayaban-e-Johar, H 9/4
            H-9, Islamabad, Islamabad Capital Territory 44000
          </li>
          <li>
            <BiPhoneCall className="contact-icon" />
            +92 34 678 9108 9
          </li>
          <li>
            <MdOutlineMail className="contact-icon" />
            ecotracker@gmail.com
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name*</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Your Email*</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="subject">Subject*</label>
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="message">Your Message*</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;

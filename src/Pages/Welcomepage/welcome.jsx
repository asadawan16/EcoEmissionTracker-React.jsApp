import React, { useContext ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import welcomelogo from '../../assets/welcome.svg';
import './welcome.css';
import { AuthContext } from '../Context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const {isloggedin} =useContext(AuthContext);
  useEffect(()=>{
    if(isloggedin){
      navigate('/home');
    }
  },[isloggedin])
  return (
    <div className='welcome'>
      <div className="animated-svg-container">
        <img src={welcomelogo} alt="Welcome Logo" className="animated-svg" />
      </div>
      <h1>Welcome to Eco Emission Tracker</h1>
      <span>Calculate, Track, and Reduce Your Emissions</span>
      <div className="navigation-btn">
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/home"}>Continue as Visitor</Link>
      </div>
    </div>
  );
}

export default Welcome;

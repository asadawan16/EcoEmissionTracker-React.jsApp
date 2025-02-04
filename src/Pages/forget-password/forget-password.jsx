import {React , useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../forget-password/forgotPassword.css'
import { MdArrowBackIos } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const [Username, setUsername] = useState("");
    const [exist , setexist] = useState(false);
    const [code , setcode] = useState("");  
    const [verified , setverified] = useState(false);
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmpassword, setconfirmpassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const Navigate = useNavigate();
    // Password validation
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setpassword(newPassword);
  
      // Check if the password matches the regex
      if (!passwordRegex.test(newPassword)) {
        setPasswordError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      } else {
        setPasswordError("");
      }};

      // Request for Reseting forgotten Password  to Api
 // Request for Resetting forgotten Password to API
const RequestSubmitHandler = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post("https://localhost:7083/api/passwordrecovery/forgot-password", {
          Email: email,
          Username: Username, 
      });
      
      alert("Email sent successfully");
      setexist(true);
  } catch (error) {
      console.log("Error occurred while sending email user doesn't exist:", error);
      alert("Error occurred while sending email" ,error);
    }
};

    // Code verification Request to Api
    const CodeSubmitHandler= async(e)=> {
      e.preventDefault();
      try {
        const response = await axios.post("https://localhost:7083/api/passwordrecovery/verify-code", {
          Email : email,
          Code :code
        })
        alert("Code verified  successfully");
        setverified(true);
        setexist(false);
      }
      catch(error) {
        console.log("error occured while verifying code", error);
        alert("Unable to verify code type correct code");
      }
    }
    // New Password sending Request to Api
    const handleSetNewPassword = async (e) => {
      e.preventDefault();
      if (password !== confirmpassword) {
        alert("Passwords do not match.");
        return;
      }      
      try{
        const response = await axios.post("https://localhost:7083/api/passwordrecovery/reset-password", {
          Email : email,
          VerificationCode : code,
          NewPassword : password
        });
        console.log(response.data);
        alert("password changed successfully");
        Navigate("/login");
      }
      catch(error) {
        console.log("error occured while setting new password" , error);
        alert("Error occured while setting new password check your password.");
      }

    }
  return(

      <div className='forgot-password-container'>
        <form action="" className='forgot-password-form' >
        <Link to={"/login"} className='backtoLogin'><MdArrowBackIos className='back-arrow' />Back to login</Link>
        {/* Request for password Reset */}
        <h1>{!exist&&!verified ?"Forgot your password?": `${!verified ? "verify" : "Enter Your new Password"}`}</h1>
        <p className='forgot-password-description'>{!exist&& !verified? "Don’t worry, happens to all of us. Enter your email below to recover your password." : `${!verified? "An authentication code has been sent to your email." :"Your previous password has been reseted. Please set a new password for your account."}`}</p>
        <label htmlFor="email">{!exist&&!verified? "Email":`${!verified ? "Enter Code" : "Enter Your New Password"}`}</label>
        {!exist && !verified &&<><input  required type="text" name="email" id="email" placeholder="Enter your Email or Username" value={email} onChange={(e) => {setemail(e.target.value); setUsername(e.target.value)}} />
        <button type="submit" className='submitbtn' onClick={RequestSubmitHandler}>Submit</button> 
          </>}
          {/* Verify Code */}
          {exist && <><input  required type="number" name="code" id="code" placeholder="Enter your code" value={code} onChange={(e) => {setcode(e.target.value); console.log(e.target.value)}} />
          <div className="verify">
          <button type="submit" className='verifybtn' onClick={CodeSubmitHandler}>Verify</button> 
          <button type="submit" className='resendbtn' onClick={RequestSubmitHandler}>Resend Code</button>
          </div>
          <button className='cancelbtn' onClick={() => setexist(false)}>Cancel</button>
          </>}
       
        {/* Set new Password */}
        {verified && <><div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="newpassword"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          {showPassword ? (
            <IoMdEye
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
         <label htmlFor="confirmpassword">Re Enter Password</label>
         <div className="password">
           <input
             type={showPassword ? "text" : "password"}
             name="confirmpassword"
             className="newpassword"
             placeholder="Re-Enter your password"
             value={confirmpassword}
             onChange={(e) => setconfirmpassword(e.target.value)}
           />
           {showPassword ? (
             <IoMdEyeOff
               className="eye-icon"
               onClick={() => setShowPassword(!showPassword)}
             />
           ) : (
             <IoMdEye
               className="eye-icon"
               onClick={() => setShowPassword(!showPassword)}
             />
           )}
         </div>
         <button type="submit" className='submitbtn' onClick={handleSetNewPassword}>Set Password</button>
         </>
       
        }
        <span id='option'>OR</span>
        <Link className='visitorbtn'>Continue as Visitor</Link>
        </form>
  </div>
) 
    
}

export default ForgetPassword;
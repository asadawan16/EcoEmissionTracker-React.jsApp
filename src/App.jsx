import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './Pages/Welcomepage/welcome'
import Signup from './Pages/Login-Signup-page/Signup'
import Login from './Pages/Login-Signup-page/Login'
import ForgetPassword from './Pages/forget-password/forget-password'
import Home from './Pages/Home/Home'
import Aboutus from './Pages/Aboutus/Aboutus'
import Contactus from './Pages/Contactus/Contactus'
import EducationalResource from './Pages/Educational-Resources/Educational-Resource'
import Privacypolicy from './Pages/Policy/Privacy-policy'
import Cookiepolicy from './Pages/Policy/Cookie-policy'
import FAQ from './Pages/Policy/FAQ.jsx'
import CalculateEmissions from './Pages/Emissions/CalculateEmissions.jsx'
import PrivateRoute from './Pages/Context/privateroute.jsx'
import { AuthProvider } from './Pages/Context/AuthContext.jsx'
import UserProfile from './Pages/UserProfile/UserProfile.jsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'
import EmissionSummary from './Pages/Emissions/EmissionSummary.jsx'
import AuthRedirect from './Pages/Context/AuthRedirect.jsx'
import VerifyCode from './Pages/Login-Signup-page/VerifyCode.jsx'
const App = () => {

  
  return (
    <>
    <AuthProvider>

    <Router>

      <Routes>
        <Route  path='/'  element={<AuthRedirect><Welcome/></AuthRedirect>} />
        <Route  path='/signup'  element={<AuthRedirect><Signup/></AuthRedirect>} />
        <Route  path='/login'  element={<AuthRedirect><Login/></AuthRedirect>} />
        <Route  path='/forgotpassword'  element={<ForgetPassword/>} />
        <Route path='/verify-code' element={<AuthRedirect><VerifyCode /></AuthRedirect>} />
        {/* Main Pages */}
        <Route  path='/home'  element={<Home/>} />
        <Route  path='/aboutus'  element={<Aboutus/>} />
        <Route  path='/contactus'  element={<Contactus/>} />
        <Route  path='/educationalresources'  element={<EducationalResource/>} />
        {/* Emission Pages */}
        <Route path='/calculateemissions' element={<PrivateRoute><CalculateEmissions/></PrivateRoute>} />
        <Route path='/emissionsummary' element={<PrivateRoute><EmissionSummary/></PrivateRoute>} />
        {/* Policy Pages */}
        <Route path='/privacypolicy' element={<Privacypolicy/>} />
        <Route path='/cookiepolicy' element={<Cookiepolicy/>} />
        <Route path='/faq' element={<FAQ/>} />
        {/* Profile */}
        <Route path='/userprofile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        {/* Admin */}
        <Route path='/adminportal' element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
      </Routes>
    </Router>

    </AuthProvider>
    </>
  )
}

export default App
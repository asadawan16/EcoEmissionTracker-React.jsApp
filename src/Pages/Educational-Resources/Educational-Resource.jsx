import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Edubanner from './Educational-banner'
import CarbonFootprint from './Carbon-Footprint'
import Latestvideos from './Latest-videos'
const EducationalResource = () => {
  return (
    <div>
        <Header/>
        <Edubanner/>
        <CarbonFootprint/>
        <Latestvideos/>
        <Footer/>
    </div>
  )
}

export default EducationalResource;
import React from 'react'
import Header from '../Header/Header'
import Aboutusbanner from './Aboutus-banner'
import OurVision from './our-vision'
import Futureplans from './future-plans'
import OurGoals from './Our-goals'
import Footer from '../Footer/Footer'
import CTA from './call-to-action'

const Aboutus = () => {
  return (
    <div>
        <Header/>
        <Aboutusbanner/>
        <OurVision/>
        <Futureplans/>
        <OurGoals/>
        <CTA/>
        <Footer/>
    </div>
  )
}

export default Aboutus
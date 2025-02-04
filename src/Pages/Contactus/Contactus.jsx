import React from 'react'
import Header from '../Header/Header'
import GlobalBanner from '../Banner/GlobalBanner'
import Footer from '../Footer/Footer'
import ContactForm from './contact-us-form'
const Contactus = () => {
  return (
    <>
    <Header/>
    <GlobalBanner title={'Contact Us'}/>
    <ContactForm/>
    <Footer/>
    </>
  )
}

export default Contactus
import React from 'react'
import './GlobalBanner.css'
const GlobalBanner = ({title}) => {
  return (
    <div className='Global-banner'>
      <div className="overlay">

        <h1 className='globalbanner-heading'>{title}</h1>
      </div>
    </div>
  )
}

export default GlobalBanner
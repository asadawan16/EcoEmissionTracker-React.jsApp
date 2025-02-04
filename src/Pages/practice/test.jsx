import React from 'react'

const Test = ({title , NAME ,children}) => {
  return (
    <div>
        <h1>{title}</h1>
        <h2>{NAME}</h2>
        <p>{children}</p>
    </div>
  )
}

export default Test
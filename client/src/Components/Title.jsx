import React from 'react'

const Title = (props) => {
  return (
    <div className='mb-6' >
      <h1 className='text-2xl font-semibold'>{props.text1}   <span className='text-primary underline'> {props.text2}</span></h1>
    </div>
  )
}

export default Title

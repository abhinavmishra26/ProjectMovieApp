import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate=useNavigate();
  return (
    <footer className='w-full  mt-40 px-6 lg:px-36 md:px-20 sm:px-10  '>
    <div className='  flex flex-col justify-between  sm:flex-row  sm:gap-10 sm:px-10 border-b border-gray-500  pb-14'>
    <div className='w-96 '>
      <img src={assets.logo} className='mb-8'></img>
      <p className='text-sm text-gray-200'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <div className='flex gap-2 mt-4'>
      <img src={assets.googlePlay} ></img>
      <img src={assets.appStore} ></img>
      </div>
      <div></div>
    </div>
    <div className='w-2/3   lg:w-2/5 lg:px-4  md:gap-10  mt-8 md:mt-0 flex  justify-between    '>
      <div className='flex flex-col '>
      <h2 className='text-md font-semibold mb-5'>Company</h2>
    <a href='#' className='mb-2 text-sm text-gray-200'>Home</a>
    <a href='#' className='mb-2 text-sm text-gray-200 cursor-pointer'>About us</a>
    <a  href='#' className='mb-2 text-sm text-gray-200 cursor-pointer'>Contact us</a>
    <a href='#' className='mb-2 text-sm text-gray-200 cursor-pointer'>Privacy policy</a>
      </div>
      <div>
        <h1 className='text-md font-semibold mb-5'>Get in touch</h1>
        <p className='mb-2 text-sm text-gray-200'>+2-234-567-890</p>
        <p className='mb-2 text-sm text-gray-200'>contact@example.com</p>
      </div>
    </div>
    </div>
    <div className='text-center text-sm text-gray-300 mt-4 mb-4'>
      <p>
       Copyright {new Date().getFullYear()} © Abhinav Mishra. All Right Reserved
      </p>

    </div>
    </footer>
  )
}

export default Footer

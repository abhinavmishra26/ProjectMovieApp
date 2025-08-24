import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, Clock10Icon } from 'lucide-react'
import {useNavigate} from "react-router-dom"
import { useAppContext } from '../context/AppProvider'
import { useState ,useEffect} from 'react'


const HeroSection = () => {
  const{image_base_url}=useAppContext();
  const {shows}=useAppContext();
  const navigate=useNavigate();

  const backgroundImages=[
    "/bg-12.jpg",
    // "/bg-18.png",
    // "/bg-3.jpg",
    // "/bg-14.jpg",

   ];

   const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);


  return (
      <div className='h-screen w-screen max-md:bg-center max-md:bg-cover bg-cover bg-center flex items-center '
      style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
      >
      <div className='w-[420px] md:w-[1080px]  md:left-38 max-md:left-8 relative top-4'>
      <img src={assets.marvelLogo}  className='mb-4'></img>
      <h1 className=' text-5xl md:text-7xl  font-semibold mb-4'><span className='text-4xl '>Forget the hassle of long ticket counters..</span></h1>
      <h1 className='text-6xl mb-6 font-semibold'>Tap to Book.</h1>
      <div className='flex gap-3 font-thin text-sm'>
      <p className='mb-6'>Action | Adventure |Sci-Fi</p>
      <Calendar1Icon className='' />2008
      <Clock10Icon className='text-2xl'/>2h 8m
      </div>
      <p className='w-[700px]'>“Book tickets for the latest blockbusters and timeless classics in just a few seconds. Choose your cinema, pick your seats, and enjoy a seamless movie-going experience — anytime, anywhere.”

</p>
<button className=' flex  justify-center  items-center w-38 bg-red-500 h-10 cursor-pointer hover:bg-red-400 rounded py mt-4' onClick={()=>navigate("/movies")}>Explore Movies
  <ArrowRight className='w-5'/>
</button>
        <button
          className='mt-4 ml-2 text-sm underline text-white'
        >
          Change Background
        </button>
      </div>

      
    </div>
      
  )
}

export  default HeroSection;
import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets'
import { PlayCircleIcon } from 'lucide-react'

const TrailerSection = () => {
    const [currentTrailer,setCurrentTailer]=useState(dummyTrailers[0]);
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'> 
        <p className='text-gray-300 font-medium text-lg max-w-[969px] mx-auto' >Trailer</p>
        <div className='relative mt-6'>
            <BlurCircle top='100px' right='-100px' />
            <ReactPlayer className='mx-auto max-w-full' src={currentTrailer.videoUrl} controls={false} width="960px" height="540px" />   
        </div>
        <div className='flex flex-wrap justify-center gap-8 mt-10 mb-10'>
           {dummyTrailers.map((trialer,index)=>(
            <div key={index} onClick={()=>setCurrentTailer(dummyTrailers[index])} className='relative '>
                <img src={trialer.image} alt='trailer' className='w-40 h-24   rounded-xl  cursor-pointer' ></img>
                <PlayCircleIcon strokeWidth={1.6} className='w-8 h-8 absolute top-2/5 cursor-pointer left-1/2 transform -translate-x-1/2 -translate-y-0.5 font-bold' />
            </div>
           ))}
        </div>
      
    </div>
    
  )
}

export default TrailerSection

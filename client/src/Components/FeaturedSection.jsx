import { ArrowRight } from 'lucide-react'
import React from 'react'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'

import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'


const FeaturedSection = () => {
  const {shows}=useAppContext();
  const navigate=useNavigate();
  return (
    <div className='px-6 relative lg:px-20 xl:px-44 overflow-hidden '>
        <div className='flex items-center justify-between pt-10 pb-10 mt-10 mb-10 px-4'>
          <BlurCircle top="0" right='49px'/>
            <p className='text-gray-300 font-medium text-lg'>Not Showing</p>
            <button className='flex text-sm cursor-pointer '>View All <ArrowRight className='font-thin w-4'/></button>
        </div>
        <div className='flex flex-wrap gap-8 max-sm:justify-center' >
          
          {shows.slice(0,4).map((show)=>{
           return <MovieCard key={show._id} movie={show}/>
          })} 
          
        </div>
        <div className='flex justify-center mb-10'>
        <button onClick={()=>(scrollTo(0,0),navigate("/movies"))} className='w-34 bg-red-500 rounded-md  mt-18 h-10 cursor-pointer hover:bg-red-400'>Show More</button>
        </div>
    </div>
  )
}

export default FeaturedSection

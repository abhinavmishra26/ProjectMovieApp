import React from 'react'

import MovieCard from '../Components/MovieCard'
import BlurCircle from '../Components/BlurCircle'
import { useAppContext } from '../context/AppProvider'
import MovieCardUpcoming from '../Components/MovieCardUpcoming'
const Upcoming = () => {
  const {upcomingShows}=useAppContext();
  console.log(upcomingShows,"jii");
  return (
    upcomingShows.length >0?(
    <div className='w-full   mt-34 lg:px-46  ' >

      <BlurCircle top='200px 'left='50px'/>
      <p className='text-lg mb-5 px-8'>Not Showing</p>
      <div className='   px-28 md:px-0 flex justify-center gap-8  flex-wrap '>
        {upcomingShows.map((movie)=>
        <MovieCardUpcoming key={movie.id} movie={movie}/>
        )}
        <BlurCircle top='680px 'right='50px'/>
      </div>
      
    </div>):(
      <div className='w-full mt-44 px-46 flex justify-center items-center'>
      <h1 className='text-4xl text-gray-400'>Not any Movie Available</h1>
      </div>
    )
  )
}

export default Upcoming
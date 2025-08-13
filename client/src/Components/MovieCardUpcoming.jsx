import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider'


const MovieCardUpcoming = ({movie}) => {
  const {image_base_url}=useAppContext();
    const navigate=useNavigate();
  return (
    <div className='w-66 bg-gray-800 p-3 rounded-2xl'>
      <img className='rounded-lg mb-2 h-50 object-cover cursor-pointer' src={image_base_url + movie.backdrop_path} onClick={()=>{navigate(`/movies/${movie._id}`);scrollTo(0,0)}}></img>
      <p className='mb-2 text-white font-semibold truncate' >{movie.title}</p>
      <div >
      <p className='mb-4 text-sm text-blue-400 font-semibold truncate'>
      Release Date : <span className='font-bold text-cyan-400'>{movie.release_date}</span> 
      </p>
      <div className='flex justify-between mb-2' >
        <p className='flex items-center gap-1'>
            <StarIcon className='w-4 h-4 text-primary fill-primary'></StarIcon>
            <span className='text-gray-400 text-sm'>{movie.vote_average.toFixed(1)}</span>
        </p>
      </div>
      </div>
    </div>
  )
}

export default MovieCardUpcoming
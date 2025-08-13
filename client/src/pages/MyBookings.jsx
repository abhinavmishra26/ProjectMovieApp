import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import BlurCircle from '../Components/BlurCircle';
import timeformate from '../lib/timeFormate';
import { dateFormate } from '../lib/dateFormate';
import { useAppContext } from '../context/AppProvider';


const MyBookings = () => {
 const {axios,user,getToken,image_base_url}=useAppContext();
 const currency=import.meta.env.VITE_CURRENCY;
 const[bookings,setBookings]=useState([]);
 const [isLoading,setLoading]=useState(true);

 const getBookings=async()=>{
  try{
    const {data}=await axios.get("/api/user/bookings",{
      headers:{Authorization:`Bearer ${await getToken()}`}
    })
    console.log("abhinav",data);
    if(data.success){
      setBookings(data.bookings);
      setLoading(false);
    }
  }
  catch(error){
    console.log(error);

  }
 }
 useEffect(()=>{
  if(user){
    getBookings();
  }
 },[user])
  return !isLoading? (
    <div className=' py-30 lg:px-40 lg:py-36 '>
      <BlurCircle top="100px" left='100px'/>
      <BlurCircle bottom='70px' right='500px'></BlurCircle>
      <h1 className='text-xl font-bold px-10 lg:mb-10'>My Bookings</h1>
      <div className='flex flex-col gap-6 lg:w-[780px] p-12 lg:p-0'>
        {bookings.map((book,index)=>(
          <div key={index} className=' h-[450px] p-2 flex flex-col lg:flex-row lg:h-34 lg:px-2  relative  bg-primary/8 border border-primary/30 gap-5 lg:items-center rounded-lg'>
            <img src={image_base_url+book.show.movie.backdrop_path} className=' h-60   lg:w-48 lg:h-30 object-cover rounded-md  '></img>
            <div className='px-2'>
            <h1 className='text-lg lg:mt-4  font-bold'>{book.show.movie.title}</h1>
            <p className='lg:mb-10 text-gray-400 text-sm'>{timeformate(book.show.movie.runtime)}</p>
            <p className='text-sm mb-4 text-gray-400'>{dateFormate(book.show.showDateTime)}</p>
            </div>
            <div className='absolute px-2 bottom-4 lg:right-0 w-60 mr-6 flex flex-col lg:items-end '>
              <div className='flex items-center lg:mb-8 '>
              <h1 className='text-xl mr-4 font-bold'>{currency}{book.amount}</h1>
              {
                !book.isPaid && <button className='w-18 h-8 bg-primary rounded-2xl text-sm cursor-pointer  '>Pay now</button>
              }
              </div>
              <p className='mb-1 text-gray-400 text-sm'>Total Tickets: <span>{book.bookedSeats.length}</span></p>
              <p className='text-sm text-gray-400'>Seat Number : <span>{book.bookedSeats.join(",")}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ):(
    <h1>Loading</h1>
  )
}

export default MyBookings

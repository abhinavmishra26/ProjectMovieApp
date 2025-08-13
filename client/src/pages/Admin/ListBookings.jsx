import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loading from '../../Components/Loading';
import Title from '../../Components/Title';
import { dummyBookingData } from '../../assets/assets';
import { dateFormate } from '../../lib/dateFormate';
import isoTimeFormate from '../../lib/isoTimeFormate';
import timeformate from '../../lib/timeFormate';
import { useAppContext } from '../../context/AppProvider';

const ListBookings = () => {
  const {axios,user,getToken}=useAppContext();
 const currency= import.meta.env.VITE_CURRENCY;

  const [bookings,setBookings]=useState([]);
  const [isLoading,setLoading]=useState(true);

  const getALLBookingsData=async()=>{
    try{
      const {data}=await axios.get("/api/admin/all-bookings",{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      })
      setBookings(data.bookings);
      setLoading(false);

    }
    catch(error){
      console.log(error);

    }
  }

  useEffect(()=>{
    if(user){
      
      getALLBookingsData();
    }

  },[user]);

  return !isLoading?(
       <div className='px-10 py-10'>
      <Title text1="List" text2="Bookings" />
      <div className="overflow-hidden rounded-t-md" >
        <table className='w-4xl'>
          <thead  className='   text-left border-collapse bg-primary/25 font-semibold'>
            <tr >
            
            <th className='p-2 font-medium' >User Name</th>
            <th className='p-2 font-medium'>Movie Name</th>
            <th className='p-2 font-medium'>Show Time</th>
            <th className='p-2 font-medium'>Seats</th>
            <th className='p-2 font-medium'>Amount</th>
            </tr>
            </thead>
           <tbody>
            {bookings.map((booking,index)=>(
              <tr key={index} className={` text-sm bg-primary/8 text-gray-200 even:bg-primary/16 border border-primary/10`}>
                <td className='p-2'>{booking.user.name}</td>
                <td className='p-2'>{booking.show.movie.title}</td>
                <td className='p-2'>{dateFormate(booking.show.showDateTime)}</td>
                <td className='p-2'>{booking.bookedSeats.length}</td>
                <td className='p-2'>{booking.amount}</td>
              </tr>
            ))}
           </tbody>   
          </table>
          </div>
    
    </div>
  ):(
    <Loading/>
  )
}

export default ListBookings

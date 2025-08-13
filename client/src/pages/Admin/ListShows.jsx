import React, { useEffect, useState } from 'react'
import Title from '../../Components/Title'
import { dummyShowsData } from '../../assets/assets';
import { Currency, Table } from 'lucide-react';
import Loading from '../../Components/Loading';
import { dateFormate } from '../../lib/dateFormate';
import { useAppContext } from '../../context/AppProvider';

const ListShows = () => {
  
  const currency=import.meta.env.VITE_CURRENCY;
  const {axios,getToken,user}=useAppContext();
  const [show,setShow]=useState([]);
  const [loading,setLoading]=useState(true);

  const getAllShows=async()=>{ 
    try{
      const {data}=await axios.get("/api/admin/all-shows",{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });
      
        setShow(data.shows);
        setLoading(false);
      
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(user){
    getAllShows();
    }
  },[user])



  return !loading? (
    <div className='px-10 py-10'>
      <Title text1="List" text2="Shows" />
      <div className="overflow-hidden rounded-t-md" >
        <table className='w-4xl' >
          <thead  className='   text-left border-collapse bg-primary/25 font-semibold'>
            <tr >
            
            <th className='p-2 font-medium' >Movie Name</th>
            <th className='p-2 font-medium'>ShowTime</th>
            <th className='p-2 font-medium'>Total Bookings</th>
            <th className='p-2 font-medium'>Earnings</th>
            </tr>

          </thead>
          <tbody>
          {show.map((show,index)=>(

            <tr key={index} className={` text-sm bg-primary/10 text-gray-200 even:bg-primary/20`}>
              
              <td className='p-2'>{show.movie.title}</td>
              <td className='p-2'>{dateFormate(show.showDateTime)} </td>
              <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
              <td className='p-2'>{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
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

export default ListShows

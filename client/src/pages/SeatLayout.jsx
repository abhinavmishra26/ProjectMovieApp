import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../Components/Loading';
import isoTimeFormate from '../lib/isoTimeFormate';
import { ArrowRight, ClockIcon } from 'lucide-react';
import BlurCircle from '../Components/BlurCircle';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppProvider';



const SeatLayout = () => {
  const {axios,user,image_base_url,getToken}=useAppContext();
  const navigate=useNavigate();
  const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

  const {id,date}=useParams();
  const [show,setShow]=useState();
  const [selectedTime,setSelectedTime]=useState(null);
  const [selectedSeats,setSelectedSeats]=useState([]);
  const [occupiedSeats,setOccupiedSeats]=useState([]);

  const getShow=async()=>{
    try{
      const {data}=await axios.get(`/api/show/${id}`,{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });
      if(data.success){
       console.log(data,"h");
       setShow(data);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const renderSeats=(row,count=9)=>(
    <div key={row} className='flex  gap-2 mt-2'>
      <div className='flex flex-wrap   items-center justify-center gap-2'>
        {Array.from({length:count},(_,i)=>{
          const seatId=`${row}${i+1}`;
          return(
            <button onClick={()=>handleSeatClick(seatId)} key={seatId} className={`h-8 text-xs w-8 rounded border  border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"} 
            ${occupiedSeats.includes(seatId) && "opacity-30" } `}>{seatId} </button>
          )
        })}
      </div>
    </div>
  )
  
  const handleSeatClick=(seatId)=>{
    if(!selectedTime){
      return toast("please select time first");
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length>4){
      return toast("You can only select 5 seats");
    }
    if(occupiedSeats.includes(seatId)){
      return toast("Seat is already booked");
    }
    setSelectedSeats(prev=>prev.includes(seatId)? prev.filter(seat=> seat!==seatId):[...prev ,seatId])
  }

 const getOccupiedSeatsData=async()=>{
  try{
    const {data}=await axios.get(`/api/booking/seats/${selectedTime.showId}`)
    if(data.success){
    setOccupiedSeats(data.occupiedSeats);
     console.log(occupiedSeats,"yeh hu main");
    }
    else{
      toast.error(data.message);
    }

  }
  catch(error){
    console.log(error);
  }
 }
  
 const bookTickets=async()=>{
  try{
    console.log("abo");
    if(!user) return toast("please login first");
    if(!selectedSeats || !selectedTime){
      return toast("Select the time and seat")
    }

    const {data}=await axios.post("/api/booking/create",{showId:selectedTime.showId ,selectedSeats},{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });
      if(data.success){
       window.location.href=data.url;
      }
      else{
        toast.error(data.message);
      }

  }
  catch(error){
    console.log(error);

  }
 }

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeatsData();
    } 
  },[selectedTime]);
  
  useEffect(()=>{
    getShow();
  },[]);

 
  return show?(
    <div className='px-10 py-40 md:px-40 md:py-40 flex flex-col md:flex-row '>
        <div className='w-58 h-full md:sticky md:top-40 bg-primary/10 py-7  border rounded-xl border-primary/20'>
          <p className='text-lg mb-5 font-semibold  px-7'>Available Timings</p>
          <div className=''>
             {
              show.dateTime[date].map((timeobj,index)=>(
                <div key={index} onClick={()=>setSelectedTime(timeobj)} className={`mb-3  cursor-pointer h-9 pl-8 w-36   rounded-r-lg flex items-center gap-2 ${selectedTime?.time===timeobj.time? "bg-primary":"hover:bg-primary/30"}`}>
                  <ClockIcon className='w-4'/>
                  <p className='text-sm '>{isoTimeFormate(timeobj.time)}</p>
                  </div>
              )
              )
             }
          </div>
        </div>
     
     <div className='relative flex-1 flex flex-col items-center max-md:mt-16 '>
      <BlurCircle top='-100px' left='-100px'/>
      <BlurCircle bottom='0px' right='0px'/>
      <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
      <img src={assets.screenImage} alt='screen'></img>
      <p className='text-gray-400 text-sm'>SCREEN SIDE</p>
      <div className=' flex flex-col  items-center gap-10 mt-15 '>
        <div className='grid grid-cols-2 md:grid-cols-1  gap-6 md:gap-1 mb-1 '>
           {groupRows[0].map(row=>renderSeats(row))}
        </div>
        
        <div className='grid grid-cols-2 gap-6 '>
        {groupRows.slice(1).map((group,index)=>(
          <div key={index} className='grid gap-1 mb-6'>
            {group.map(row=>renderSeats(row))}
          </div>
        ))}
        </div>
        <button onClick={bookTickets} className='w-60 cursor-pointer text-sm font-semibold h-10 bg-primary flex justify-center items-center rounded-4xl'>Proceed to Checkout
          <ArrowRight></ArrowRight>
        </button>
      </div>
     </div>
    </div>
  ):(
   
    <Loading/>

  )
}

export default SeatLayout




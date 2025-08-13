import React, { useEffect, useState } from 'react'
import { dummyBookingData, dummyShowsData } from '../../assets/assets';
import Loading from '../../Components/Loading';
import Title from '../../Components/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kConverter } from '../../lib/kConverter';
import { useAppContext } from '../../context/AppProvider';
import toast from 'react-hot-toast';

const AddShows = () => {

  const {axios,getToken,user,image_base_url}=useAppContext();
  
  const currency=import.meta.env.VITE_CURRENCY;
  
  const[nowPlayingMovies,setNowPlayingMovie]=useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [dateTimeSelection,setDateTimeSelection]=useState({});
  const [dateTimeInput,setDateTimeInput]=useState("");
  const [showPrice,setShowPrice]=useState("");
  const [addingShow,setAddingShow]=useState(false);

  const fetchNowPlayingMovie=async()=>{
    try{
      const {data}=await axios.get("/api/show/now-playing",{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success){
        setNowPlayingMovie(data.movies)
      }

    }
    catch(error){
      console.error(error.message);
    }
  }
  const handleDateTimeAdd=()=>{
    if(!dateTimeInput) return;
    const [date,time]=dateTimeInput.split("T");
    if(!date || !time) return;

    setDateTimeSelection((prev)=>{
      const times=prev[date] || [];
      if(!times.includes(time)){
        return {...prev,[date]:[...times,time]};
      }
      return prev;
    });
  };

  const handleRemoveTime=(date,time)=>{
    setDateTimeSelection((prev)=>{
      const filteredTimes=prev[date].filter((t)=>t!==time);
      if(filteredTimes.length===0){
        const {[date]: _,...rest}=prev;
        return rest;
      }
      return{
        ...prev,
        [date]:filteredTimes,
      };
    });
  }

  const handleSubmit=async()=>{
    try{
      console.log("i am run");
      setAddingShow(true)
      
      if(!selectedMovie || Object.keys(dateTimeSelection).length===0 || !showPrice){
        return toast("Missing required fields")
      }

      const showsInput=Object.entries(dateTimeSelection).map(([date,time])=>({date,time}));

      const payload={
        movieId:selectedMovie,
        showsInput,
        showPrice:Number(showPrice)
      }

      const {data}=await axios.post("/api/show/add",payload,{headers:{
        Authorization:`Bearer ${await getToken()}`
      }})

      if(data.success){
        toast.success(data.message)
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
      }
      else{
        toast.error(data.message)

      }
    }
    catch(error){
      console.error("Submission error:" ,error);
      toast.error("An error occurred. Please try again.")
    }
    setAddingShow(false)
  }

  useEffect(()=>{
    fetchNowPlayingMovie();
  },[]);



  return nowPlayingMovies.length>0?(
   <div className='px-8 pt-10'>
   <Title text1="Add" text2="Show"/>
   <h1 className='text-lg mt-8'>Now Playing Movies</h1>
   <div  className="w-full max-w-full mb-6 overflow-x-auto pb-4">
   <div className=' flex gap-4 group flex-nowrap  mt-4 w-fit '>
    {nowPlayingMovies.map((item)=>(
      <div key={item.id} className={` h-70  w-40 cursor-pointer relative group-hover:not-hover:opacity-40 hover:-translate-y-1  transition duration-300 `} onClick={()=>setSelectedMovie(item.id)}>
        <div className='   relative  rounded-lg overflow-hidden'>
        <img src={image_base_url+item.poster_path} className='w-full h-60 object-cover  relative rounded-lg'></img>
        <div className='flex w-full   absolute h-8 items-center bottom-0 left-0 bg-black/70'>
          <div className='flex  items-center'>
            <StarIcon className='w-4 h-4 text-primary fill-primary '/>
            <p>{item.vote_average.toFixed(1)}</p>
          </div>
          <p className='ml-8 '>{kConverter(item.vote_count)} Votes</p>
        </div>
        </div>
        {
          selectedMovie===item.id && (
            <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
              <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>

            </div>
          )

        }
        <div className='mt-1'>
        <p className='text-md font-semibold truncate'>{item.title}</p>
        <p className='text-gray-400 text-sm  '>{item.release_date}</p>
        </div>

      </div>
    ))}

    
   </div>
   </div>
   <div>
    <label className='text-sm  font-medium'>Show Price</label>
    <div className='w-68  flex h-12 items-center px-3 border mt-2 border-gray-500 rounded-lg '>
      <p className='text-xl text-gray-400 '>{currency}</p>
      <input min={0} type="number" value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} placeholder='Enter Show Price' className='outline-none ml-2'  ></input>
    </div>
   </div>
   <div className='mt-6'>
    <label className='text-sm font-medium  '>Select Date and Time</label>
    <div className='w-86  flex h-12 mt-2 items-center justify-between px-1 border border-gray-500 rounded-lg pl-2 '>
      <input type='datetime-local' value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} className='outline-none'></input>
      <button onClick={handleDateTimeAdd} className='w-24 h-8 cursor-pointer bg-primary rounded-lg px-1'>Add Time</button>
    </div>
   </div>
   <div className='mt-6 mb-6'>
    {Object.keys(dateTimeSelection).length>0 && (
      <div>
        <h2 className='text-md font-medium'>Selected Date-Time</h2>
        <ul className='mt-2' >
          {Object.entries(dateTimeSelection).map(([date,times])=>(
            <li key={date} className='mt-2'>
              <div className='text-md font-semibold mt-2'>{date}</div>
              <div>
                {times.map((time)=>(
                  <div key={time} className='w-20 h-8 flex items-center justify-between   px-2 border border-primary rounded-sm'>
                    <span>{time}</span>
                    <DeleteIcon onClick={()=>handleRemoveTime(date,time)} width={15} className='text-red-500 cursor-pointer'/>
                    </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        </div>
    )}
   </div>
   <button onClick={handleSubmit} disabled={addingShow} className='w-36 h-10 bg-primary cursor-pointer rounded-sm'>Add Show</button>
   </div>
  ):(
    <Loading/>
  )
}

export default AddShows

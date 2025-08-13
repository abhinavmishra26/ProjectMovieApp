import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import {toast }from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelected = ({dateTime,id}) => {
    const [selected,setSelected]=useState(null);
    const navigate=useNavigate();

    const onBookHandler=()=>{
        if(!selected){
            return toast("Please select a date");
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0);

    }

  return (
    <div id='dateSelect' className='mt-36 px-6 md:px-0'>
        <BlurCircle top="940px" left="70px"/>
      <div  className='  md:h-46  px-8 lg:px-5 py-8 rounded-lg bg-primary/10 border-primary/20 border-2 '>

        <p className='text-lg mb-6 font-bold'>Choose date</p>
        <div className='flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between '>
        <div className='flex items-center  '>
            <ChevronLeftIcon className='mr-6'/>
        
                <span >
                    {Object.keys(dateTime).map((date)=>(
                        <button onClick={()=>setSelected(date)} className={`w-16 h-16  rounded-md cursor-pointer my-2 mx-2 ${selected ===date? "bg-primary text-white":"border border-primary/70"} "`}>
                            <span className='block'>{new Date(date).getDate()}</span>
                            <span>{new Date(date).toLocaleDateString("en-US",{month:"short"})}</span>
                        </button>
                    ))}
                </span>
            <ChevronRightIcon className='ml-6'/>

            
        </div>
        
            <button onClick={onBookHandler} className='w-34 h-10 bg-red-500 text-sm font-semibold rounded-sm'>Book Now</button>
        </div>
      </div>
       <BlurCircle top="1150px" right="50px"/>
    </div>
  )
}

export default DateSelected

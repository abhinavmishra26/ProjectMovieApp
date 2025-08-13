import { ChartLineIcon, CircleDollarSignIcon, icons, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../Components/Loading';
import Title from '../../Components/Title';
import BlurCircle from '../../Components/BlurCircle';
import isoTimeFormate from '../../lib/isoTimeFormate';
import { dateFormate } from '../../lib/dateFormate';
import { useAppContext } from '../../context/AppProvider';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const {axios,getToken,user,image_base_url}=useAppContext();
  const currency=import.meta.env.VITE_CURRENCY

  const [dashboardData,setDashboardData]=useState({
    totalBookings:0,
    totalRevenue:0,
    activeShows:[],
    totalUser:0
  });
  const [loading,setLoading]=useState(true);
  
  const dashboardCards=[
    {title:"Total Bookings",value:dashboardData.totalBookings|| "0",icon:ChartLineIcon},
    {title:"Total Revenue",value: (currency + (dashboardData.totalRevenue ||"0")),icon:CircleDollarSignIcon},
    {title:"Active Shows",value:  dashboardData.activeShows.length|| "0",icon:PlayCircleIcon},
    {title:"Total Users",value:dashboardData.totalUser||"0",icon:UserIcon},
  ]
  const fetchDashboardData=async()=>{
    try{
      const {data}=await axios.get("/api/admin/dashboard",{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      })
      console.log("hupppp",data)
      if(data.success){
        setDashboardData(data.dashboardData)
        setLoading(false)
        console.log("humm",data.dashboardData)
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      toast.error("Error fetching dashboard data",error)

    }
    
  };

  useEffect(()=>{
    if(user){
      fetchDashboardData();
    }
  },[user])

  return !loading?(
    <div className='px-8  py-10 overflow-hidden '>
      <BlurCircle top='70px' left='300px'/>
      <Title text1="Admin" text2="Dashboard" />
      <div className='flex gap-4 mb-10 flex-col md:flex-row' >
        <BlurCircle top='400px' left='200px'/>
        {dashboardCards.map((card,index)=>(
          <div key={index} className='w-54 h-20  bg-primary/10 relative px-3 py-2 rounded-md border border-primary/30'>
            <h2 className='text-sm font-medium mt-1'>{card.title}</h2>
            <p className='absolute bottom-2 text-xl font-semibold px-0' >{card.value}</p>
            <card.icon className='absolute right-3 w-6 h-6 bottom-6 '/>
          </div>
        ))}
         </div>
         <div className=''>
        <h1 className='mb-4 text-xl font-semibold'>Active Shows</h1>
        <div className='flex gap-8 flex-wrap'>
          {dashboardData.activeShows.map((show ,index)=>(
            <div key={index} className='w-58 h-[345px] bg-primary/10 rounded-xl border border-primary/30 ' >
              <img src={image_base_url+show.movie.poster_path} className='w-full h-60 mb-2 object-cover rounded-t-lg ' ></img>
              <div className='px-3' >
              <h1 className='text-md font-semibold mb-2 truncate'>{show.movie.title}</h1>
              <div className='flex justify-between mb-2'>
              <p className='text-lg font-semibold'>{currency} {show.showPrice}</p>
              <div className='flex text-sm items-center gap-1'>
              <StarIcon className='w-4 h-4'/>
              {show.movie.vote_average.toFixed(1)}
              </div>
              </div>
              <p className='text-sm text-gray-400'>{dateFormate(show.showDateTime)}</p>
              </div>
            </div>
            
          ))}
          </div>
        </div>
     
      
    </div>
  ):(
    <div className='flex justify-center'>
    <Loading/>
    </div>
  )
}

export default Dashboard

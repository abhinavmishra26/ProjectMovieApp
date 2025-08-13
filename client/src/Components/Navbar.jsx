import { LogIn, MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppProvider'

const Navbar = () => {
  const {favoriteMovies}=useAppContext();
  const[isOpen,setIsOpen]=useState(false);
  const {user}=useUser();
  const {openSignIn}=useClerk();
  const navigate=useNavigate();
  return (
    <div className='w-screen h-24  fixed top-0 left-0 z-50 flex justify-around items-center'>
     <div>
      <Link to='/'>
      <img src={assets.logo}></img>
      </Link>
     </div>
     <div  className={` max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg x-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-transparent md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen? "max-md:w-full" :"max-md:w-0"}`}>
     <XIcon onClick={()=>setIsOpen(!isOpen)} className='md:hidden  absolute top-6 right-6 w-6 h-6 cursor-pointer'></XIcon>
      <Link onClick={()=>{scrollTo(0,0) ,setIsOpen(false)}} to='/'>Home</Link>
      <Link  onClick={()=>{scrollTo(0,0) ,setIsOpen(false)}} to='/movies'>Movies</Link>
      <Link onClick={()=>{scrollTo(0,0) ,setIsOpen(false)}}  to='/'>Theaters</Link>
      <Link onClick={()=>{scrollTo(0,0) ,setIsOpen(false)}}  to='/upcoming'>Upcoming</Link>
      { favoriteMovies.length>0 &&
      <Link onClick={()=>{scrollTo(0,0) ,setIsOpen(false)}}  to='/favorite'>Favorites</Link>
     }
     </div>
     <div className='flex justify-around items-center gap-8'>
      <SearchIcon className='max-md:hidden'></SearchIcon>
      {
        !user? (<button onClick={openSignIn} className='w-28 h-10 bg-red-500 text-white rounded-3xl p-1 cursor-pointer'>Login</button>):(<UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/my-bookings')}/>
          </UserButton.MenuItems>
        </UserButton>)
      }
     </div>
     <MenuIcon onClick={()=>setIsOpen(!isOpen)} className='md:hidden cursor-pointer'></MenuIcon>
    </div>
   
  )
}

export default Navbar

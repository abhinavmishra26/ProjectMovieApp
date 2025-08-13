import React, { useEffect } from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import AdminSidebar from '../../Components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppProvider'
import { isAdmin } from '../../../../server/controllers/adminController'
import Loading from '../../Components/Loading'


const Layout = () => {
  const {isadmin , fetchIsAdmin}=useAppContext();

  useEffect(()=>{
    fetchIsAdmin();
  },[])
  return isAdmin?(
    <>
        <AdminNavbar/>
     <div className='flex '>
        <AdminSidebar/>
          <div className=" mt-12 w ml-10 lg:ml-58 p-4 min-h-screen overflow-y-auto  ">
        <Outlet/>
        </div>
    </div>
    </>
  ):(
    <Loading/>
  )
}

export default Layout

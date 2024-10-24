import logo from "../../assets/images/navbar/logo.png"
import likeImg from "../../assets/images/header/Vector (13).png"
import cartImg from "../../assets/images/header/Vector (14).png"
import { BiSearch, BiUser, BiUserCircle } from "react-icons/bi"
import { useEffect, useRef, useState } from "react"
import LoginModal from "../LoginModal"
import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../../api-service/authApi"
import { FiLogOut } from "react-icons/fi"
import altImg from "../../assets/images/header/1077114.png"
import { useNavigate } from "react-router-dom"

function Header() {

  const [openModal , setOpenModal] = useState(false)
  const [openUser , setOpenUser] = useState(false)
  const userRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const hasToken = localStorage.getItem('access-token')

   const getProfiledata = useQuery({
    queryKey: ['getProfiledata'],
    queryFn: () => getProfileApi()
   })

   const profileData = getProfiledata?.data?.data?.result

   useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpenUser(false); // Close the modal
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userRef]);

  const handleLogout = ()=>{
    localStorage.removeItem('access-token');
    localStorage.removeItem( 'role');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('name')
    navigate('/')
    
  }

  return (
    <>
    <div className="flex items-center justify-between font-QuickSand py-2 md:py-[15px] px-[3%] md:px-[4%] ">
      <div className="flex items-center gap-12">
        <img src={logo} className="w-24 xl:w-48 2xl:w-52" alt="" />
        <div>
        <div className="hidden md:block border-[1.7px]  border-primaryColor rounded-md overflow-hidden min-w-[500px]">
        <div className="flex items-center justify-between">
        <input type="search" className="py-1 border-none outline-none ps-2 placeholder:text-sm" placeholder="Search for items..."/>
        <div className="flex">
          <div className="border-l-[1.7px] border-primaryColor flex justify-center px-2">
          <select name="" id="" className="border-none outline-none">
            <option value="">All Categories</option>
            <option value="">Cooker</option>
            <option value="">washing Machine</option>
          </select>
          </div>
          <div className="px-3 py-3 text-white bg-primaryColor">
        <BiSearch className="bg-primaryColor"/>
        </div>
        </div>
        
        </div>
        </div>
      </div>
      </div>
      
      
      <div className="flex items-center justify-center gap-2 text-xs font-medium md:gap-5 md:text-base">
        {!hasToken && (
          <button className="flex items-center justify-center gap-2 px-2 py-1 text-primaryColor border-[1px] border-primaryColor rounded-md hover:text-yellow-400 hover:border-primaryColor font-bold "
        onClick={()=>setOpenModal(true)}><BiUserCircle className="w-5 h-5"/> Login
        </button>
        )}
        
        <div className="flex items-center gap-1">
          <img src={likeImg} className="w-3 h-3 md:w-5 md:h-5 md:me-1" alt="" />
          <p>WishList</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={cartImg} className="w-3 h-3 md:w-5 md:h-5 md:me-1" alt="" />
          <p>Cart</p>
        </div>
        {hasToken && (
          <div className="relative">
            <div className="border-[1px] px-2 py-1 rounded-md border-primaryColor flex justify-center items-center gap-2 bg-primaryColor/5 cursor-pointer group hover:bg-transparent"
            onClick={()=>setOpenUser(true)}>
              <img src={profileData?.img_url ? profileData?.img_url : altImg} className="w-8 h-8 rounded-full 2xl:w-9 2xl:h-9" alt="" />
              <div>
              <p className="font-semibold group-hover:text-yellow-400">{profileData?.firstName} {profileData?.lastName}</p>
              <p className="text-xs text-black/50 group-hover:text-primaryColor/50">{profileData?.role?.name}</p>
              </div>
            </div>
            {openUser && (
              <div className="border-[1px] border-black/20 bg-white absolute top-14 z-50 w-full" ref={userRef}>
              <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer">
                <BiUser/>
                <p>Profile</p>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-primaryColor/5"
              onClick={handleLogout}>
                <FiLogOut/>
                <p>Logout</p>
              </div>
             </div>
            )}
           
        </div>
        )}
      </div>
      {/* <div className="flex items-center justify-center gap-2 text-xs font-medium md:gap-5 md:text-base">
        <div className="flex items-center gap-1">
          <img src={userImg} className="w-3 h-3 md:w-5 md:h-6 md:me-1" alt="" />
          <p>Account</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={likeImg} className="w-3 h-3 md:w-6 md:h-5 md:me-1" alt="" />
          <p>WishList</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={cartImg} className="w-3 h-3 md:w-6 md:h-6 md:me-1" alt="" />
          <p>Account</p>
        </div>
      </div> */}
    </div>

      {openModal && <LoginModal openModal={openModal} handleClose={()=>setOpenModal(!openModal)}/>}
    </>
  )
}

export default Header
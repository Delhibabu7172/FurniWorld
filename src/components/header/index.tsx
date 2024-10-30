import logo from "../../assets/images/navbar/newlogo.svg"
import likeImg from "../../assets/images/header/Vector (13).png"
import cartImg from "../../assets/images/header/Vector (14).png"
import { BiSearch, BiUser, BiUserCircle } from "react-icons/bi"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../../api-service/authApi"
import { FiLogOut } from "react-icons/fi"
import altImg from "../../assets/images/header/1077114.png"
import { useNavigate } from "react-router-dom"
import { getCartApi, getWishListApi } from "../../api-service/landingApi"
import CartModal from "../../container/header/CartModal"
import { FaHeart } from "react-icons/fa"
import SignUpModal from "../signUpModal"
import LoginWithoutHeaderModal from "../LoginModal/LoginWithoutHeader"

function Header() {

  const [openLogin , setOpenLogin] = useState(false)
  const [openModal , setOpenModal] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const userRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [openCartModel , setOpenCartModal] = useState(false)

  const hasToken = localStorage.getItem('access-token')

  const getProfiledata = useQuery({
    queryKey: ['getProfiledata'],
    queryFn: () => getProfileApi(),
    enabled: !!hasToken
  })

  const profileData = getProfiledata?.data?.data?.result
  console.log(profileData);


  useEffect(() => {

  }, [hasToken, profileData, localStorage.getItem('access-token')])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('role');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('name')
    navigate('/')
    window.location.reload()
    setOpenUser(false)
  }



  // for cart show in ui 
  const getCartData = useQuery({
    queryKey: ['getCartData'],
    queryFn: () => getCartApi(``),
    enabled: !!hasToken
  })

  const cartData = getCartData?.data?.data?.result

   // for wishlist show in ui 
   const getWishlistData = useQuery({
    queryKey: ['getWishlistData'],
    queryFn: () => getWishListApi(``),
    enabled: !!hasToken
  })

  const wishlistData = getWishlistData?.data?.data?.result
  console.log(wishlistData?.length);
  

  return (
    <>
      <div className="flex items-center justify-between  py-2 md:py-[15px] px-[3%] md:px-[4%] font-Lexend">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-20" alt="" />
            <p className="font-bold text-xl">FURNI WORLD</p>
          </div>
          <div>
            <div className="hidden md:block border-[1.7px]  border-primaryColor rounded-md overflow-hidden min-w-[500px]">
              <div className="flex items-center justify-between">
                <input type="search" className="py-1 border-none outline-none ps-2 placeholder:text-sm" placeholder="Search for items..." />
                <div className="flex">
                  <div className="border-l-[1.7px] border-primaryColor flex justify-center px-2">
                    <select name="" id="" className="border-none outline-none">
                      <option value="">All Categories</option>
                      <option value="">Cooker</option>
                      <option value="">washing Machine</option>
                    </select>
                  </div>
                  <div className="px-3 py-3 text-white bg-primaryColor">
                    <BiSearch className="bg-primaryColor" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


        <div className="flex items-center justify-center gap-2 text-xs font-medium md:gap-5 md:text-base">
          {!profileData && (
            <button className="flex items-center justify-center gap-2 px-2 py-1 text-primaryColor border-[1px] border-primaryColor rounded-md hover:text-yellow-400 hover:border-primaryColor font-bold "
              onClick={() => setOpenModal(true)}><BiUserCircle className="w-5 h-5" /> Login
            </button>
          )}

          {/* <div className="flex items-center gap-1">
            <img src={likeImg} className="w-3 h-3 md:w-5 md:h-5 md:me-1" alt="" />
            <p>WishList</p>
          </div> */}
          <div className={`flex items-center  cursor-pointer ${wishlistData?.length > 0 ? "gap-2" : "gap-1"}`}
          onClick={()=>navigate('/wishlist')}>
            <div className="relative">
              <img src={likeImg} className="w-3 h-3 md:w-6 md:h-5 md:me-1" alt="" />
              {wishlistData?.length > 0 && (
                <p className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full h-[17px] w-[17px] flex justify-center items-center">
                  {wishlistData?.length > 10 ? "10+" : wishlistData?.length}
                </p>
              )}
            </div>
            <p>WishList</p>

          </div>
          <div className={`flex items-center gap-2 cursor-pointer ${cartData?.products?.length > 0 ? "gap-2" : "gap-1"}`}
          onClick={()=>setOpenCartModal(true)}>
            <div className="relative">
              <img src={cartImg} className="w-3 h-3 md:w-5 md:h-5 md:me-1" alt="" />
              {cartData?.products?.length > 0 && (
                <p className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full h-[17px] w-[17px] flex justify-center items-center">
                  {cartData?.products?.length > 10 ? "10+" : cartData?.products?.length}
                </p>
              )}
            </div>
            <p>Cart</p>

          </div>
          {profileData && (
            <div className="relative">
              <div className="border-[1px] px-2 py-1 rounded-md border-primaryColor flex justify-center items-center gap-2 bg-primaryColor/5 cursor-pointer group hover:bg-transparent"
                onClick={() => setOpenUser(true)}>
                <img src={profileData?.img_url ? profileData?.img_url : altImg} className="w-8 h-8 rounded-full 2xl:w-9 2xl:h-9" alt="" />
                <div>
                  <p className="font-semibold group-hover:text-yellow-400">{profileData?.firstName} {profileData?.lastName}</p>
                  <p className="text-xs text-black/50 group-hover:text-primaryColor/50">{profileData?.role?.name}</p>
                </div>
              </div>
              {openUser && (
                <div className="border-[1px] border-black/20 bg-white absolute top-14 z-50 w-full" ref={userRef}>
                  {profileData?.role?.name === 'ADMIN' ? (
                    <>
                       <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer">
                    <BiUser />
                    <p>Profile</p>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-primaryColor/5"
                    onClick={handleLogout}>
                    <FiLogOut />
                    <p>Logout</p>
                  </div>
                    </>
                  ) : profileData?.role?.name === 'CUSTOMER' ? (
                    <>
                     <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer">
                    <BiUser />
                    <p>Orders</p>
                  </div>
                  <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer"
                  onClick={()=>{navigate('/address'),setOpenUser(false)}}>
                    <BiUser />
                    <p>Address</p>
                  </div>
                  <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer">
                    <BiUser />
                    <p>Account Details</p>
                  </div>
                  <div className="flex items-center gap-2 border-b-[1px] py-1 px-2 hover:bg-primaryColor/5 cursor-pointer">
                    <FaHeart />
                    <p>Wishlist</p>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-primaryColor/5"
                    onClick={handleLogout}>
                    <FiLogOut />
                    <p>Logout</p>
                  </div>
                    </>
                  ) : ""}
                 
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

  
        {openCartModel && <CartModal openModal={openCartModel} handleClose={()=>setOpenCartModal(!openCartModel)}/>}

        {openModal && (
            <div className="fixed inset-0 z-[1000] flex justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-lg 2xl:max-w-xl w-full flex flex-col max-h-[90%] h-fit  animate-slideTop">
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b">
                <h2 className="text-lg font-medium">{openLogin ? 'SignUp' : "Login"} Modal</h2>
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={()=>setOpenModal(!openModal)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             {openLogin ? (
                  <>
                  <div className="overflow-y-scroll hide-scrollbar">
                     <SignUpModal />
                  </div>
                  <div className='col-span-12 px-5 py-3'>
                                 <p className='text-sm font-extralight'>Already have an Account. <span className='underline cursor-pointer font-medium text-primaryColor'
                                 onClick={()=>{setOpenLogin(!openLogin)}}>SignIn</span></p>
                             </div>
                             </>
             ) : (
                <>
                          <div className="overflow-y-scroll hide-scrollbar">
                     <LoginWithoutHeaderModal />
                  </div>
                  <div className='col-span-12 px-5 py-3'>
                                 <p className='text-sm font-extralight'>Create an Account.<span className='underline cursor-pointer font-medium text-primaryColor'
                                 onClick={()=>{setOpenLogin(!openLogin)}}>SignUp</span></p>
                             </div>
                </>
             )}
           
            </div>
            </div>
        )}
        
    </>
  )
}

export default Header
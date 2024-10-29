import { useQuery } from "@tanstack/react-query"
import { FaEye, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa"
import { LuIndianRupee } from "react-icons/lu"
import { MdOutlineShoppingBag } from "react-icons/md"
import { deleteCartApi, getCartApi, getProductLandingApi, postAddCartApi } from "../../../api-service/landingApi"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import SignUpModal from "../../../components/signUpModal"


function NewArrivals() {

    const hasToken  = localStorage.getItem('access-token')
    const [noToken , setNoToken] = useState(false)

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<any>([]);

    const getproductData = useQuery({
        queryKey : ['getproductData'],
        queryFn : () => getProductLandingApi(``)
    })

    const productData = getproductData?.data?.data?.result?.rows

     // for wishList function
     const handleWishList = () => {
        if(hasToken){
            console.log("already logged in----------");
        }else{
            setNoToken(true)
        }
    }

    // for my cart function
    const handleMyCart = async (data : any, cartProduct :any) => {
        
        if(hasToken){
            const inCart = cartItems.some((item:any) => item?.product?._id === data?._id)

            if (inCart) {
                
                const deleteApi = await deleteCartApi(cartData?._id,cartProduct?._id)
                if(deleteApi?.status === 200){
                    toast.success('Product Removed From Cart.')
                    setCartItems(cartItems.filter((item:any) => item?.product?._id !== data?._id));
                    getproductData?.refetch()
                    getCartData?.refetch()
                }
            }
            else {
                console.log("not in cart");
                    const payload = {
                        product: data?._id,
                        variant: data?.variants ? data?.variants[0]?._id : "",
                        quantity: 1,
                        singlePrice: data?.sizes[0]?.offerPrice
                    }
                    const cartApi = await postAddCartApi(payload)
                    if(cartApi?.status === 200){
                        toast.success('Product added to Cart.')
                        setCartItems([...cartItems, { product: data }]);
                        getproductData?.refetch()
                        getCartData?.refetch()
                    }
              }
        }else{
            setNoToken(true)
        }
    }

    // for cart show in ui 
    const getCartData = useQuery({
        queryKey : ['getCartData'],
        queryFn : () => getCartApi(``),
        enabled : !!hasToken
    })

    const cartData = getCartData?.data?.data?.result

   useEffect(() => {
    const inCart = cartData?.products?.map((item:any) => item) || [];
    setCartItems(inCart);
}, [cartData]);

  return (
    <>
     <div className="px-[4%] my-8">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0">
        <div>
            <p className="text-base md:text-lg">New <span className="font-bold text-primaryColor">Arrivals</span></p>
            <p className="text-xs md:text-sm text-black/70">Shop online for new arrivals and get free shipping!</p>
        </div>
        <div className="hidden lg:flex justify-center">
        <p className="text-transparent text-3xl lg:text-4xl xl:text-5xl text-stroke">
                    Products
                  </p>
        </div>
        <div className="flex justify-end items-center">
            <p className="underline cursor-pointer">View All</p>
        </div>
    </div>

    <div className="grid grid-cols-12 gap-3 mt-5">
        {productData?.length > 0 ? (
            productData?.slice(0,8).map((idx:any,index:number) => (
                <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-2 border rounded-sm border-primaryColor/10 group" key={index}>
                <div className="bg-[#E9E9E9] border border-primaryColor/5 rounded-md w-full h-72 flex justify-center items-center relative  px-10 py-10 group-hover:cursor-pointer">
                    <img src={idx?.images[0]} className="h-full group-hover:scale-110 transform transition-all duration-300 ease-in" alt="" />
                    <p className="absolute top-0 left-0 px-2 py-1 text-xs text-white bg-green-600 rounded-br-2xl rounded-tl-md">New</p>
                        <div className="hidden group-hover:flex absolute bottom-2 z-50 left-[50%] transform translate-x-[-50%] translate-y-0 transition-all duration-500 ease-in-out group-hover:-translate-y-1">
                        <div className="flex items-center gap-2">
                                    <FaRegHeart
                                      onClick={()=>handleWishList()}
                                       className=" bg-white border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
                                        <MdOutlineShoppingBag 
                                          onClick={() => {
                                            console.log(cartItems.some((item:any) => item?.product?._id === idx?._id));
                                            
                                            const cartItem = cartItems.find((item:any) => item?.product?._id === idx?._id);
                                            handleMyCart(idx, cartItem ? cartItem : null);
                                        }}
                                        className={`  border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200 ${cartItems.some((item:any) => item?.product?._id === idx?._id) ? "bg-red-500 text-white" : "bg-white"}`} />
                                        <FaEye 
                                        onClick={()=>navigate(`/products/${idx?._id}`)}
                                        className=" bg-white border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
                                    </div>
                            </div>
                   
                </div>
                <div className="flex flex-col items-center justify-center gap-1 mt-8">  
                    <p className="font-bold text-center">{idx?.name}</p>
                    <div className="flex items-center gap-2">
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaRegStar className="text-orange-500"/>
                    </div>
                    <p className="mt-2">{idx?.sizes[0]?.name}</p>
                    <div className="flex items-end gap-1">
                        <p className="flex items-center font-bold"><LuIndianRupee  /> {idx?.sizes[0]?.offerPrice}</p>
                        <p className="line-through text-sm">₹ {idx?.sizes[0]?.MRP}</p>
                    </div>
                </div>
        </div>
            ))
        ) : (
            <div></div>
        )}
        
    </div>
</div>
    
    {noToken && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg max-w-lg 2xl:max-w-xl w-full flex flex-col max-h-[90%] h-fit  animate-slideTop">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b">
            <h2 className="text-lg font-medium">SignUp Form</h2>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={()=>setNoToken(!noToken)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
         </div>
         <div className="overflow-y-scroll hide-scrollbar">
            <SignUpModal/>
         </div>
        </div>
        </div>
        )}
    </>
   
  )
}

export default NewArrivals
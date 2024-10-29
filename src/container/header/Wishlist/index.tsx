import { FaEye, FaRegCircle, FaRegStar, FaStar } from "react-icons/fa";
import Pageheader from "../../../components/PageHeader"
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { deleteCartApi, getCartApi, getWishListApi, postAddCartApi, postWishListApi } from "../../../api-service/landingApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function WishList() {

    const page = {
        currentpage: `WishList`, 
        breadcrumbs: [
          { label: 'Home', path: '/'},
          { label: `WishList`, path: '/wishlist'},
       ] 
      };

      const hasToken  = localStorage.getItem('access-token')
  
      const navigate = useNavigate();
  
      const [cartItems, setCartItems] = useState<any>([]);

    const getWishlistData = useQuery({
        queryKey: ['getWishlistData'],
        queryFn: () => getWishListApi(``),
        enabled: !!hasToken
      })
    
      const wishlistData = getWishlistData?.data?.data?.result

    // for my cart function
    const handleMyCart = async (data : any, cartProduct :any) => {
    
            const inCart = cartItems.some((item:any) => item?.product?._id === data?._id)

            if (inCart) {
                
                const deleteApi = await deleteCartApi(cartData?._id,cartProduct?._id)
                if(deleteApi?.status === 200){
                    toast.success('Product Removed From Cart.')
                    setCartItems(cartItems.filter((item:any) => item?.product?._id !== data?._id));
                    getWishlistData?.refetch()
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
                        getWishlistData?.refetch()
                        getCartData?.refetch()
                    }
              }
    }

    // for Wishlist api function
    const handleWishlist = async (data : any) => {
       
        const payload = {
            product : data?._id
        }
        const wishlistApi = await postWishListApi(payload)
        if(wishlistApi?.status === 200){
            toast.success(wishlistApi?.data?.msg)
            getWishlistData?.refetch()
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
    <div className="mt-3">
      <Pageheader data={page}/>
      <div className="px-[4%]">
      <div className="grid grid-cols-12 gap-3 mt-5">
        {hasToken ? (
             wishlistData?.length > 0 ? (
                wishlistData?.map((idx:any,index:number) => (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-2 border rounded-sm border-primaryColor/10 group relative" key={index}>
                    <div className="bg-[#E9E9E9] border border-primaryColor/5 rounded-md w-full h-72 flex justify-center items-center relative  px-10 py-10 group-hover:cursor-pointer">
                        <img src={idx?.product?.images[0]} className="h-full group-hover:scale-110 transform transition-all duration-300 ease-in" alt="" />
                        <p className="absolute top-0 left-0 px-2 py-1 text-xs text-white bg-green-600 rounded-br-2xl rounded-tl-md">New</p>
                            <div className="hidden group-hover:flex absolute bottom-2 z-50 left-[50%] transform translate-x-[-50%] translate-y-0 transition-all duration-500 ease-in-out group-hover:-translate-y-1">
                                <div className="flex items-center gap-2">
                                
                                    <MdOutlineShoppingBag 
                                      onClick={() => {
                                        console.log(cartItems.some((item:any) => item?.product?._id === idx?.product?._id));
                                        
                                        const cartItem = cartItems.find((item:any) => item?.product?._id === idx?.product?._id);
                                        handleMyCart(idx, cartItem ? cartItem : null);
                                    }}
                                    className={`border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center  ${cartItems.some((item:any) => item?.product?._id === idx?.product?._id) ? "bg-red-500 text-white" : "bg-white hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200"}`} />
                                    <FaEye 
                                    onClick={()=>navigate(`/products/${idx?._id}`)}
                                    className=" bg-white border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
                                </div>
                                </div>
                       
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 mt-8">  
                        <p className="font-bold text-center">{idx?.product?.name}</p>
                        <div className="flex items-center gap-2">
                        <FaStar className="text-orange-500"/>
                        <FaStar className="text-orange-500"/>
                        <FaStar className="text-orange-500"/>
                        <FaStar className="text-orange-500"/>
                        <FaRegStar className="text-orange-500"/>
                        </div>
                        <p className="mt-2">{idx?.product?.sizes[0]?.name}</p>
                        <div className="flex items-end">
                            <p className="flex items-center font-bold"><LuIndianRupee  /> {idx?.product?.sizes[0]?.offerPrice}</p>
                            <p className="text-sm line-through ms-2">₹{idx?.product?.sizes[0]?.MRP}</p>
                        </div>
                    </div>
                    <div className="absolute top-0 right-4">
                        <button className="bg-red-500 text-white py-1 px-1 rounded-bl-xl rounded-br-xl"
                        onClick={()=>handleWishlist(idx?.product)}><FaRegCircle /></button>
                    </div>
            </div>
                ))
            ) : (
                <div className="flex justify-center items-center col-span-12 mt-10">
                    <p className="text-center">No Data Found</p>
                </div>
            )
        ) : (
            <div className="col-span-12 text-center">
                <p>No Wishlist is There....</p>
                <p>Please Continue to Purchase</p>
            </div>
        )} 
               
                
            </div>
      </div>
    </div>
  )
}

export default WishList
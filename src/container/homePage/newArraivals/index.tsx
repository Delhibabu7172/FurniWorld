import { useQuery } from "@tanstack/react-query"
import { FaEye, FaRegStar, FaStar } from "react-icons/fa"
import { LuIndianRupee } from "react-icons/lu"
import { MdOutlineShoppingBag } from "react-icons/md"
import { getProductLandingApi } from "../../../api-service/landingApi"
import { useNavigate } from "react-router-dom"


function NewArrivals() {

    const navigate = useNavigate()

    const getproductData = useQuery({
        queryKey : ['getproductData'],
        queryFn : () => getProductLandingApi(``)
    })

    const productData = getproductData?.data?.data?.result?.rows

  return (
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
                                <MdOutlineShoppingBag className=" bg-yellow-400 border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
                                <FaEye 
                                onClick={()=>navigate(`/products/${idx?._id}`)}
                                className=" bg-yellow-400 border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
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
                    <div>
                        <p className="flex items-center"><LuIndianRupee  /> {idx?.sizes[0]?.price} <span className="text-xs line-through ms-2">MRP. <span className="text-xs">₹ 1,079.00</span></span></p>
                    </div>
                </div>
        </div>
            ))
        ) : (
            <div></div>
        )}
        
    </div>
</div>
  )
}

export default NewArrivals
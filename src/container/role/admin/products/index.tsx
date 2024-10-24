import { useQuery } from "@tanstack/react-query"
import { BiPlus } from "react-icons/bi"
import { FiEdit3 } from "react-icons/fi"
import { LuEye } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri"
import {  getProductApi } from "../../../../api-service/admin"
import { Circles } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

function AdminProducts() {

    const navigate = useNavigate()

const getProductData = useQuery({
  queryKey : ['getProductData'],
  queryFn : () => getProductApi(``)
})

const productData = getProductData?.data?.data?.result

  return (
    <>
    <div className="px-[4%]  h-full py-5">
        {getProductData?.isLoading ? (
             <div className="h-[70vh] flex justify-center items-center">
             <Circles
                 height="40"
                 width="40"
                 color='#1A3764'
                 ariaLabel="circles-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                 />
          </div>
       
        ) : (
            <div className="p-4 bg-white rounded-sm border-[1px]">
        <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold">Products</p>
            <div>
                <input type="search" />
            </div>
            <button className="flex items-center px-4 py-2 text-white rounded-md bg-primaryColor"
            onClick={()=>navigate(`/product/create`)}><BiPlus className="me-2"/>Add Product</button>
        </div>
        <table className="w-full ">
            <thead className=" bg-primaryColor/10">
                <tr className="">
                    <td className="p-3 font-bold ">S.NO</td>
                    <td className="p-3 font-bold uppercase">Product ID</td> 
                    <td className="p-3 font-bold uppercase">Product</td> 
                    <td className="p-3 font-bold uppercase">Category</td>
                    <td className="p-3 font-bold uppercase">Brand</td>
                    <td className="p-3 font-bold uppercase">Price</td>
                    <td className="p-3 font-bold uppercase">Action</td>
                </tr>
            </thead>
            <tbody>
                {productData?.rows?.length > 0 ? (
                    <>
                    {productData?.rows?.map((idx:any,index:number) => (
                         <tr key={index} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                         <td className="p-3">{index + 1}.</td>
                         <td className="p-3"></td>
                         <td className="p-3">
                            <div className="flex items-center gap-2">
                                <img src={idx?.images[0] ? idx?.images[0] : "-"} className="w-14 h-14 rounded-full object-contain border" alt="No " />
                                <p className="font-semibold">{idx?.name}</p>
                                </div>
                                </td>
                         <td className="p-3">
                         <div className="">{idx?.category?.name ? idx?.category?.name : "-"}</div>
                         </td>
                         <td className="p-3">
                            {idx?.brand?.name ? idx?.brand?.name : "-"}
                         </td>
                         <td className="p-3">
                           ₹ {idx?.minimum_price ? idx?.minimum_price : "-"}
                         </td>
                         <td className="p-3">
                             <div className="flex items-center gap-5">
                                 <button><LuEye className="text-[#1A3764] w-5 h-5"/></button>
                                 <button><FiEdit3 className="text-[#22C55E] w-5 h-5"
                                 onClick={()=>navigate(`/product/${idx?._id}`)}/></button>
                                 <button><RiDeleteBin6Line className="text-[#FF5200] w-5 h-5"/></button>
                             </div>
                         </td>
                     </tr>
                    ))}
                   
                </>
                ) : (
                    <div>
                        No Data Found
                    </div>
                )}
                
            </tbody>
        </table>
        </div>
             
        )}
       
    </div>

   
    </>
  )
}

export default AdminProducts
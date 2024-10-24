import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getBrandApi } from "../../../../api-service/admin"
import { FaToggleOff, FaToggleOn } from "react-icons/fa"
import { Circles } from "react-loader-spinner"
import { BiPlus } from "react-icons/bi"
import { FiEdit3 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import BrandCreateModal from "./BrandCreateModal"

function AdminBrand() {

    const [openModal , setOpenModal] = useState(false)
    const [openModalId , setOpenModalId] = useState('')

const getBrandData = useQuery({
    queryKey : ['getBrandData'],
    queryFn : () => getBrandApi(``)
})

const brandData = getBrandData?.data?.data?.result

  return (
    <>
    <div className="px-[4%]  h-full py-5">
        {getBrandData?.isLoading ? (
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
            <p className="text-2xl font-bold">Brand</p>
            <div>
                <input type="search" />
            </div>
            <button className="flex items-center px-3 py-2 text-white rounded-md bg-primaryColor"
            onClick={()=>setOpenModal(true)}><BiPlus className="me-2"/>Add New</button>
        </div>
        <table className="w-full ">
            <thead className=" bg-primaryColor/10">
                <tr className="">
                    <td className="p-3 font-bold ">S.NO</td>
                    <td className="p-3 font-bold capitalize">Brand Name</td>
                    <td className="p-3 font-bold capitalize">description</td>
                    <td className="p-3 font-bold capitalize">status</td>
                    <td className="p-3 font-bold capitalize">Action</td>
                </tr>
            </thead>
            <tbody>
                {brandData?.length > 0 ? (
                    <>
                    {brandData?.map((idx:any,index:number) => (
                         <tr key={index} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                         <td className="p-3">{index + 1}.</td>
                         <td className="p-3">
                            <div className="flex items-center gap-2">
                                <img src={idx?.img_url ? idx?.img_url : "-"} className="w-14 h-14 rounded-full object-contain" alt="No " />
                                <p className="font-semibold">{idx?.name}</p>
                                </div>
                                </td>
                         <td className="p-3 max-w-40 2xl:max-w-44">
                         <div className="flex flex-wrap w-full ">{idx?.description.slice(0,100)+"..."}</div></td>
                         <td className="p-3">
                             <div className="flex items-center">
                             {idx?.status === 'active' ? <FaToggleOn className="w-5 h-5 text-green-500 cursor-pointer text- me-1"/> : <FaToggleOff className="text-[#F15C5C] w-5 h-5 me-1 cursor-pointer"/>}
                              <p className={` ${idx?.status === 'active' ? 'text-green-500' : "text-[#F15C5C]"} font-bold text-xs capitalize`}>{idx?.status}</p>
                             </div>
                         </td>
                         <td className="p-3">
                             <div className="flex items-center gap-5">
                                 <button><FiEdit3 className="text-[#22C55E] w-5 h-5"
                                 onClick={()=>{setOpenModalId(idx?._id),setOpenModal(true)}}/></button>
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

    {openModal && <BrandCreateModal openModal={openModal} handleClose={()=>setOpenModal(!openModal)} refetch={()=>getBrandData?.refetch()} modalId={openModalId}/>}
    </>
  )
}

export default AdminBrand
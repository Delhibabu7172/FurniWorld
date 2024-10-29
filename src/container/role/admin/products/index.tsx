import { useQuery } from "@tanstack/react-query"
import { BiPlus } from "react-icons/bi"
import { FiEdit3 } from "react-icons/fi"
import { LuEye } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri"
import {  deleteProductApi, getProductApi } from "../../../../api-service/admin"
import { Circles } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Pagination from "../../../../components/pagination"
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import toast from "react-hot-toast"

function AdminProducts() {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

const getProductData = useQuery({
  queryKey : ['getProductData', currentPage],
  queryFn : () => getProductApi(`?currentPage=${currentPage}`)
})

const productData = getProductData?.data?.data?.result

const totalPages = productData?.pagination?.pages;
const handlePageChange = (page: any) => {
  setCurrentPage(page);
};

// for delete api function
const handleDelete = async (data : any) =>{
  const updateApi = await deleteProductApi(data?._id,data?.name)
  if(updateApi?.status === 200){
    toast.success(updateApi?.data?.msg)
    getProductData?.refetch()
  }
}

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
                    <button className="flex items-center px-4 py-2 text-white rounded-md bg-primaryColor hover:bg-yellow-400 hover:text-black font-semibold"
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
                                <td className="p-3">{idx?.product_id}</td>
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
                                        <button
                                        onClick={()=>handleDelete(idx)}><RiDeleteBin6Line className="text-[#FF5200] w-5 h-5"/></button>
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
                <div className="box-footer mt-4">
                <div className="sm:flex items-center">
                  <div className="text-defaulttextcolor/70">
                    Showing {(currentPage) * itemsPerPage + 1} to{' '}
                    {Math.min((currentPage + 1) * itemsPerPage, productData?.pagination?.total)} of{' '}
                    {productData?.pagination?.total} entries
                    <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                  </div>

                  <div className="ms-auto">
                    <nav aria-label="" className="pagination-style-1">
                      <ul className="ti-pagination flex items-center justify-center gap-2">
                        <li className={` ${currentPage === 0 ? 'disabled' : ''} rtl:rotate-180`}>
                          <button aria-label="Previous" className="page-link flex justify-center items-center" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            <MdOutlineKeyboardDoubleArrowLeft />
                          </button>
                        </li>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                        {/* {[...Array(totalPages)].map((_, index) => (
                          <li key={index} className={` ${currentPage === index ? 'active' : ''}`}>
                            <button
                              className={`page-link ${currentPage === index ? '!bg-primary !text-white' : 'hover:!bg-primary hover:!text-white focus:!bg-primary focus:!text-white'}`}
                              onClick={() => handlePageChange(index)}>
                              {index + 1}
                            </button>
                          </li>
                        ))} */}
                        <li className={` ${currentPage === totalPages - 1 ? 'disabled' : ''} rtl:rotate-180`}>
                          <button aria-label="Next" className="page-link flex justify-center items-center" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                          <MdOutlineKeyboardDoubleArrowRight />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
        </div>
             
        )}
       
    </div>

   
    </>
  )
}

export default AdminProducts
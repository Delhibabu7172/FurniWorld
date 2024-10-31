import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import Pagination from "../../../components/pagination"
import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryLandingApi, getOrdersApi } from "../../../api-service/landingApi";
import { BsArrowRight } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Circles } from "react-loader-spinner";
import NoDataFound from "../../../components/noDataFound";
import { FaDotCircle } from "react-icons/fa";
import {  isFormattedDate, isFormatTime } from "../../../utils/helper";

function MyOrders() {

    
    // const [openLogin , setOpenLogin] = useState(true)
    
    // const [cartItems, setCartItems] = useState<any>([]);    

    // const location = useLocation();
    // const navigate = useNavigate();
      
    //   const initialStatus = location.state?.status || '';

    const statusFilter = [
        { value : 'orderPlaced' , label : 'Pending' },
        { value : 'process' , label : 'Process' },
        { value : 'shipped' , label : 'Shipped' },
        { value : 'deliveried' , label : 'Delivered' },
    ]

    const [search , setSearch] = useState('')
    const [status , setStatus] = useState('orderPlaced')
    // const [selectedCategory , setSelectCategory] = useState(initialStatus)
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const getCategoryData = useQuery({
        queryKey : ['getCategoryData'],
        queryFn : () => getCategoryLandingApi(``)
    })

    const categoryData = getCategoryData?.data?.data?.result

    const getproductData = useQuery({
        queryKey : ['getproductData', search , currentPage, status],
        queryFn : () => getOrdersApi(`?search=${search}&currentPage=${currentPage}&status=${status}`)
    })

    const productData = getproductData?.data?.data?.result
    const totalPages = productData?.pagination?.pages;
const handlePageChange = (page: any) => {
  setCurrentPage(page);
}

const handleCategory = (data: any) => {
    setStatus(data.value); // Store the selected filter value
  };

  return (
    <div>
          <div className="grid grid-cols-12 gap-3 font-Lexend px-[4%] my-5">
        <div className="col-span-12 overflow-y-auto border rounded-md md:col-span-2 xl:col-span-3 ">
            <div className="p-2">
                <p className="py-3 text-lg font-bold ">Filter</p>
                {categoryData?.length > 0 ? (
                    <div className="flex flex-row gap-1 px-3 mt-2 mb-2 overflow-x-scroll md:flex-col hide-scrollbar">
                    {statusFilter?.map((item: any, index: number) => (
                        <div key={index}>
                        <p
                            className={`px-2 py-1 cursor-pointer rounded-sm flex justify-between items-center
                            ${status === item.value ? 'bg-yellow-400' : 'hover:bg-yellow-400'}`}
                            onClick={() => handleCategory(item)}
                        >
                            {item.label} {status === item.value ? <BsArrowRight /> : ""}
                        </p>
                        </div>
                    ))}
                    </div>
                ) : ""}
            </div>
        </div>
        <div className="max-h-screen col-span-12 overflow-y-auto md:col-span-10 xl:col-span-9 hide-scrollbar">
        <div className="px-[2%] my-3">

        <div className="flex justify-between gap-4 md:gap-0">
        <p className="text-xl text-transparent lg:text-2xl xl:text-3xl text-stroke">
                    Orders
                  </p>
       <div className="relative">
        <input type="search"
        onChange={(e)=>setSearch(e.target.value)} className="w-64 px-3 py-2 border rounded-sm outline-none border-primaryColor" placeholder="Search Here...."/>
        <BiSearch className="absolute top-[50%] translate-y-[-50%] right-10"/>
       </div>
    </div>
    
    {getproductData?.isLoading ? (
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
        <>
        {productData?.rows?.length > 0 ? (
            <>
                 <div className="grid grid-cols-12 gap-3 mt-3">
        {productData?.rows?.length > 0 ? (
            productData?.rows?.map((idx:any,index:number) => (
                <div className="h-full col-span-12 p-2 rounded-sm group" key={index}>
                    
                  <div className="flex flex-col w-full h-full gap-4 p-2 mt-4 border rounded-md md:flex-row">
                  <div className="relative flex flex-col items-center justify-center !h-40 gap-2 p-3 border rounded-md">
 
                    <img src={idx?.productDetails?.product?.images[0]} className="object-cover w-40 !h-40 rounded-md" alt="" />
                    {/* <div className="flex items-center justify-between w-24 mt-2 overflow-hidden border rounded-md">
                        <button
                                onClick={()=>handleDecrement(index,idx)}
                                className="text-xl font-semibold px-[10px] py-1 hover:bg-yellow-400 hover:text-black"
                            >
                                -
                            </button>
                            <span className="text-xl">{counts[index]}</span>
                            <button
                                onClick={()=>handleIncrement(index,idx)}
                                className="px-2 py-1 text-xl font-semibold hover:bg-yellow-400 hover:text-black"
                            >
                                +
                            </button>
                            </div> */}
                  </div>
                    <div className="flex flex-col w-full h-full py-2 md:justify-between md:flex-row">
                     <div className="flex flex-col h-full gap-2">
                      <p className="font-semibold">{idx?.productDetails?.product?.name}</p>
                      <p className="font-medium">{idx?.productDetails?.variant?.size}</p>
                      <p className="font-medium"><span>Order Placed On :</span> {isFormattedDate(idx?.date)} {isFormatTime(idx?.date)}</p>
                      <p className="font-bold text-green-500">₹ {idx?.totalAmount}</p>
                      </div>
                      <div className="flex flex-col h-full mt-4 md:mt-0 md:items-end">
                      <p className="flex items-center gap-1 px-2 py-1 text-orange-400 capitalize w-fit rounded-xl h-fit bg-orange-400/10"><FaDotCircle size={10}  className="w-full"/>{idx?.status}</p>
                      <p className="font-medium md:mt-10"><span>Delivery expected by </span> {isFormattedDate(idx?.expectedDeliveryDate)}</p>
                    </div>
                    </div>
              </div>
        </div>
            ))
        ) : (
            <div></div>
        )}
        
         </div>
          <div className="mt-4 box-footer">
                <div className="items-center sm:flex">
                  <div className="text-defaulttextcolor/70">
                    Showing {(currentPage) * itemsPerPage + 1} to{' '}
                    {Math.min((currentPage + 1) * itemsPerPage, productData?.pagination?.total)} of{' '}
                    {productData?.pagination?.total} entries
                    <i className="font-semibold bi bi-arrow-right ms-2"></i>
                  </div>

                  <div className="ms-auto">
                    <nav aria-label="" className="pagination-style-1">
                      <ul className="flex items-center justify-center gap-2 ti-pagination">
                        <li className={` ${currentPage === 0 ? 'disabled' : ''} rtl:rotate-180`}>
                          <button aria-label="Previous" className="flex items-center justify-center page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
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
                          <button aria-label="Next" className="flex items-center justify-center page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                          <MdOutlineKeyboardDoubleArrowRight />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </>
        ) : (
            <NoDataFound/>
        )}
       
    </>
    )} 
   
          

     </div>
        </div>
    </div>
    </div>
  )
}

export default MyOrders
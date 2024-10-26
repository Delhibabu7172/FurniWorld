import { useQuery } from "@tanstack/react-query"
import { getCategoryLandingApi, getProductLandingApi } from "../../../api-service/landingApi"
import { BsArrowRight } from "react-icons/bs"
import { MdOutlineShoppingBag } from "react-icons/md"
import { FaRegStar, FaStar } from "react-icons/fa"
import { LuIndianRupee } from "react-icons/lu"
import { useState } from "react"
import Pagination from "../../../components/pagination"
import { Circles } from "react-loader-spinner"
import { BiSearch } from "react-icons/bi"
import NoDataFound from "../../../components/noDataFound"
import { useLocation } from "react-router-dom"


function AuthProducts() {

    const location = useLocation();
      
      const initialStatus = location.state?.status || '';

    const [search , setSearch] = useState('')
    const [selectedCategory , setSelectCategory] = useState(initialStatus)
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const getCategoryData = useQuery({
        queryKey : ['getCategoryData'],
        queryFn : () => getCategoryLandingApi(``)
    })

    const categoryData = getCategoryData?.data?.data?.result

    const getproductData = useQuery({
        queryKey : ['getproductData', search , selectedCategory, currentPage],
        queryFn : () => getProductLandingApi(`?search=${search}&currentPage=${currentPage}&category=${selectedCategory}`)
    })

    const productData = getproductData?.data?.data?.result
    const totalPages = productData?.pagination?.pages;
const handlePageChange = (page: any) => {
  setCurrentPage(page);
}

    const handleCategory = (data : any)=> {
        setSelectCategory(data?._id || '')
    }

  return (
    <div className="grid grid-cols-12 gap-3 font-Lexend">
        <div className="col-span-2 border-r-2 border-t-2 border-b-2">
            <div>
                <p className="text-lg font-bold text-center bg-slate-300 py-3">Categories</p>
                {categoryData?.length > 0 ? (
                    <div className="flex flex-col gap-1 px-3 mt-2 mb-2">
                    <p
                      className={` px-2 py-1 cursor-pointer rounded-sm flex justify-between items-center ${selectedCategory === '' ? 'bg-yellow-400' : 'hover:bg-yellow-400'}`}
                      onClick={() => handleCategory('')} // To reset the selected category when "All" is clicked
                    >
                      All {selectedCategory === '' ? <BsArrowRight /> : ""}
                    </p>
                    {categoryData?.map((idx: any, index: number) => (
                      <div key={index}>
                        <p
                          className={`px-2 py-1 cursor-pointer rounded-sm  flex justify-between items-center
                            ${selectedCategory === idx._id ? 'bg-yellow-400' : 'hover:bg-yellow-400'}`}
                          onClick={() => handleCategory(idx)}
                        >
                          {idx?.name} {selectedCategory === idx?._id ? <BsArrowRight /> : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : ""}
            </div>
        </div>
        <div className="col-span-10">
        <div className="px-[2%] my-3">

        <div className="flex justify-between gap-4 md:gap-0">
        <p className="text-transparent text-xl lg:text-2xl xl:text-3xl text-stroke">
                    Products
                  </p>
       <div className="relative">
        <input type="search"
        onChange={(e)=>setSearch(e.target.value)} className="w-64 px-3 py-2 border border-primaryColor rounded-sm outline-none" placeholder="Search Here...."/>
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
                <div className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 p-2 border rounded-sm border-primaryColor/10 group" key={index}>
                <div className="bg-[#E9E9E9] border border-primaryColor/5 rounded-md w-full h-72 flex justify-center items-center relative  px-10 py-10 group-hover:cursor-pointer">
                    <img src={idx?.images[0]} className="h-full group-hover:scale-110 transform transition-all duration-300 ease-in" alt="" />
                    <p className="absolute top-0 left-0 px-2 py-1 text-xs text-white bg-green-600 rounded-br-2xl rounded-tl-md">New</p>
                        <div className="hidden group-hover:flex absolute bottom-2 z-50 left-[50%] transform translate-x-[-50%] translate-y-0 transition-all duration-500 ease-in-out group-hover:-translate-y-10">
                            <div className="flex items-center gap-2">
                                <MdOutlineShoppingBag className=" bg-white border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
                                <MdOutlineShoppingBag className=" bg-white border border-primaryColor/10 w-9 h-9 p-[6px] rounded-lg flex justify-center items-center hover:text-white hover:bg-primaryColor hover:transform hover:transition-all hover:duration-200" />
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
                        <p className="flex items-center"><LuIndianRupee  /> {idx?.sizes[0]?.offerPrice} <span className="text-xs line-through ms-2">MRP. <span className="text-xs">₹ {idx?.sizes[0]?.MRP}</span></span></p>
                    </div>
                </div>
        </div>
            ))
        ) : (
            <div></div>
        )}
        
         </div>
          <div className="box-footer">
                <div className="sm:flex items-center">
                  <div className="text-defaulttextcolor/70">
                    Showing {(currentPage) * itemsPerPage + 1} to{' '}
                    {Math.min((currentPage + 1) * itemsPerPage, productData?.pagination?.total)} of{' '}
                    {productData?.pagination?.total} entries
                    <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                  </div>

                  <div className="ms-auto">
                    <nav aria-label="" className="pagination-style-1">
                      <ul className="ti-pagination mb-0">
                        <li className={` ${currentPage === 0 ? 'disabled' : ''} rtl:rotate-180`}>
                          <button aria-label="Previous" className="page-link " onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            <i className="ri-arrow-left-s-line align-middle"></i>
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
                          <button aria-label="Next" className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                            <i className="ri-arrow-right-s-line align-middle"></i>
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
  )
}

export default AuthProducts
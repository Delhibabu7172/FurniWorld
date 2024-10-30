import { useQuery } from "@tanstack/react-query";
import { deleteCartApi, getCartApi } from "../../../api-service/landingApi";
import { Circles } from "react-loader-spinner";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import whilistImg from "../../../assets/images/NoData/cart.svg"

function CartModal({ openModal , handleClose  } : any) {

  if(!openModal) return null;

  const hasToken = localStorage.getItem('access-token')
  const navigate = useNavigate()

     // for cart show in ui 
     const getCartData = useQuery({
      queryKey : ['getCartData'],
      queryFn : () => getCartApi(``),
      enabled : !!hasToken
  })

  const cartData = getCartData?.data?.data?.result

  const handleMyCart = async (data : any) => {
    
            const deleteApi = await deleteCartApi(cartData?._id,data?._id)
            if(deleteApi?.status === 200){
              getCartData?.refetch()
                toast.success('Product Removed From Cart.')
               
            }
      }

  return (
      <div className="fixed  inset-0 z-[1000] flex justify-end px-40 pt-14 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-xl w-full flex flex-col  max-h-[85%] 2xl:max-h-[60%] h-full overflow-hidden animate-slideTop">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b">
          <h2 className="text-lg font-medium">Shopping Cart</h2>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
       </div>
       <div className="overflow-y-scroll hide-scrollbar">
       {hasToken ? (
        getCartData?.isLoading ? (
          <div className="h-[10vh] flex justify-center items-center">
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
          <div>
            <div className="px-5 py-1  ">
            {cartData?.products?.length > 0 ? (
              <>
              {cartData?.products?.map((idx:any,index:number) => (
                <div className="flex justify-between items-center gap-3 border-b-[1px] pb-5 pt-5" key={index}>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-28 2xl:w-32 2xl:h-32 flex justify-center items-center border rounded-lg">
                  <img src={idx?.product?.images[0]} className="w-24 h-24 2xl:w-28 2xl:h-28 rounded-md" alt="" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>{idx?.product?.name}</p>
                    <p className="font-bold text-lg">₹ {idx?.total}</p>
                  </div>
                </div>
                <button className="bg-slate-200 p-2 rounded-sm" 
                onClick={()=>handleMyCart(idx)}>
                <BiTrash/>
                </button>
                </div>
              ))}
              <div className="flex items-center gap-5 w-full px-5 py-3">
                          <button className="border border-primaryColor py-2 w-full rounded-md hover:bg-primaryColor hover:text-white"
                          onClick={()=>{navigate('/cart'),handleClose()}}>View Cart</button>
                          <button className="w-full border border-primaryColor py-2 rounded-md bg-primaryColor text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400">CheckOut</button>
                        </div>
              </>
              
            ) : (
              <div className="flex justify-center items-center  pt-20 flex-col">
              <p>No Data Found</p>
              <button className="mt-3 bg-primaryColor text-white p-2 rounded-md hover:bg-yellow-400 hover:text-black"
              onClick={()=>{navigate('/products'),handleClose()}}>Continue To Purchase</button>
              </div>
            )}
          </div>
          
          </div>
          )
       ) : (
        <div className="col-span-12 text-center flex flex-col justify-center items-center gap-2 shadow-2xl  py-4">
                <img src={whilistImg} className="w-52" alt="" />
                <p>No Cart is There....</p>
                <p className="bg-primaryColor text-white hover:bg-yellow-400 hover:text-black px-3 py-2 rounded-md cursor-pointer"
                onClick={()=>{navigate('/products'),handleClose()}}>Please Continue to Purchase</p>
            </div>
       )}
       </div>
      </div>
      </div>
  )
}

export default CartModal
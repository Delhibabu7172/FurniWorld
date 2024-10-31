import { useDispatch, useSelector } from "react-redux";
import Pageheader from "../../../components/PageHeader";
import { FaCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../../api-service/authApi";
import { postDefaultAddressApi, postOrderApi } from "../../../api-service/landingApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentPage } from "../../../redux/slices/delivery";
// import { BiTrash } from "react-icons/bi";


function CheckoutPage() {

    const navigate = useNavigate()

    const location = useLocation();
    const productDetails = location.state?.products;

    console.log(productDetails);

// Calculate gross value (total of single prices without discount)
const grossValue = productDetails?.reduce((acc: number, item: any) => acc + item.singlePrice * item.quantity, 0);

// Calculate discounted total (total after applying offer prices)
const discountedTotal = productDetails?.reduce((acc: number, item: any) => acc + item.offerPrice * item.quantity, 0);

// Calculate the savings (difference between gross value and discounted total)
const totalSavings = Number(grossValue - discountedTotal);
    
console.log("Gross Value:", grossValue);             // e.g., 11000
console.log("Discounted Total:", discountedTotal);   // e.g., 9000
console.log("Total Savings:", totalSavings);         // e.g., 2000
    

    const currentPage = useSelector(
        (store: any) => store.basicInformation.currentPage
     );

    const page = {
        currentpage: `Checkout`,
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: `Checkout`, path: '/app/dmList' },
        ]
    };

    const steps = [
        'Delivery',
        'Confirmation',
        'Payment'
    ]

    const getProfileData = useQuery({
        queryKey : ['getProfileData'],
        queryFn : () => getProfileApi()
    })
  
    const profileData = getProfileData?.data?.data?.result

     // for handle default 
     const handleDefaultAddress =  async (id :any) =>{
        const deafultApi = await postDefaultAddressApi(id)
        if(deafultApi?.status === 200){
            toast.success(deafultApi?.data?.msg)
            getProfileData?.refetch()
        }
    }

  //   const getCartData = useQuery({
  //     queryKey : ['getCartData'],
  //     queryFn : () => getCartApi(``)
  // })

  // const cartData = getCartData?.data?.data?.result

    // const handleMyCart = async (data : any) => {
    //   console.log(data?.variant?._id);
      
    //         const deleteApi = await deleteCartApi(cartData?._id,data?._id)
    //         if(deleteApi?.status === 200){
    //           getCartData?.refetch()
    //             toast.success('Product Removed From Cart.')
               
    //         }
    //   }

    const renderPageContent = (step: any) => {
        try {
          switch (step) {
            case 1:
              return <div className="px-5 py-5">
                    <p className="text-base font-bold">Shipping Method</p>
                    <div className="flex flex-col mt-3 md:gap-5 md:items-center md:flex-row">
                        <div className="flex items-center gap-2">
                            <input type="radio"
                            checked 
                            className="cursor-pointer" />
                            <p className="font-light text-black/50">I Want to use an existing address</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" 
                            className="cursor-pointer"
                            onClick={()=>navigate('/address')}/>
                            <p className="font-light text-black/50">I want to use an new  address</p>
                        </div>
                    </div>
                    {profileData?.shippingAddress?.map((idx:any,index:number) => (
                             <div className="flex items-center justify-between gap-4 p-3 mt-4 border rounded-md" key={index}>
                             <div className="flex items-center gap-3">
                             <div className="w-4 h-4">
                                 <input 
                                 checked={idx?.defaultAddress ===  true}
                                 onChange={() =>handleDefaultAddress(idx?._id)}
                                 type="radio" className="w-4 h-4 cursor-pointer" />
                             </div>
                             <p>{idx?.address},{idx?.landmark ? idx?.landmark : ""},{idx?.city},{idx?.state}-{idx.pincode}</p>
                             </div>
                         </div>
                        ))}
              </div>;
            case 2:
              return <div className="px-5 py-5">
                  <p className="text-base font-bold">Order Conformation</p>
                  {productDetails?.map((idx:any,index:number) => (
                  <div className="flex flex-col w-full gap-4 p-2 mt-4 border rounded-md md:flex-row" key={index}>
                  <div className="relative flex flex-col items-center justify-center gap-2 p-3 border rounded-md min-w-56 min-h-48">
 
                    <img src={idx?.product?.images[0]} className="object-cover w-40 h-40 rounded-md" alt="" />
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
                  <div className="w-full py-2">
                    <div className="flex items-center justify-between w-full">
                     <div>
                      <p className="font-semibold">{idx?.product?.name}</p>
                      <p className="font-medium">{idx?.variant?.size}</p>
                      </div>
                      {/* <button className="text-red-500" 
                      onClick={()=>handleMyCart(idx)}><BiTrash size={25}/></button> */}
                    </div>
                    <hr  className="my-3"/>
                    <div>
                      <p className="text-base">Price Details</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-black/50">Single Price</p>
                        <p>₹<span className="font-semibold">{idx?.variant?.MRP}</span></p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-black/50">Offer Price</p>
                        <p>₹<span className="font-semibold">{idx?.variant?.offerPrice ? parseFloat(idx?.variant?.offerPrice).toFixed(0) : "-"}</span></p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-black/50">Quantity</p>
                        <p><span className="font-semibold">{idx?.quantity}</span></p>
                      </div>
                      <hr  className="my-3"/>
                      <div className="flex items-center justify-between">
                        <p className="text-black">Total Price</p>
                        <p>₹<span className="text-lg font-bold">{idx?.total ? parseFloat(idx?.total).toFixed(0) : "-"}</span></p>
                      </div>
                    </div>
                  </div>
              </div>
                ))}
              </div>;
            case 3:
              return <div className="px-5 py-5">
                <p className="text-base font-bold">Select your payment method</p>
                <div className="flex items-center gap-2 px-5 py-3 mt-4 border rounded-md">
                  <input type="radio"
                  checked />
                  <div className="gap-2">
                  <p>Cash On Delivery</p>
                  <p className="text-xs text-black/50">Pay with Cash On Delivery</p>
                  </div>
                </div>
              </div>;
            default:
              return null;
          }
        } catch (error) {
          console.error("Error rendering content:", error);
          return <div>Error loading content.</div>;
       }
      };

    
  const dispatch = useDispatch();

      const handleStepClick = (stepIndex: number) => {
        dispatch(setCurrentPage(stepIndex + 1));
      };

      const handlePlaceOrder = async () => {

        const defaultShippingAddressId = profileData?.shippingAddress?.find(
          (address: any) => address.defaultAddress === true
        )?._id;

        const payload = {
          shipping : defaultShippingAddressId || '',
          products : productDetails?.map((item:any) => item?._id)
        }

        console.log(payload);
        const uploadApi = await postOrderApi(payload)
        if(uploadApi?.status === 200){
          toast.success(uploadApi?.data?.msg)
          navigate('/orders')
        }
      }

  return (
   <>
   <Pageheader data={page} />
   <div className="grid grid-cols-12 gap-4 font-Lexend px-[4%]">
    <div className="col-span-12 my-5 lg:col-span-8 ">
    <div className="flex justify-center">
      {steps?.map((step: string, i: number) => (
        <div
          key={i}
          className={`relative flex flex-col justify-center items-center w-64 
            ${currentPage === i + 1 ? "text-white" : "text-gray-500"} 
            ${i + 1 < currentPage ? "text-white" : "text-gray-500"}`}
          onClick={() => handleStepClick(i)}
          style={{ cursor: 'pointer' }}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-sm rotate-45 font-semibold 
              ${i + 1 < currentPage ? "bg-green-600" : currentPage === i + 1 ? "bg-sky-600" : "bg-slate-700"}`}
          >
            <p className="-rotate-45">
              {i + 1 < currentPage ? (
                <FaCheck className="w-5 h-5" />
              ) : (
                i + 1
              )}
            </p>
          </div>
          <p className="mt-2 text-gray-500">{step}</p>
          {i !== 0 && (
            <div
              className={`absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4 
                ${i + 1 <= currentPage ? "bg-green-600" : "bg-slate-200"}`}
            />
          )}
        </div>
      ))}
    </div>
     <div>
        {renderPageContent(currentPage)}
     </div>
    </div>
   
   <div className="col-span-12 border rounded-md md:col-span-6 lg:col-span-4 h-fit">
                <p className="px-5 py-3 text-xl font-bold">Order Summary</p>
                <hr />
                <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg text-black/70">Gross Amount</p>
                  <p>₹ <span className="text-lg font-semibold">{grossValue}</span></p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg text-black/70">Discount Amount</p>
                  <p>₹ <span className="text-lg font-semibold">{totalSavings.toFixed(0)}</span></p>
                </div>
                {/* <div className="flex items-center justify-between">
                  <p className="text-lg text-black/70">GST Amount</p>
                  <p>₹ <span className="text-lg font-semibold">{cartData?.totalGst ? parseFloat(cartData?.totalGst).toFixed(0) : "-"}</span></p>
                </div> */}
                </div>
                <hr className="px-6" />
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="text-lg font-semibold text-black">Total Amount</p>
                  <p>₹ <span className="text-xl font-bold">{discountedTotal.toFixed(0)}</span></p>
                </div>
                <div className="mx-5 mb-3">
                  <button className="w-full py-3 text-xl font-bold text-white rounded-sm bg-primaryColor hover:bg-yellow-400 hover:text-black"
                   disabled={currentPage != 3} // Disable if no items are selected
                  onClick={()=>handlePlaceOrder()}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>

   </div>
   </>
  )
}

export default CheckoutPage
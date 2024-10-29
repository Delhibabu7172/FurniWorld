import { Circles } from "react-loader-spinner";
import Pageheader from "../../../components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { deleteCartApi, getCartApi } from "../../../api-service/landingApi";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function CartPage() {

  const page = {
    currentpage: `Cart`,
    breadcrumbs: [
        { label: 'Home', path: '/' },
        { label: `Cart`, path: '/app/dmList' },
    ]
};

const [selectedItems, setSelectedItems] = useState<number[]>([]); // Track selected items by their index

const navigate = useNavigate()

     // for cart show in ui 
     const getCartData = useQuery({
      queryKey : ['getCartData'],
      queryFn : () => getCartApi(``)
  })

  const cartData = getCartData?.data?.data?.result

  
// const [counts, setCounts] = useState(
//   cartData?.products?.reduce((acc: any, _: any, idx: number) => {
//     acc[idx] = 1; // Initialize each item with a count of 1
//     return acc;
//   }, {})
// );

// // Increment count for a specific index
// const handleIncrement = (index: number, data: any) => {
//   setCounts((prevCounts: any) => {
//     const updatedCount = prevCounts[index] + 1;
//     handleQuantity(data, updatedCount); // Call API with updated count
//     return {
//       ...prevCounts,
//       [index]: updatedCount
//     };
//   });
// };

// const handleDecrement = (index: number, data: any) => {
//   setCounts((prevCounts: any) => {
//     const updatedCount = prevCounts[index] > 1 ? prevCounts[index] - 1 : 1;
//     handleQuantity(data, updatedCount); // Call API with updated count
//     return {
//       ...prevCounts,
//       [index]: updatedCount
//     };
//   });
// };

// const handleQuantity = async (data: any, quantity: number) => {
//   const payload = {
//     product: data?._id,
//     variant: data?.variant?._id,
//     quantity: quantity,
//     singlePrice: data?.variant?.offerPrice
//   };
//   console.log("Payload:", payload);
//   const cartApi = await postAddCartApi(payload);
//   if (cartApi?.status === 200) {
//     toast.success('Product quantity updated in Cart.');
//     getCartData?.refetch();
//   }
// };

  const handleMyCart = async (data : any) => {
      console.log(data?.variant?._id);
      
            const deleteApi = await deleteCartApi(cartData?._id,data?.variant?._id)
            if(deleteApi?.status === 200){
              getCartData?.refetch()
                toast.success('Product Removed From Cart.')
               
            }
      }


      const handleCheckboxChange = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
          if (prevSelectedItems.includes(index)) {
            // Remove item if already selected
            return prevSelectedItems.filter((i) => i !== index);
          } else {
            // Add item if not selected
            return [...prevSelectedItems, index];
          }
        });
      };


  return (
    <>
    <div className="mt-3 font-Lexend">
        <Pageheader data={page} />
        {getCartData?.isLoading ? (
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
      <div className="px-[4%] py-4">
          <div className="grid grid-cols-12 gap-4">
             <div className="col-span-7 w-full max-h-screen overflow-y-scroll hide-scrollbar">
              {cartData?.products?.length > 0 ? (
                cartData?.products?.map((idx:any,index:number) => (
                  <div className="border rounded-md p-2 flex gap-4 w-full" key={index}>
                  <div className="border rounded-md p-3 flex justify-center items-center flex-col gap-2 min-w-56 min-h-48 relative">
 
                    <img src={idx?.product?.images[0]} className="w-40 h-40 object-cover rounded-md" alt="" />
                    {/* <div className="flex items-center border rounded-md w-24 justify-between overflow-hidden mt-2">
                        <button
                                onClick={()=>handleDecrement(index,idx)}
                                className="text-xl font-semibold px-[10px] py-1 hover:bg-yellow-400 hover:text-black"
                            >
                                -
                            </button>
                            <span className="text-xl">{counts[index]}</span>
                            <button
                                onClick={()=>handleIncrement(index,idx)}
                                className="text-xl font-semibold px-2 py-1 hover:bg-yellow-400 hover:text-black"
                            >
                                +
                            </button>
                            </div> */}
                            <div className="absolute top-2 left-2 w-6 h-6">
                              <input type="checkbox"
                              checked={selectedItems.includes(index)}
                              onChange={()=>handleCheckboxChange(index)}
                              className="h-[18px] w-[18px] cursor-pointer checked:bg-primaryColor" name="" id="" />
                            </div>
                  </div>
                  <div className="w-full py-2">
                    <div className="flex items-center justify-between w-full">
                     <div>
                      <p className="font-semibold">{idx?.product?.name}</p>
                      <p className="font-medium">{idx?.variant?.size}</p>
                      </div>
                      <button className="text-red-500" 
                      onClick={()=>handleMyCart(idx)}><BiTrash size={25}/></button>
                    </div>
                    <hr  className="my-3"/>
                    <div>
                      <p className="text-base">Price Details</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-black/50">Single Price</p>
                        <p>₹<span className="font-semibold">{idx?.variant?.MRP}</span></p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-black/50">Offer Price</p>
                        <p>₹<span className="font-semibold">{idx?.variant?.offerPrice ? parseFloat(idx?.variant?.offerPrice).toFixed(0) : "-"}</span></p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-black/50">Quantity</p>
                        <p><span className="font-semibold">{idx?.quantity}</span></p>
                      </div>
                      <hr  className="my-3"/>
                      <div className="flex justify-between items-center">
                        <p className="text-black">Total Price</p>
                        <p>₹<span className="font-bold text-lg">{idx?.total ? parseFloat(idx?.total).toFixed(0) : "-"}</span></p>
                      </div>
                    </div>
                  </div>
              </div>
                ))
                
              ) : (
                <div></div>
              )}
             
             </div>
              <div className="col-span-5 border rounded-md h-fit">
                <p className="py-3 px-5 font-bold text-xl">Order Summary</p>
                <hr />
                <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg text-black/70">Gross Amount</p>
                  <p>₹ <span className="font-semibold text-lg">{cartData?.grossAmount}</span></p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-black/70">Discount Amount</p>
                  <p>₹ <span className="font-semibold text-lg">{cartData?.discountAmount ? parseFloat(cartData?.discountAmount).toFixed(0) : "-"}</span></p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-black/70">GST Amount</p>
                  <p>₹ <span className="font-semibold text-lg">{cartData?.totalGst ? parseFloat(cartData?.totalGst).toFixed(0) : "-"}</span></p>
                </div>
                </div>
                <hr className="px-6" />
                <div className="flex justify-between items-center px-6 py-4">
                  <p className="text-lg text-black font-semibold">Total Amount</p>
                  <p>₹ <span className="font-bold text-xl">{cartData?.totalAmount ? parseFloat(cartData?.totalAmount).toFixed(0) : "-"}</span></p>
                </div>
                <div className="mx-5 mb-3">
                  <button className="bg-primaryColor text-white py-3 rounded-sm w-full font-bold text-xl hover:bg-yellow-400 hover:text-black"
                   disabled={selectedItems.length === 0} // Disable if no items are selected
                  onClick={()=>navigate('/address')}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
          </div>
      </div>
    )}
    </div>
    
    </>
  )
}

export default CartPage
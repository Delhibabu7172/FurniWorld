import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { deleteCartApi, getCartApi, getProductLandingApi, postAddCartApi } from "../../../api-service/landingApi"
import Pageheader from "../../../components/PageHeader"
import { useEffect, useState } from "react"
import { Circles } from "react-loader-spinner"
import { FaRegStar, FaStar } from "react-icons/fa"
import toast from "react-hot-toast"
import SignUpModal from "../../../components/signUpModal"


function ProductSingleView() {

    const { id } = useParams()

    const hasToken  = localStorage.getItem('access-token')
    const [noToken , setNoToken] = useState(false)

    const [cartItems, setCartItems] = useState<any>([]);

    const getproductData = useQuery({
        queryKey: ['getproductData', id],
        queryFn: () => getProductLandingApi(`/${id}`)
    })

    const productData = getproductData?.data?.data?.result

    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(productData?.images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedPrice, setSelectedPrice] = useState(productData?.variants[0] ? productData?.variants [0] : []);
    
    const page = {
        currentpage: `Product`,
        breadcrumbs: [
            { label: 'Product', path: '/products' },
            { label: `${productData?.name}`, path: '/app/dmList' },
        ]
    };

    useEffect(() => {
        // Start interval to update image every 3 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % productData?.images.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [productData?.images.length]);
    

    useEffect(() => {
        // Update the selected image whenever currentIndex changes
        setSelectedImage(productData?.images[currentIndex]);
    }, [currentIndex, productData?.images]);





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
    
 
// Initialize selected price based on productData or cartData when available
useEffect(() => {
    // Set the first variant as the default when productData is initially loaded
    if (cartItems && cartItems.length > 0) {
        const cartVariantIds = cartItems.map((item: any) => item.variant?._id);
        
        const matchedVariant = productData?.variants?.find(
            (variant: any) => cartVariantIds.includes(variant?._id)
        );
        

        if (matchedVariant) {

            const matchedCartItem = cartItems.find(
                (item: any) => item.variant?._id === matchedVariant._id
            );

            // Set the matched variant's quantity if available, otherwise set default to 1
            const quantity = matchedCartItem ? matchedCartItem.quantity : 1;

            console.log('Matched Variant:', matchedVariant);
            setSelectedPrice(matchedVariant);
            setCount(quantity)
        } else {
            // If no match found, set the first variant as default
            setSelectedPrice(productData?.variants[0]);
            setCount(1)
        }
    } else if (productData?.variants?.length > 0) {
        setSelectedPrice(productData.variants[0]);
    }
}, [productData?.variants, cartItems]);





      

    // for pack deatils
    const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  // for my cart function
  const handleMyCart = async (data : any, cartProduct :any) => {
        
    if(hasToken){
        const inCart = cartItems.some((item:any) => item?.product?._id === data?._id)

        if (inCart) {
            
            const deleteApi = await deleteCartApi(cartData?._id,cartProduct?._id)
            if(deleteApi?.status === 200){
                toast.success('Product Removed From Cart.')
                setCartItems(cartItems.filter((item:any) => item?.product?._id !== data?._id));
                getproductData?.refetch()
                getCartData?.refetch()
            }
        }   
        else {
            console.log("not in cart");
                const payload = {
                    product: data?._id,
                    variant: selectedPrice?._id,
                    quantity: count,
                    singlePrice: selectedPrice?.offerPrice
                }
                console.log(payload);
                
                const cartApi = await postAddCartApi(payload)
                if(cartApi?.status === 200){
                    toast.success('Product added to Cart.')
                    setCartItems([...cartItems, { product: data }]);
                    getproductData?.refetch()
                    getCartData?.refetch()
                }
          }
    }else{
        setNoToken(true)
    }
}




    return (
        <>
        <div className="mt-3 font-Lexend">
            <Pageheader data={page} />
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
            <div className="grid grid-cols-12 gap-3 px-[5%] mt-5">
                <div className="col-span-5 flex gap-7 h-[350px] 2xl:h-[400px]">
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-full hide-scrollbar my-7">
                        {productData?.images?.map((item: any, index: number) => (
                            <img
                                key={index}
                                src={item}
                                alt=""
                                className={`w-20 cursor-pointer border-2 ${selectedImage === item ? 'border-yellow-400' : 'border-transparent'
                                    }`}
                                onClick={() => setSelectedImage(item)} // Update selected image on click
                            />
                        ))}
                    </div>

                    <div className="rounded-lg overflow-hidden border h-full bg-[#F8F8FB] w-[350px] 2xl:w-[400px] flex justify-center items-center">
                        <img src={selectedImage} alt="Selected" className="w-[80%] h-[85%]  object-contain" />
                    </div>
                </div>

                <div className="col-span-7">
                    <p className="font-medium flex flex-wrap text-2xl 2xl:text-3xl text-black/80">{productData?.name}</p>
                    <div className="flex items-end mt-2">
                        <p className="font-bold text-2xl">₹{parseFloat(selectedPrice?.offerPrice).toFixed(0)}</p>
                        <p className="line-through ms-2">₹ {selectedPrice?.MRP}</p>
                        <p className="bg-red-500 text-white text-sm font-light px-2 py-1 rounded-tl-2xl rounded-br-2xl ms-2">₹ {selectedPrice?.offer} % OFF</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaStar className="text-orange-500"/>
                    <FaRegStar className="text-orange-500"/>
                    </div>
                    <hr  className="my-4 mr-10"/>
                    <div>
                        <p className="font-semibold text-base">Capacity</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {productData?.variants?.length > 0 ? (
                                productData?.variants?.map((idx:any,index:number) => (
                                <p  key={index}
                                className={` cursor-pointer border-2 ${selectedPrice === idx ? 'bg-primaryColor text-white border' : 'border-dashed border-primaryColor/50'} px-2 py-1 rounded-md`}
                                onClick={() => setSelectedPrice(idx)}>{idx?.size}</p>
                                ))
                            ) : ''}
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="font-semibold text-base">Pack of</p>
                       <div className="flex items-center border rounded-md w-24 justify-between overflow-hidden mt-2">
                        <button
                                onClick={handleDecrement}
                                className="text-xl font-semibold px-[10px] py-1 hover:bg-yellow-400 hover:text-black"
                            >
                                -
                            </button>
                            <span className="text-xl">{count}</span>
                            <button
                                onClick={handleIncrement}
                                className="text-xl font-semibold px-2 py-1 hover:bg-yellow-400 hover:text-black"
                            >
                                +
                            </button>
                            </div>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                                <button className={`border  rounded-md px-3 py-2 transition-all duration-150 ${cartItems.some((item:any) => item?.product?._id === productData?._id) ? "bg-red-500 text-white" : " hover:bg-primaryColor hover:text-white border-primaryColor"} `}
                                onClick={() => {
                                    console.log(cartItems.some((item:any) => item?.product?._id === productData?._id));
                                    
                                    const cartItem = cartItems.find((item:any) => item?.product?._id === productData?._id);
                                    handleMyCart(productData, cartItem ? cartItem : null);
                                }}>{cartItems.some((item:any) => item?.product?._id === productData?._id) ?  "Remove Cart" : "Add To Cart"} </button>
                                <button className="border border-primaryColor bg-primaryColor text-white rounded-md px-3 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400">Buy Now</button>
                            </div>
                </div>
            </div>
        )}
        </div>
        
        {noToken && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg max-w-lg 2xl:max-w-xl w-full flex flex-col max-h-[90%] h-fit  animate-slideTop">
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b">
            <h2 className="text-lg font-medium">SignUp Modal</h2>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={()=>setNoToken(!noToken)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
         </div>
         <div className="overflow-y-scroll hide-scrollbar">
            <SignUpModal/>
         </div>
        </div>
        </div>
        )}
        </>
        
    )
}

export default ProductSingleView
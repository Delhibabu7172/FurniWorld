import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getProductLandingApi } from "../../../api-service/landingApi"
import Pageheader from "../../../components/PageHeader"
import { useEffect, useState } from "react"
import { Circles } from "react-loader-spinner"
import { FaRegStar, FaStar } from "react-icons/fa"


function ProductSingleView() {

    const { id } = useParams()

    const getproductData = useQuery({
        queryKey: ['getproductData', id],
        queryFn: () => getProductLandingApi(`/${id}`)
    })

    const productData = getproductData?.data?.data?.result

    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(productData?.images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedPrice, setSelectedPrice] = useState(productData?.sizes[0] ? productData?.sizes[0] : []);
    
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
    
    // for price select by default
    useEffect(() => {
        if (productData?.sizes?.length > 0) {
          setSelectedPrice(productData.sizes[0]); // Set the first size as default
        }
      }, [productData?.sizes]);

    // for pack deatils
    const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };


    return (
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
                            {productData?.sizes?.length > 0 ? (
                                productData?.sizes?.map((idx:any,index:number) => (
                                <p  key={index}
                                className={` cursor-pointer border-2 ${selectedPrice === idx ? 'bg-primaryColor text-white border' : 'border-dashed border-primaryColor/50'} px-2 py-1 rounded-md`}
                                onClick={() => setSelectedPrice(idx)}>{idx?.name}</p>
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
                                <button className="border border-primaryColor rounded-md px-3 py-2 hover:bg-primaryColor hover:text-white transition-all duration-150">Add To Cart</button>
                                <button className="border border-primaryColor bg-primaryColor text-white rounded-md px-3 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400">Buy Now</button>
                            </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default ProductSingleView
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductLandingApi } from "../../../api-service/landingApi";
import { LuIndianRupee } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


function DayofthedealSection() {

    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date("2024-10-31T00:00:00").getTime(); // Your target date
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (number: number) => String(number).padStart(2, "0");

    const getproductData = useQuery({
        queryKey : ['getproductData'],
        queryFn : () => getProductLandingApi(``)
    })

    const productData = getproductData?.data?.data?.result?.rows

    return (
        <div className="px-[4%] my-8">
            <div className="flex justify-between gap-4 md:gap-0">
                <div>
                    <p className="text-base md:text-lg">Day of the <span className="font-bold text-primaryColor">Deal</span></p>
                    <p className="text-xs md:text-sm text-black/70">Don't wait. The time will never be just right.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="px-2 py-1 md:px-4 md:py-2 rounded-xl bg-[#F8F8FB] flex items-end gap-1 md:gap-2">
                        <span className="flex flex-col"><span className="text-[10px]">Days</span><span>{formatNumber(timeLeft.days || 0)}</span></span> :{" "}
                        <span className="flex flex-col"><span className="text-[10px]">Hours</span><span>{formatNumber(timeLeft.hours || 0)}</span></span> :{" "}
                        <span className="flex flex-col"><span className="text-[10px]">Mins</span><span>{formatNumber(timeLeft.minutes || 0)}</span></span> :{" "}
                        <span className="flex flex-col"><span className="text-[10px]">Sec</span><span>{formatNumber(timeLeft.seconds || 0)}</span></span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mt-5">
                {productData?.length > 0 ? (
                    productData?.slice(0,4).map((idx:any,index:number) => (
                        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-2 border rounded-sm border-primaryColor/10 group" key={index}>
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
                                <p className="flex items-center"><LuIndianRupee  /> {idx?.sizes[0]?.price} <span className="text-xs line-through ms-2">MRP. <span className="text-xs">₹ 1,079.00</span></span></p>
                            </div>
                        </div>
                </div>
                    ))
                ) : (
                    <div></div>
                )}
                
            </div>
        </div>
    )
}

export default DayofthedealSection
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../../assets/images/home/bannerSection/furnitures.png"
import banner2 from "../../../assets/images/home/bannerSection/banner1.png"
import banner3 from "../../../assets/images/home/bannerSection/electronics.png"
import styleImg from "../../../assets/images/home/bannerSection/Image.png"
import styleBottomImg from "../../../assets/images/home/bannerSection/Container.png"

function BannerSection() {
  return (
    <div className=" bg-primaryColor/5 !h-[500px] overflow-hidden grid grid-cols-2 px-[4%] relative font-Lexend">
        <div className="flex flex-col items-start justify-center ">
                        <p className="font-bold text-[#777777] text-2xl mb-3">Flat 30% Off</p>
                        <div className="flex mb-7">
                        <p className="text-5xl font-extrabold ">Explore <span className="text-primaryColor">Modern</span></p>
                        <div className="-mt-10">
                        <img src={styleImg} className="w-10" alt="" />
                        </div>
                        </div>
                        <button className="px-3 py-1 rounded-md border-[1px] border-primaryColor text-primaryColor font-medium">Shop Now</button>
                    </div>
        <Carousel 
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        stopOnHover={true}
        className="flex items-center justify-center" >
                <div className="">
                        <img src={banner1} alt="" />
                </div>
                <div className="">
                    <img src={banner2} className="bg-no-repeat bg-cover"/>
                </div>
                <div className="">
                    <img src={banner3} className="bg-no-repeat bg-cover"/>
                </div>
            </Carousel>
            <div className="absolute bottom-2 left-16">
                <img src={styleBottomImg} className="w-14" alt="" />
            </div>
    </div>
  )
}

export default BannerSection
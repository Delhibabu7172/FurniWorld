import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from "../../../assets/images/home/testimonials/1.jpg.png"
import user from "../../../assets/images/home/testimonials/user.png"

function Testimonials() {
  return (
    <div className="relative flex py-10 md:py-20 lg:px-40">
        <div className="flex items-center !w-fit "> 
            <p className="rotate-[270deg] hidden lg:block  !w-fit text-transparent text-xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-stroke">Testimonials</p>
        </div>
        <div>
         <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          stopOnHover={true}
          className="w-fit"
          >

            <div className="flex flex-col items-center justify-center gap-4 lg:justify-start lg:flex-row">
                    <img src={img} className="h-48 !w-48"/>
                    <div className="flex flex-col lg:items-start w-fit">
                        <p className="font-bold">Priya Shankar</p>
                        <p>Customer</p>
                        <div className="p-1 mt-2 border rounded-md lg:p-3 ">
                            <p>Reddy Amman Agencies made my home appliance shopping so much easier! I found everything I needed at great prices, and the delivery was super fast. Highly recommend their service!</p>
                        </div>
                    </div>
                   
                </div>  
                <div className="flex flex-col items-center justify-center gap-4 lg:justify-start lg:flex-row">
                    <img src={img} className="h-48 !w-48"/>
                    <div className="flex flex-col lg:items-start w-fit">
                        <p className="font-bold">Priya Shankar</p>
                        <p>Customer</p>
                        <div className="p-1 mt-2 border rounded-md lg:p-3 ">
                            <p>Reddy Amman Agencies made my home appliance shopping so much easier! I found everything I needed at great prices, and the delivery was super fast. Highly recommend their service!</p>
                        </div>
                    </div>
                   
                </div>
            </Carousel>
            </div>
            <img src={user} className="absolute hidden rounded-md lg:block top-20 left-28 w-14 -rotate-6" alt="" />
            <img src={user} className="absolute hidden w-12 rounded-md lg:block bottom-4 left-36 rotate-6" alt="" />
            <img src={user} className="hidden lg:block absolute top-4 right-[50%] rounded-md w-12 -rotate-12" alt="" />
            <img src={user} className="hidden lg:block absolute top-24 right-[30%] rounded-md w-12 rotate-6" alt="" />
            <img src={user} className="hidden lg:block absolute top-16 right-[10%] rounded-md w-12 " alt="" />
            <img src={user} className="absolute hidden w-12 rounded-md lg:block bottom-10 right-36 rotate-6" alt="" />
            </div>
  )
}

export default Testimonials
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from "../../../assets/images/home/testimonials/1.jpg.png"
import user from "../../../assets/images/home/testimonials/user.png"

function Testimonials() {
  return (
    <div className="flex py-20 px-40 relative">
        <div className="flex items-center !w-fit "> 
            <p className="rotate-[270deg]  !w-fit text-transparent text-xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-stroke">Testimonials</p>
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
          className=""
          >

            <div className="flex items-center gap-4">
                    <img src={img} className="h-48 !w-48"/>
                    <div className="flex flex-col items-start">
                        <p className="font-bold">Priya Shankar</p>
                        <p>Customer</p>
                        <div className="border p-3 rounded-md max-w-xl mt-2">
                            <p>Reddy Amman Agencies made my home appliance shopping so much easier! I found everything I needed at great prices, and the delivery was super fast. Highly recommend their service!</p>
                        </div>
                    </div>
                   
                </div>  
                <div className="flex items-center gap-4">
                    <img src={img} className="h-48 !w-48"/>
                    <div className="flex flex-col items-start">
                        <p className="font-bold">Priya Shankar</p>
                        <p>Customer</p>
                        <div className="border p-3 rounded-md max-w-xl mt-2">
                            <p>Reddy Amman Agencies made my home appliance shopping so much easier! I found everything I needed at great prices, and the delivery was super fast. Highly recommend their service!</p>
                        </div>
                    </div>
                   
                </div>
            </Carousel>
            </div>
            <img src={user} className="absolute top-4 left-28 rounded-md w-14 -rotate-6" alt="" />
            <img src={user} className="absolute bottom-4 left-36 rounded-md w-12 rotate-6" alt="" />
            <img src={user} className="absolute bottom-4 left-36 rounded-md w-12 rotate-6" alt="" />
            <img src={user} className="absolute bottom-4 left-36 rounded-md w-12 rotate-6" alt="" />
            <img src={user} className="absolute top-0" alt="" />
            </div>
  )
}

export default Testimonials
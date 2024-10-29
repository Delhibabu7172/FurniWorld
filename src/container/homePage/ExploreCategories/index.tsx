import { useQuery } from "@tanstack/react-query"
import leftImg from "../../../assets/images/home/exploreCategories/category.jpg.svg"
import Marquee from "react-fast-marquee"
import { getCategoryLandingApi } from "../../../api-service/landingApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function ExploreCategories() {

  const navigate = useNavigate()

  const [isPaused, setIsPaused] = useState(false);

  const getCategoryData = useQuery({
    queryKey : ['getCategoryData'],
    queryFn : () => getCategoryLandingApi(``)
})

const categoryData = getCategoryData?.data?.data?.result

  return (
    <div className="px-[4%] mt-6">
        <div className="relative grid grid-cols-12 gap-2">
                <div className="col-span-5 md:h-[320px] lg:h-[430px] xl:h-[500px]">
                        <img src={leftImg} className="w-full h-full" alt="" />
                </div>
                <div className="col-span-7 ">
                  <p className="text-transparent text-xl sm:text-3xl md:text-7xl lg:text-8xl xl:text-9xl text-stroke">
                    Explore Categories
                  </p>
                  <div className="absolute bottom-0 z-50 bg-white py-2 px-2 lg:py-5 lg:px-5 right-3 w-[62%] rounded-xl shadow-lg border-t-[1px] border-r-[1px] border-primaryColor/10">
                  <div
      className="testing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Marquee
        direction="right"
        speed={isPaused ? 0 : 10} // Pause when hovered
        loop={0}
        gradient={false}
      >
        {categoryData?.length > 0 ? (
          <div className="flex flex-wrap">
            {categoryData?.map((item:any, index:number) => (
              <div
                className={`w-44 py-2 lg:py-5 flex flex-col justify-center items-center rounded-xl me-3 cursor-pointer ${
                  index % 2 === 0 ? 'bg-[#F4F1FE]' : 'bg-[#FBF9F4]'
                }`}
                key={index}
                onClick={() => navigate(`/products`, { state: { status: `${item._id}` } })}
              >
                <img src={item?.icon} className="mb-1 w-14 h-14 2xl:w-16 2xl:h-16" alt="" />
                <p className="font-bold">{item?.name}</p>
                <p className="">{item?.products} items</p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </Marquee>
    </div>
                  </div>
                </div>
        </div>
    </div>
  )
}

export default ExploreCategories
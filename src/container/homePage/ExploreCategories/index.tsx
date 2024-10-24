import leftImg from "../../../assets/images/home/exploreCategories/category.jpg.svg"
import Marquee from "react-fast-marquee"

function ExploreCategories() {

  const mockData = [
    {
      icon : leftImg,
      title : 'cooker',
      count : '49',
      color : 'bg-[#F4F1FE]'
    },
    {
      icon : leftImg,
      title : 'Non Stick Tawa',
      count : '49',
      color : 'bg-[#FBF9F4]'
    },
    {
      icon : leftImg,
      title : 'Chair',
      count : '49',
      color : 'bg-[#F4F1FE]'
    },
    {
      icon : leftImg,
      title : 'Table',
      count : '49',
      color : 'bg-[#FBF9F4]'
    },
    {
      icon : leftImg,
      title : 'cooker',
      count : '49',
      color : 'bg-[#F4F1FE]'
    },
    {
      icon : leftImg,
      title : 'cooker',
      count : '49',
      color : 'bg-[#FBF9F4]'
    },
  ]
  return (
    <div className="px-[4%] mt-6">
        <div className="relative grid grid-cols-12 gap-2">
                <div className="col-span-5 md:h-[320px] lg:h-[430px] xl:h-[500px]">
                        <img src={leftImg} className="w-full h-full" alt="" />
                </div>
                <div className="col-span-7 ">
                  <p className="text-transparent text-7xl lg:text-8xl xl:text-9xl text-stroke">
                    Explore Categories
                  </p>
                  <div className="absolute bottom-0 z-50 bg-white py-2 px-2 lg:py-5 lg:px-5 right-3 w-[62%] rounded-xl shadow-lg border-t-[1px] border-r-[1px] border-primaryColor/10">
                      <Marquee
                      className=" testing"
                      direction="right"
                      speed={10}
                      loop={0}
                      gradient={false}>
                          <div className="flex flex-wrap">
                            {mockData?.map((item:any,index:number) => (
                              <div className={`${item?.color} w-44 py-2 lg:py-5 flex flex-col justify-center items-center  rounded-xl me-3`} key={index}>
                                <img src={item?.icon} className="mb-1 w-14 h-14 2xl:w-16 2xl:h-16" alt="" />
                                <p className="font-bold">{item?.title}</p>
                                <p className="">{item?.count} items</p>
                              </div>
                            ))}
                          </div>
                      </Marquee>
                  </div>
                </div>
        </div>
    </div>
  )
}

export default ExploreCategories
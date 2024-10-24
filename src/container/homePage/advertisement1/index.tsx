import bgImg1 from "../../../assets/images/home/advertisement1/Background.svg"
import bgImg2 from "../../../assets/images/home/advertisement1/Group 1597883153.svg"
import img1 from "../../../assets/images/home/advertisement1/image.png"
import img2 from "../../../assets/images/home/advertisement1/image 13.png"


function Advertisement1() {

    const mockData = [
        {
            img : img1,
            bgImg : bgImg2,
            title : 'Energy-Efficient Appliances at Great Prices',
            para : 'Save more on energy bills with eco-friendly appliances. Find the perfect fit for your home!'
        },
        {
            img : img2,
            bgImg : bgImg1,
            title : 'Huge Savings on Home Essentials',
            para : 'Limited-time offers on refrigerators, washing machines, and more. Dont miss out on these big savings!'
        },
    ]
  return (
    <div className="px-[4%] mt-6 border-t-[1px] border-b-[1px] border-black/20 py-5 mx-auto">
            <div className="grid grid-cols-12 gap-4 lg:gap-8">
                {mockData?.map((idx:any,index:number) => (
                    <div className="col-span-12 md:col-span-6 overflow-hidden group  rounded-3xl relative w-full mx-auto h-[400px] sm:h-full md:h-full xl:h-[450px]" key={index}>
                       
                            <img src={idx?.bgImg} className="group-hover:scale-110 transform transition-all duration-200 w-full h-full object-cover xl:object-cover" alt="" />
                            <div className="absolute z-50 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full">
                                <div className="  flex flex-col justify-center items-center md:flex-row gap-5 lg:gap-10 px-2 lg:px-10">
                                    <img src={idx?.img} className="w-40 md:w-28 lg:w-40 xl:w-56 2xl:w-64" alt="" />
                                    <div className="flex justify-center flex-col items-center md:items-start">
                                        <p className="font-bold text-xl text-center md:text-start md:text-lg lg:text-xl lg:leading-8">{idx?.title}</p>
                                        <p className="text-black/50 text-center md:text-start lg:leading-7 mt-1 lg:mt-3">{idx?.para}</p>
                                        <button className="mt-2 lg:mt-4 border-[1px] px-3 py-2 border-black rounded-md">Shop Now</button>
                                    </div>
                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Advertisement1
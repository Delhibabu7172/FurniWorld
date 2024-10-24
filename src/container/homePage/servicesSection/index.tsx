import img1 from "../../../assets/images/home/serviceSection/1.png.svg"
import img2 from "../../../assets/images/home/serviceSection/2.png.svg"
import img3 from "../../../assets/images/home/serviceSection/3.png.svg"
import img4 from "../../../assets/images/home/serviceSection/4.png.svg"

function ServiceSection() {

    const data = [
        {
            icon: img1,
            title: "Free Shipping",
            para: "Free shipping on all Us order or above ₹200"
        },
        {
            icon: img2,
            title: "24x7 Support",
            para: "Contact us 24 hours a day, 7 days a week"
        },
        {
            icon: img3,
            title: "30 Days Return",
            para: "Simply return it within 30 days for an exchange"
        },
        {
            icon: img4,
            title: "Payment Secure",
            para: "Contact us 24 hours a day, 7 days a week"
        },
    ]
  return (
    <div className="px-[4%] mt-6">
        <div className="grid grid-cols-12 gap-5">
            {data?.map((item:any,index:number) => (
                <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 hover:scale-105 duration-200  border-[1px] border-primaryColor/20 rounded-md flex flex-col justify-center items-center py-5 gap-3"  key={index}>
                    <img src={item?.icon} alt="" />
                    <p className="text-xl font-extrabold text-primaryColor">{item?.title}</p>
                    <p className="text-center px-7">{item?.para}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ServiceSection
import bgImg from "../../../assets/images/home/advertisement2/Section.svg"

function Advertisement2() {
  return (
    <div className="h-[480px] relative">
        <img src={bgImg} className="h-full w-full object-cover" alt="" />
        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
            <div >
        <p className="text-transparent text-xl text-center mb-5 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-stroke">
                    Subscribe
                  </p>
                  <div className="flex flex-col justify-center items-center">
                  <p className="">Get the latest information</p>
                  <p className="">and special offers</p>
                  </div>
                  <div className="mt-5">
                    <input type="email"
                    className="px-3 py-2 border w-[400px] rounded-md placeholder:text-center placeholder:text-xs"
                    placeholder="Email Address" />
                  </div>
                  <div className="flex justify-center mt-5">
                  <button className="bg-yellow-400 px-3 py-2 rounded-md hover:bg-primaryColor hover:text-white">Subscribe</button>
                  </div>
                  </div>
        </div>
    </div>
  )
}

export default Advertisement2
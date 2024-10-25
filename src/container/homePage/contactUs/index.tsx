import { BiMailSend, BiPhoneCall } from "react-icons/bi";


function ContactUs() {
  return (
    <div className="px-[4%] mt-6 relative">
    <div className="grid grid-cols-2 gap-10">
        <div className="pt-14 py-14 ps-12">
        <p className="text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-stroke">
                    Contact Us
                  </p>
                  <p className="text-6xl font-bold text-primaryColor mt-5">Get In Touch</p>
                  <p className="mt-5">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                  <div className="mt-6">
                    <input type="text"
                    className="px-3 py-2 border w-full rounded-sm"
                    placeholder="Enter Name *" />
                  </div>
                  <div className="mt-3">
                    <input type="email"
                    className="px-3 py-2 border w-full rounded-sm"
                    placeholder="Enter Email *" />
                  </div>
                  <div className="mt-3">
                    <input type="text"
                    className="px-3 py-2 border w-full rounded-sm"
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/^0/, '').replace(/[^0-9]/g, ''); // Remove non-digit characters
                    }}
                    placeholder="Enter Mobile *" />
                  </div>
                  <div className="mt-5">
                    <button className="bg-yellow-400 text-black w-full py-3 flex justify-center items-center">
                        SEND
                    </button>
                  </div>
                  <div className="mt-5 flex justify-between">
                    <div className="flex items-center gap-2">
                        <BiPhoneCall size={30}/>
                        <div>
                            <p className="font-semibold">PHONE</p>
                            <p className="text-red-400">+91 9677497172</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiMailSend size={35}/>
                        <div>
                            <p className="font-semibold">MAIL</p>
                            <p className="text-red-400">sasi@gmail.com</p>
                        </div>
                    </div>
                  </div>
        </div>
        <div className="z-50 flex  items-center">
        <div className=" w-[80%] h-[85%] flex items-center justify-center rounded-md overflow-hidden">
                        <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248904.09057771214!2d78.95352364629558!3d12.899591870556668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad38e61fa68ffb%3A0xbedda6917d262b5e!2sVellore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1729869096670!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen // Changed from allowfullscreen to allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" // Changed referrerpolicy to referrerPolicy
                >
                </iframe>
        </div>
        </div>
        <div className="bg-primaryColor h-full w-[20%] absolute top-0 right-0 "></div>
    </div>
    </div>
  )
}

export default ContactUs
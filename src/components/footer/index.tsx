import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import logo from "../../assets/images/navbar/newlogo.svg"

function Footer() {
  return (
    <div className="bg-primaryColor px-[4%] py-10 text-white">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 2xl:gap-10">
                <div>
                    <div className="flex items-center gap-2">
                    <img src={logo} className="w-20" alt="" />
                    <p className="font-bold 2xl:text-xl">FURNI WORLD</p>
                    </div>
                    
                    <p className="mt-3 mb-3">Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam</p>
                    <div className="flex items-center gap-4">
                        <FaFacebook/>
                        <FaInstagram/>
                        <FaYoutube/>
                    </div>
                </div>
                <div>
                    <p className="text-base font-bold">Product</p>
                    <ul className="mt-4">
                        <li className="mb-2 text-sm text-white/90">Features</li>
                        <li className="mb-2 text-sm text-white/90">Pricing</li>
                        <li className="mb-2 text-sm text-white/90">Case studies</li>
                        <li className="mb-2 text-sm text-white/90">Reviews</li>
                        <li className="text-sm text-white/90">Updates</li>
                    </ul>
                </div>
                <div>
                    <p className="text-base font-bold">Company</p>
                    <ul className="mt-4">
                        <li className="mb-2 text-sm text-white/90">About</li>
                        <li className="mb-2 text-sm text-white/90">Contact Us</li>
                    </ul>
                </div>
                <div>
                    <p className="text-base font-bold">Support</p>
                    <ul className="mt-4">
                        <li className="mb-2 text-sm text-white/90">Getting started</li>
                        <li className="mb-2 text-sm text-white/90">Help center</li>
                        <li className="mb-2 text-sm text-white/90">Server status</li>
                        <li className="mb-2 text-sm text-white/90">Report a bug</li>
                        <li className="text-sm text-white/90">Chat support</li>
                    </ul>
                </div>
                <div>
                    <p className="text-base font-bold">Contacts us</p>
                    <ul className="mt-4">
                        <li className="mb-2 text-sm text-white/90">contact@company.com</li>
                        <li className="mb-2 text-sm text-white/90">(414) 687 - 5892</li>
                        <li className="mb-2 text-sm text-white/90">794 Mcallister St San Francisco, 94102</li>
                    </ul>
                </div>
            </div>
            <hr  className="border-white"/>
            <div className="flex flex-col mt-5 md:flex-row md:justify-between">
                <p>Copyright © 2024 REDDY AMMAN AGENCIES</p>
                <p>All Rights Reserved | Terms and Conditions | Privacy Policy</p>
            </div>
    </div>
  )
}

export default Footer
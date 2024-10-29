import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import logo from "../../assets/images/navbar/newlogo.svg"

function Footer() {
  return (
    <div className="bg-primaryColor px-[4%] py-10 text-white">

            <div className="grid grid-cols-5 gap-7 2xl:gap-10">
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
                    <p className="font-bold text-base">Product</p>
                    <ul className="mt-4">
                        <li className="text-sm text-white/90 mb-2">Features</li>
                        <li className="text-sm text-white/90 mb-2">Pricing</li>
                        <li className="text-sm text-white/90 mb-2">Case studies</li>
                        <li className="text-sm text-white/90 mb-2">Reviews</li>
                        <li className="text-sm text-white/90">Updates</li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-base">Company</p>
                    <ul className="mt-4">
                        <li className="text-sm text-white/90 mb-2">About</li>
                        <li className="text-sm text-white/90 mb-2">Contact Us</li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-base">Support</p>
                    <ul className="mt-4">
                        <li className="text-sm text-white/90 mb-2">Getting started</li>
                        <li className="text-sm text-white/90 mb-2">Help center</li>
                        <li className="text-sm text-white/90 mb-2">Server status</li>
                        <li className="text-sm text-white/90 mb-2">Report a bug</li>
                        <li className="text-sm text-white/90">Chat support</li>
                    </ul>
                </div>
                <div>
                    <p className="font-bold text-base">Contacts us</p>
                    <ul className="mt-4">
                        <li className="text-sm text-white/90 mb-2">contact@company.com</li>
                        <li className="text-sm text-white/90 mb-2">(414) 687 - 5892</li>
                        <li className="text-sm text-white/90 mb-2">794 Mcallister St San Francisco, 94102</li>
                    </ul>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <hr  className="border-white"/>
            <div className="flex justify-between mt-5">
                <p>Copyright © 2024 REDDY AMMAN AGENCIES</p>
                <p>All Rights Reserved | Terms and Conditions | Privacy Policy</p>
            </div>
    </div>
  )
}

export default Footer
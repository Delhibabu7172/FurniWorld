import { Link, useLocation } from "react-router-dom"
import Icon from "../../assets/images/navbar/Vector (15).png"
import { HiOutlineMapPin } from "react-icons/hi2"
import { useEffect, useState } from "react"
import { getProfileApi } from "../../api-service/authApi"
import { useQuery } from "@tanstack/react-query"
import { getRoleMenuItems } from "../menus"
import _ from "lodash"

function NavbarIndex() {

    const location = useLocation()

    const [menus , setMenus] = useState<any[]>([]);
    const MENUITEMS = menus;
    // const [menuItems , setMenuItems] = useState<any[]>(MENUITEMS);

    const getProfileData = useQuery({
        queryKey: ['getProfileData'],
        queryFn: () => getProfileApi(),
      });

      const role = getProfileData?.data?.data?.result?.role?.name
        // const admin = 'ADMIN'
      useEffect(() => {
        if (role) {
          const items = getRoleMenuItems(role);
          setMenus(_.cloneDeep(items));
        } else {
          const defaultItems = getRoleMenuItems(undefined);
          setMenus(_.cloneDeep(defaultItems));
        }
      }, [role]);
      
      console.log(MENUITEMS);
      

  return (
    <div className="flex items-center justify-between py-2  px-[3%] md:px-[4%] bg-[#F8F8FB] font-Lexend">
        <div className="border-[1px] rounded-lg p-2 w-12">
            <img src={Icon} alt="" />
        </div>

        <div className="flex items-center justify-center gap-5">
            {
                MENUITEMS?.map((item:any,index:number) => (
                    <Link to={`${item?.path}`} key={index}
        className={`text-base hover:text-primaryColor/60 ${
            location.pathname === `${item?.path}` ? "text-primaryColor  font-extrabold hover:text-primaryColor": "font-medium"} flex items-center gap-2`}>{location.pathname === `${item?.path}` && <p className="w-2 h-2 rounded-full bg-primaryColor"></p>}
            {item?.title}
        </Link>
                ))
            }
        </div>
        <div>
            <p className="p-2 font-medium text-primaryColor border-[1px] rounded-md flex justify-center items-center gap-1"><HiOutlineMapPin /> Namakkal</p>
        </div>
    </div>
  )
}

export default NavbarIndex
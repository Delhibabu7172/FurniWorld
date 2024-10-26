import {  BiRightArrowAlt } from "react-icons/bi"
import App from "../App"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCategoryLandingApi } from "../../../api-service/landingApi"


function CategoryHome() {

    const navigate = useNavigate()

    const getCategoryData = useQuery({
        queryKey : ['getCategoryData'],
        queryFn : () => getCategoryLandingApi(``)
    })

    const categoryData = getCategoryData?.data?.data?.result

  return (
    <div className="relative w-fit overflow-hidden">
        <App />
        <div className="absolute top-0 left-[50%] transform translate-x-[-50%] border border-primaryColor/30 rounded-md bg-white w-fit overflow-hidden p-3">
            <div className="flex gap-4">
            <div className="min-w-52">
                <p className="text-primaryColor font-bold">Appliances</p>
                <hr className="mt-3 mb-2"/>
                {categoryData?.length > 0 ? (
                    <div className="flex gap-4">
                    <div>
                      {/* Left side: First half of categoryData */}
                      {categoryData?.slice(0, Math.ceil(categoryData.length / 2)).map((idx: any) => (
                        <div
                          className="flex justify-between items-center cursor-pointer group hover:bg-yellow-400 hover:text-black p-1 rounded-sm min-w-48"
                          key={idx._id} // Use unique _id as key
                          onClick={() => navigate('/products', { state: { status: `${idx._id}` } })}
                        >
                          <p className="text-black/70">{idx.name}</p>
                          <BiRightArrowAlt className="group-hover:-translate-x-4 group-hover:transform group-hover:duration-300 group-hover:ease-out" />
                        </div>
                      ))}
                    </div>
                    <div>
                      {/* Right side: Second half of categoryData */}
                      {categoryData?.slice(Math.ceil(categoryData.length / 2)).map((idx: any) => (
                        <div
                          className="flex justify-between items-center cursor-pointer group hover:bg-yellow-400 hover:text-black p-1 rounded-sm min-w-48"
                          key={idx._id} // Use unique _id as key
                          onClick={() => navigate('/products', { state: { status: `${idx._id}` } })}
                        >
                          <p className="text-black/70">{idx.name}</p>
                          <BiRightArrowAlt className="group-hover:-translate-x-4 group-hover:transform group-hover:duration-300 group-hover:ease-out" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                ) : '' }
                
            </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryHome
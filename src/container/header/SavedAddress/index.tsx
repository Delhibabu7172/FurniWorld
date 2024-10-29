import { Circles } from "react-loader-spinner"
import Pageheader from "../../../components/PageHeader"
import { useQuery } from "@tanstack/react-query";
import { getPincodeApi, getProfileApi } from "../../../api-service/authApi";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { getErrorMessage } from "../../../utils/helper";
import Select from "react-select";
import { useEffect, useState } from "react";
import { postsShippingAddressApi } from "../../../api-service/landingApi";
import toast from "react-hot-toast";



  type DropdownOption = {
    value: string;
    label: string;
    fullData: {
      areaName: string;
      district: string;
      state: string;
      pincode: string;
    };
  };

function SavedAddress() {

    const page = {
        currentpage: `Address`,
        breadcrumbs: [
            { label: 'Home', path: '/' },
            { label: `Address`, path: '/app/dmList' },
        ]
    };

    const AddSubscriberSchema = yup.object({
        firstName: yup.string().required('This Field is reqiured.'),
        lastName: yup.string().required('This Field is reqiured.'),
        email: yup.string().required('This Field is reqiured.').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is Incorrect'),
        mobile: yup.string().required('Mobile Number is required').matches(/^[6-9][0-9]{9}$/, "Mobile number should be 10 digits"),
        alterMobile: yup.string().optional().matches(/^[6-9][0-9]{9}$/,{
          message: "AlterNative Mobile Number is not matching", // Error message when PAN No does not match
          excludeEmptyString: true // Ensure empty strings are not checked
        }),
        address: yup.string().required('This Field is reqiured.'),
        city: yup.string().required('This Field is reqiured.'),
        state: yup.string().required('This Field is reqiured.'),
        landMark: yup.string().optional(),
        pincode: yup.string().required('This Field is reqiured.'),
        GST: yup.string().required("This field is required. Please select a value"),
        GSTNo: yup.string(),
        bussinessName: yup.string(),
        default: yup.string().required("This field is required. Please select a value"),
 });

const { handleSubmit, register, watch , control, formState:{ errors }, setValue } = useForm({
    resolver: yupResolver(AddSubscriberSchema),
})

const [businessNameError, setBusinessNameError] = useState("");
  const [GSTNoError, setGSTNoError] = useState("");

const [inputValue, setInputValue] = useState("");
const [setSearchData, setSetsearchData] = useState<any>();
const [selectedPincode, setSelectedPincode] = useState("");

const [searchTerm, setSearchTerm] = useState<any>("");


const handleSearch = (inputValue: any) => {
  setInputValue(inputValue); // Update the input value state
  setSearchTerm(inputValue); // Call your API search function
};

const getPincodeQueryData = useQuery({
    queryKey: ["getPincodeQueryData", searchTerm],
    queryFn: () =>
      getPincodeApi(
        `?search=${searchTerm}`
      ),
  });

  const materialDropdown: any[] =
  getPincodeQueryData?.data?.data?.result?.map((material: any) => ({
    value: material?._id,
    label: `${material?.officeName}-${material?.pincode}`,
    fullData: {
      ...material,
      areaName: material?.officeName
    },
  })) || [];

  const watchPincode = watch('pincode')
  const selectedGST = watch("GST");
  
  useEffect(()=>{
    if(watchPincode){
        setValue('state',setSearchData?.stateName)
    }
  },[watchPincode])

    const getProfileData = useQuery({
        queryKey : ['getProfileData'],
        queryFn : () => getProfileApi()
    })
  
    const profileData = getProfileData?.data?.data?.result

    const onSubmit = async (data : any) => {

        if(selectedGST === 'true'){
            setBusinessNameError('')
            setGSTNoError('')
        }
        const payload = {
            firstName : data?.firstName,
            lastName : data?.lastName,
            address : data?.address,
            state : data?.state,
            city : data?.city,
            landmark : data?.landMark ? data?.landMark : "",
            mobile : data?.mobile,
            email : data?.email,
            alternateMobile : data?.alterMobile ? data?.alterMobile : "",
            pincode : data?.pincode,
            defaultAddress : data?.default,
            isGst : data?.GST,
            gstNo : data?.GSTNo ? data?.GSTNo : "",
            businessName : data?.bussinessName ? data?.bussinessName : ""
        }

        console.log(payload);
        const uploadApi = await postsShippingAddressApi(profileData?._id,payload)
        if(uploadApi?.status === 200){
            toast.success(uploadApi?.data?.msg)
            getProfileData?.refetch()
        }
    }

  return (
    <>
    <div className="mt-3 font-Lexend">
        <Pageheader data={page} />
        {getProfileData?.isLoading ? (
         <div className="h-[70vh] flex justify-center items-center">
         <Circles
             height="40"
             width="40"
             color='#1A3764'
             ariaLabel="circles-loading"
             wrapperStyle={{}}
             wrapperClass=""
             visible={true}
             />
      </div>
   
    ) : (
      <div className="px-[10%] py-4 ">
        <div className="border rounded-lg shadow-2xl px-5 py-4">
        <p className="font-bold text-xl mb-2 2xl:text-2xl">Delivery Address</p>
        <hr />
        {profileData?.shippingAddress?.length > 0 ? (
                <div>
                  
                </div>
        ) : (
                <div className="mt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* {JSON.stringify(errors)} */}
                   <p className="font-medium text-primaryColor text-lg">Personal Details</p>
                   <div className="grid grid-cols-12 gap-4 mt-2 2xl:mt-4">
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">First Name <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter First Name"
                                    {...register('firstName')} />
                            </div>
                            {errors?.firstName && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.firstName)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">Last Name <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Last Name"
                                    {...register('lastName')} />
                            </div>
                            {errors?.lastName && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.lastName)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">Email <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Email"
                                    {...register('email')} />
                            </div>
                            {errors?.email && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.email)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="signin-username" className="form-label text-default">Mobile Number <span className='text-red-400'>*</span></label>
                                <input
                                    id="mobile"
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs"
                                    {...register("mobile")}
                                    onInput={(e) => {
                                        const input = e.currentTarget.value;
                                        const cleanedInput = input.replace(/\D/g, '');
                                        if (/^[6-9][0-9]{0,9}$/.test(cleanedInput)) {
                                            e.currentTarget.value = cleanedInput;
                                        } else {
                                            e.currentTarget.value = cleanedInput.slice(0, -1);
                                        }
                                    }}
                                    maxLength={10}
                                />
                                {errors.mobile && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.mobile)}</p>}
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <label htmlFor="signin-username" className="form-label text-default">AlterNative Mobile Number </label>
                                <input
                                    id="alternateNumber"
                                    type="text"
                                    placeholder="Enter AlterNative Mobile Number"
                                    className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs"
                                    {...register("alterMobile")}
                                    onInput={(e) => {
                                        const input = e.currentTarget.value;
                                        const cleanedInput = input.replace(/\D/g, '');
                                        if (/^[6-9][0-9]{0,9}$/.test(cleanedInput)) {
                                            e.currentTarget.value = cleanedInput;
                                        } else {
                                            e.currentTarget.value = cleanedInput.slice(0, -1);
                                        }
                                    }}
                                    maxLength={10}
                                />
                                {errors.alterMobile && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.alterMobile)}</p>}
                            </div>
                   </div>
                   <p className="font-medium text-primaryColor text-lg mt-3">Shipping Address</p>
                   <div className="grid grid-cols-12 gap-4 mt-2 2xl:mt-4">
                        <div className="col-span-12">
                            <label htmlFor="contact-lead-score" className="font-medium ">Address <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter First Name"
                                    {...register('address')} />
                            </div>
                            {errors?.address && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.address)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">Pincode <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                        <Controller
                           control={control}
                           name="pincode"
                           render={({ field }) => (
                             <Select
                               {...field}
                               options={materialDropdown}
                               classNamePrefix="react-select"
                               className="!col-span-6"
                               id="react-select-3-live-region"
                               placeholder="Select PinCode"
                               onInputChange={handleSearch} // Handle input change
                               inputValue={inputValue} // Control the input value
                               isClearable
                               onChange={(selectedOption) => {
                                 if (selectedOption) {
                                   const option = selectedOption as DropdownOption;
                                   const pincode = option.fullData?.pincode ?? ""; // Get pincode from the fullData object
                                   setSelectedPincode(pincode); // Set the pincode as the selected value
                                   field.onChange(pincode); // Update form value with pincode only
                                   setSetsearchData(option.fullData); // Set the entire object in setSearchData for later use
                                 } else {
                                   // Clear the values if the clear icon is clicked
                                   setSelectedPincode(""); // Clear the selected pincode
                                   setSetsearchData(null); // Clear the stored data
                                   field.onChange(""); // Clear the form value for pincode
                                 }
                                 setInputValue(""); // Clear input after selection or clearing
                               }}
                               value={
                                 selectedPincode
                                   ? {
                                       label: selectedPincode,
                                       value: selectedPincode,
                                     }
                                   : null
                               } // Map value to the correct option
                             />
                           )}
                         />
                         </div>
                         </div>
                         <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">State <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter State"
                                    {...register('state')} />
                            </div>
                            {errors?.state && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.state)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">City <span className="text-red-500">*</span></label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter City"
                                    {...register('city')} />
                            </div>
                            {errors?.city && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.city)}</p>}
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <label htmlFor="contact-lead-score" className="font-medium ">LandMark </label>
                            <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter LandMark"
                                    {...register('landMark')} />
                            </div>
                        </div>
                        <div className="col-span-12  xl:col-span-6 ">
                                    <div className="font-medium text-sm">
                                    GST Available
                                    <span className="text-red-500 ms-1">*</span>
                                    </div>
                                    <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                                    <label className="flex items-center mr-3">
                                        <input
                                        type="radio"
                                        value="true"
                                        className="form-radio h-4 w-4 text-green-500"
                                        {...register("GST")}
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                        type="radio"
                                        value="false"
                                        className="form-radio h-4 w-4 text-gray-400"
                                        {...register("GST")}
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                    </div>
                                    {errors.GST && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {getErrorMessage(errors.GST)}
                                    </p>
                                    )}
                                </div>
                                {selectedGST && selectedGST === "true" && (
                                    <>
                                        <div className="col-span-12  md:col-span-6 ">
                                        <div className="font-medium text-sm">
                                            GST No<span className="text-red-500 ms-1">*</span>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                            id="GSTNo"
                                            type="text"
                                            placeholder="Enter GST No"
                                            className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs"
                                            {...register("GSTNo")}
                                            maxLength={15}
                                            />
                                            {GSTNoError && (
                                            <p className="text-red-500 text-xs mt-1 font-medium">
                                                {GSTNoError}

                                            </p>
                                            )}
                                        </div>
                                        </div>
                                    <div className="col-span-12  md:col-span-6 ">
                                        <div className="font-medium text-sm">
                                            Business Name<span className="text-red-500 ms-1">*</span>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                            id="business"
                                            type="text"
                                            placeholder="Enter Business Name"
                                            className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs"
                                            {...register("bussinessName")}
                                            />
                                            {businessNameError && (
                                            <p className="text-red-500 text-xs mt-1 font-medium">
                                                {businessNameError}

                                            </p>
                                            )}
                                        </div>
                                        </div>
                                    </>
                                        
                                    )}

                                      <div className="col-span-12  xl:col-span-6 ">
                                    <div className="font-medium text-sm">
                                    Set as Default Address
                                    <span className="text-red-500 ms-1">*</span>
                                    </div>
                                    <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                                    <label className="flex items-center mr-3">
                                        <input
                                        type="radio"
                                        value="true"
                                        className="form-radio h-4 w-4 text-green-500"
                                        {...register("default")}
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                        type="radio"
                                        value="false"
                                        className="form-radio h-4 w-4 text-gray-400"
                                        {...register("default")}
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                    </div>
                                    {errors.default && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">
                                        {getErrorMessage(errors.default)}
                                    </p>
                                    )}
                                </div>
                   </div>
                   <div className="w-full flex justify-end items-center">
                                    <button type="submit" className="bg-primaryColor text-white hover:bg-yellow-400 hover:text-black px-3 py-2 rounded-md">Submit</button>
                   </div>
                   </form>
                </div>
        )}
        
        </div>
        
      </div>
    )}
    </div>
    
    </>
  )
}

export default SavedAddress
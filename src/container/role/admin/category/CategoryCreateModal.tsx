import { yupResolver } from "@hookform/resolvers/yup";
import { PiUploadFill } from "react-icons/pi";
import * as yup from 'yup'
import { getErrorMessage } from "../../../../utils/helper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategoryApi, postCategoryApi, putCategoryApi, uploadCategoryApi } from "../../../../api-service/admin";
import { MdCancel } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface OptionType {
  value: string;
  label: string;
}

function CategoryCreateModal({ openModal, handleClose, refetch, modalId } : any) {

    if(!openModal) return null;

    const [iconUrlLoading, setIconUrlLoading] = useState(false)
  const [IconImgUrl, setIconImgUrl] = useState('');
  const [IconImgUrlError, setIconImgUrlError] = useState('');

    const AddSubscriberSchema = yup.object({
            name: yup.string().required('This Field is reqiured.'),
            type: yup.string().required('This Field is reqiured.'),
            description: yup.string().optional()
     });

    const { handleSubmit, register, control, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(AddSubscriberSchema),
    })

   const handleUploadCategoryIcon = async (e: any) => {
    setIconUrlLoading(true);
    if (e.target.files) {

      const file = e.target.files[0];
      const allowedFileTypes = ['image/jpeg', 'image/png']; // Allowed formats: jpg, png, pdf

      if (file.size > 2 * 1024 * 1024) {
        setIconImgUrlError("upload file upto 2MB only");
        toast.error('File size exceeds 2MB.');
        setIconUrlLoading(false);
        e.target.value = '';
        return;
      } else setIconImgUrlError("");

            // Check file type
    if (!allowedFileTypes.includes(file.type)) {
        setIconImgUrlError("Only JPG, PNG files are allowed.");
      toast.error('Invalid file format. Please upload JPG, PNG.');
      setIconUrlLoading(false);
      e.target.value = ''; // Clear the file input
      return;
    }

      try {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const uploadData = await uploadCategoryApi(formData);
        if (
          uploadData &&
          uploadData.data.result &&
          uploadData.data.result.length
        ) {
          const imageUrl = uploadData.data.result[0].location;
          setIconImgUrl(imageUrl);
          setIconImgUrlError("");
        }
        setIconUrlLoading(false);
      } catch (error) {
        toast.error('Something went wrong...');
        setIconUrlLoading(false);
    }
  }
};

const typeDropDown: OptionType[] = [
  { value : 'kitchen' , label : 'Kitchen' },
  { value : 'electronics' , label : 'Electronics' },
  { value : 'furnitures' , label : 'Furnitures' },
]

const getCategoryData = useQuery({
  queryKey : ['getCategoryData', modalId],
  queryFn : () => getCategoryApi(`${modalId}`),
  enabled : !!modalId
})

const categoryData = getCategoryData?.data?.data?.result

useEffect(()=>{
    if(modalId){
      setValue('name',categoryData?.name)
      setValue('description',categoryData?.description),
      setValue('type',categoryData?.category_type),
      setIconImgUrl(categoryData?.icon)
    }
},[getCategoryData?.data?.data?.result , setValue])

// submit function
    const onSubmit = async (data:any) =>{

      let hasError = false;
      if(IconImgUrl === ''){
        setIconImgUrlError('This Field is required.')
        hasError = true
      }else setIconImgUrlError('')

      if(hasError){
        return
      }

      const payload = {
        name : data?.name,
        description : data?.description,
        icon : IconImgUrl,
        category_type : data?.type
      }

      console.log(payload);
      if(modalId){
        const updateApi = await putCategoryApi(modalId,payload)
          console.log(updateApi);
          
          if(updateApi?.status === 200){
            toast.success(updateApi?.data?.msg)
            handleClose()
            refetch()
          }
      }else{
        const uploadApi = await postCategoryApi(payload)
          console.log(uploadApi);
          
          if(uploadApi?.status === 200){
            toast.success(uploadApi?.data?.msg)
            handleClose()
            refetch()
          }
      }
      
        
    } 

    

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-[90%] 2xl:max-w-4xl w-full flex flex-col max-h-[90%] h-fit overflow-y-scroll hide-scrollbar animate-slideTop">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b">
          <h2 className="text-lg font-medium">Add New Category</h2>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
       </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-12 lg:col-span-6">
                <label htmlFor="contact-lead-score" className="font-medium form-label">Choose Category <span className="text-red-500">*</span></label>
                <div className="mt-2">
                <Controller
                  control={control}
                  name={`type`}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={typeDropDown}
                      classNamePrefix='react-select'
                      id='react-select-3-live-region'
                      placeholder='select '
                      onChange={(selectedOption : any) => field.onChange(selectedOption.value)}  // Extract value here
                      value={typeDropDown ? typeDropDown.find(option => option.value === field.value) : null}  // Map value to the correct option
                    />
                  )}
                />
                </div>
                {errors?.type && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.type)}</p>}
          </div>
            <div className="col-span-12 xl:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Name <span className="text-red-500">*</span></label>
                    <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Name"
                    {...register('name')}/>
                  </div>
                    {errors?.name && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.name)}</p>}
            </div>
            <div className="col-span-12 xl:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Description</label>
                  <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Description"
                    {...register('description')}/>
                  </div>
            </div>

            
            <div className="col-span-12 xl:col-span-6">
            <label htmlFor="contact-lead-score" className="font-medium">Upload Icon <span className="text-red-500">*</span></label>
                <div className="h-36 border-dashed border-primaryColor border-[2px] !border-spacing-10 rounded-md mt-3 flex justify-center items-center">
            {IconImgUrl ?
                        (
                          <>
                            {iconUrlLoading ? (
                              // <Spinner aria-label="Default status example" />
                              <h2>Loading.......</h2>
                            ) : (
                              <>
                                {IconImgUrl && (
                                  <div className='flex items-center justify-center w-full mx-auto my-3'>
                                    <div className="flex h-32 cursor-pointer w-36 ">
                                      <img
                                        className="rounded-md h-full w-[80%] mx-auto  border-[1px] border-[#DFDFDF] "
                                        alt="No Image"
                                        src={IconImgUrl}
                                      />
                                      <MdCancel className=' w-[18px] hover:scale-110 ms-1 hover:text-primaryColor' onClick={() => {
                                        setIconImgUrl('')
                                      }} />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <div>
                            
                               <label className="flex flex-col items-center justify-center text-[#2B2B2D]" htmlFor="icon">
                                <PiUploadFill className="w-10 h-10"/>
                                <p>Upload Product Icon</p>
                                </label>
                                <input
                                id='icon'
                                type="file"
                                className='hidden'
                                onChange={handleUploadCategoryIcon}
                              />

                          </div>
          )}
                     
                </div>
                {IconImgUrlError && <p className="mt-1 text-xs text-red-500">{IconImgUrlError}</p>}
            </div>

            
            <div className="flex items-center col-span-12 gap-3 ml-auto">
                <button className="rounded-sm px-2 py-1 border-[1px] border-primaryColor" onClick={handleClose}>Cancel</button>
                <button className="rounded-sm px-2 py-1 border-[1px] border-primaryColor bg-primaryColor text-white" onClick={handleSubmit(onSubmit)}>Submit</button>
            </div>
            </div>
            </form>
       
    </div>
    </div>
  )
}

export default CategoryCreateModal
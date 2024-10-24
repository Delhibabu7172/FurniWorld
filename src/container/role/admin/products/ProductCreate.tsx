import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form"
import Select from "react-select"
import * as yup from 'yup'
import { getErrorMessage } from "../../../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { getBrandApi, getCategoryApi, getProductApi, multiUploadApi, postProductApi, putProductApi } from "../../../../api-service/admin";
import Pageheader from "../../../../components/PageHeader";
import toast from "react-hot-toast";
import { PiUploadFill } from "react-icons/pi";
import { BiPlus, BiTrash, BiXCircle } from "react-icons/bi";
import ProductColorImages from "./ProductColorImages";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


// const electronicSchema = new mongoose.Schema({
//   powerConsumption: { type: String, trim: true }, // e.g., "1500W"
//   warranty: { type: String, trim: true }, // e.g., "2 years"
//   batteryLife: { type: String, trim: true }, // e.g., "8 hours"
//   connectivity: [String], // e.g., ["WiFi", "Bluetooth", "USB"]
//   voltage: { type: String, trim: true }, // e.g., "220V"
// });

// const furnitureSchema = new mongoose.Schema({
//   material: { type: String, trim: true }, // e.g., "Wood", "Metal"
//   dimensions: {
//     length: { type: Number, min: 0 }, // e.g., 200 (in cm)
//     width: { type: Number, min: 0 }, // e.g., 100 (in cm)
//     height: { type: Number, min: 0 }, // e.g., 75 (in cm)
//     unit: String
//   },
//   weightCapacity: { type: Number, min: 0 }, // e.g., 150 (in kg)
//   assemblyRequired: { type: Boolean, default: false },
//   finishType: { type: String, trim: true }, // e.g., "Matte", "Glossy"
// });

// const kitchen = new mongoose.Schema({
//   // capacity: { type: String, trim: true }, // e.g., "1.5 Liters"
//   material: { type: String, trim: true }, // e.g., "Stainless Steel", "Plastic"
//   dishwasherSafe: { type: Boolean, default: false },
//   heatResistance: { type: String, trim: true }, // e.g., "Up to 400°F"
//   setIncludes: [String], // e.g., ["Spoon", "Fork", "Knife"]
// });

function ProductCreate() {
 
 

  const naviagte = useNavigate()

  const { id } = useParams() 
const getProductData = useQuery({
  queryKey : ['getProductData', id],
  queryFn : () => getProductApi(`${id}`),
  enabled : !!id
})
const productData = getProductData?.data?.data?.result

const page = {
  currentpage: `Product ${productData ? "Update" : "Create"}`, 
  breadcrumbs: [
    { label: 'Product', path: '/product'},
    { label: `Product ${productData ? "Update" : "Create"}`, path: '/app/dmList'},
 ] 
};

useEffect(()=>{
  if(productData){
    setValue('name',productData?.name)
    setValue('category',productData?.category?._id)
    setValue('brand',productData?.brand?._id)
    setValue('minimumPrice',productData?.minimum_price)
    setValue('decription',productData?.description)
    setValue('returnpolicy',productData?.return_policy)
    setValue('productImages',productData?.images)
    setValue('productSize',productData?.sizes)
    setValue('productColour',productData?.colors)

    setValue('specifications',productData?.specifications)
    setValue('specifications.furnitures.assemblyRequired',productData?.specifications?.furnitures?.assemblyRequired === true ? "true" : 'false')
    setValue('specifications.kitchen.dishwasherSafe',productData?.specifications?.kitchen?.dishwasherSafe === true ? "true" : 'false')
  }
},[getProductData?.data?.data?.result])

  const AddSubscriberSchema = yup.object({
    name: yup.string().required('This Field is reqiured.'),
    category: yup.string().required('This Field is reqiured.'),
    brand: yup.string().required('This Field is reqiured.'),
    minimumPrice: yup.string().optional(),
    decription: yup.string().optional(),
    returnpolicy: yup.string().required('This Field is reqiured.'),
    productImages: yup.array()
    .of(
      yup.string().required('This Field is required.').url('Must be a valid URL for the uploaded image')
    ).optional(),
    productSize : yup.array().of(
      yup.object({
        name : yup.string().optional(),
        MRP : yup.string().optional(),
        offer : yup.string().optional(),
        offerPrice : yup.string().optional()
      })
    ),
    productColour : yup.array().of(
      yup.object({
        name : yup.string().optional(),
        code : yup.string().optional(),
        images : yup.array().of(
          yup.object({
            name : yup.string().optional(),
            img_url : yup.string().optional().url('Must be a valid URL for the uploaded image'),
          })
        )
      })
    ),
    specifications : yup.object({
      electronics : yup.object({
        powerConsumption : yup.string().optional(), // e.g., "1500W"
        // warranty : yup.string().optional(),// e.g., "2 years"
        batteryLife : yup.string().optional(),// e.g., "8 hours"
        connectivity : yup.string().optional(),// e.g., ["WiFi", "Bluetooth", "USB"]
        voltage : yup.string().optional()// e.g., "220V"
      }).nullable(),
      furnitures : yup.object({
        material : yup.string().optional(), // e.g., "Wood", "Metal"
        dimensions : yup.object({
          length : yup.string().optional(),// e.g., 200 (in cm)
          width : yup.string().optional(), // e.g., 100 (in cm)
          height : yup.string().optional(),// e.g., 75 (in cm)
          unit : yup.string().optional(),
        }).nullable(),
        weightCapacity : yup.string().optional(),// e.g., 150 (in kg)
        assemblyRequired : yup.string().optional(),
        finishType : yup.string().optional(),// e.g., "Matte", "Glossy"
      }).nullable(),
      kitchen : yup.object({
        material : yup.string().optional(),// e.g., "Stainless Steel", "Plastic"
        dishwasherSafe: yup.string().optional(),
        heatResistance : yup.string().optional(),// e.g., "Up to 400°F"
        setIncludes : yup.string().optional(),// e.g., "Up to 400°F"
        // setIncludes : yup.array().of(
        //   yup.string().optional()
        // ),// e.g., ["Spoon", "Fork", "Knife"]
      }).nullable()
    }).nullable()
});

// Define the form type based on the schema
type FormData = yup.InferType<typeof AddSubscriberSchema> 

const { handleSubmit, register,control, formState:{ errors }, setValue , getValues, trigger, watch} = useForm<FormData>({
resolver: yupResolver(AddSubscriberSchema),
defaultValues:{
  productImages : [],
  productColour: [{name : '' , code : '' , images : [{ img_url : '', name : '' }]}],
  productSize: [{name : '' , MRP : '', offer : '' , offerPrice : ''}],
  specifications: {
    kitchen: {
      dishwasherSafe: '', // initialize the field with an empty string
    },
    electronics: {

    }
  },
}
})

const getCategoryData = useQuery({
  queryKey : ['getCategoryData'],
  queryFn: ()=> getCategoryApi(``)
})

const categoryDropDown: any[] = getCategoryData?.data?.data?.result?.map((item:any) => ({
  value : item._id,
  label : item?.name,
  fullData : item
}))|| []

const getBrandData = useQuery({
  queryKey : ['getBrandData'],
  queryFn: ()=> getBrandApi(``)
})

const brandDropDown: any[] = getBrandData?.data?.data?.result?.map((item:any) => ({
  value : item?._id,
  label : item?.name,
  fullData : item
}))



// For productColour
const { fields: colourFields, append: appendColour, remove: removeColour } = useFieldArray({
  control,
  name: 'productColour',
});

// For productSize
const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
  control,
  name: 'productSize',
});




// const handleUploadImage = async (e: any, index: number, fieldName: string) => {

//   const file = e.target.files[0];
//   const allowedFileTypes = ['image/jpeg', 'image/png'];

//   // File size and type checks
  
//   if (file.size > 2 * 1024 * 1024) {
//     toast.error('File size exceeds 2MB.');
//     return;
//   } else if (!allowedFileTypes.includes(file.type)) {
//     toast.error('Only JPG, PNG files are allowed.');
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append('file', e.target.files[0]);
//     const uploadData = await uploadSingleApi(formData);
//     if (
//       uploadData &&
//       uploadData.data.result &&
//       uploadData.data.result.length
//     ) {
//       const imageUrl = uploadData.data.result[0].location;
//       console.log(imageUrl);
//       setValue(`productColour.${index}.${fieldName}` as any, imageUrl || '');
//       console.log(`productColour.${index}.${fieldName}`);
      
//       toast.success(uploadData.data.msg)
//     }
//   } catch (error) {
//     toast.error('Something went wrong...');
//     }
// };


const handleMultiUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files as FileList); // Get all selected files
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  console.log(files);
  
  // File size and type checks
  for (const file of files) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size exceeds 2MB for one or more files.');
      return;
    } else if (!allowedFileTypes.includes(file.type)) {
      toast.error('Only JPG, PNG files are allowed.');
      return;
    }
  }
  
  try {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file)); // Append all files to FormData

    const uploadData = await multiUploadApi(formData); // Assuming this can handle multiple files
    if (uploadData && uploadData.data.result && uploadData.data.result.length) {
      // Concatenate newly uploaded images with existing ones
      const existingImages = watch('productImages') || [];
      const newImages = uploadData.data.result.map((img: any) => img?.location); // Adjust based on the structure of your response
      const updatedImages = [...existingImages, ...newImages]; // Combine old and new images

      setValue('productImages', updatedImages); // Update the form state
      toast.success(uploadData.data.msg); // Assuming this message is for the whole batch
    }
  } catch (error) {
    toast.error('Something went wrong...');
  }
};

const watchproductImages = watch('productImages')
const watchCategory  = watch('category')
console.log(watchproductImages);
console.log(watchCategory);

const categoryFullData = categoryDropDown?.find((item:any) => item?.value === watchCategory)
console.log(categoryFullData);

// useEffect(() => {
//   sizeFields.forEach((item, index) => {
//     console.log(item)
//     const watchMrp = watch(`productSize.${index}.MRP`);
//     const watchOffer = watch(`productSize.${index}.offer`);

//     if (watchMrp && watchOffer) {
//       const offerPrice = (Number(watchMrp) * (1 - Number(watchOffer) / 100)).toFixed(2);
//       setValue(`productSize.${index}.offerPrice`, offerPrice);
//     }
//     console.log(watch(`productSize.${index}.offerPrice`));
    
//   });
// }, [sizeFields, watch, setValue]);

const submit = async (data:any) => {
console.log(data);
  const payload = {
    name : data?.name,
    category : data?.category,
    description : data?.decription,
    minimum_price : Number( data?.productSize[0]?.offerPrice),
    brand : data?.brand,
    return_policy : data?.returnpolicy,
    images : data?.productImages,
    sizes : data?.productSize?.map((item:any)=>(
      {
        name : item?.name,
        MRP : Number(item?.MRP),
        offer : Number(item?.offer),
        offerPrice : Number(item?.offerPrice),
      }
    )),
    colors : data?.productColour?.map((item:any) => (
      {
        name : item?.name,
        code : item?.code,
        images : item?.images?.map((idx:any) => (
                  {
                    name : idx?.name,
                    img_url : idx?.img_url
                  }
                ))
      }
    )),
    // Conditionally set the specifications based on the selected category
  specifications:
  categoryFullData?.fullData?.category_type === 'electronics'
    ? {
        electronics: {
          powerConsumption: data?.specifications?.electronics?.powerConsumption,
          // warranty: data?.specifications?.electronics?.warranty,
          batteryLife: data?.specifications?.electronics?.batteryLife,
          connectivity: data?.specifications?.electronics?.connectivity,
          voltage: data?.specifications?.electronics?.voltage,
        },
      }
    : categoryFullData?.fullData?.category_type === 'furnitures'
    ? {
        furnitures: {
          material: data?.specifications?.furnitures?.material,
          dimensions: {
            length: Number(data?.specifications?.furnitures?.dimensions?.length),
            width: Number(data?.specifications?.furnitures?.dimensions?.width),
            height: Number(data?.specifications?.furnitures?.dimensions?.height),
            unit: data?.specifications?.furnitures?.dimensions?.unit,
          },
          weightCapacity: Number(data?.specifications?.furnitures?.weightCapacity),
          assemblyRequired: data?.specifications?.furnitures?.assemblyRequired,
          finishType: data?.specifications?.furnitures?.finishType,
        },
      }
    : categoryFullData?.fullData?.category_type === 'kitchen'
    ? {
        kitchen: {
          material: data?.specifications?.kitchen?.material,
          dishwasherSafe: data?.specifications?.kitchen?.dishwasherSafe,
          heatResistance: data?.specifications?.kitchen?.heatResistance,
          setIncludes: data?.specifications?.kitchen?.setIncludes,
        },
      }
    : {}, // Default empty object if none of the categories match
  }

  console.log(payload);

  if(productData){
    const updateApi = await putProductApi(id,payload)
    if(updateApi?.status === 200){
      toast.success(updateApi?.data?.msg)
      naviagte('/product')
    }
  }else {
    const uploadApi = await postProductApi(payload)
    if(uploadApi?.status === 200){
      toast.success(uploadApi?.data?.msg)
      naviagte('/product')
    }
  }
  
  
}



  return (
    <div className="mt-3">
      <Pageheader data={page}/>
      <form action="" className="px-[3%] py-3 " onSubmit={handleSubmit(submit)}>
        {/* {JSON.stringify(errors)} */}
        <div className="grid grid-cols-12 gap-y-3 gap-x-5 border-[1px] p-4 rounded-md bg-[#F8F8FB]">
      <div className="col-span-12 lg:col-span-6">
                <label htmlFor="contact-lead-score" className="font-medium form-label">Choose Category <span className="text-red-500">*</span></label>
                <div className="mt-2">
                <Controller
                  control={control}
                  name={`category`}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryDropDown}
                      classNamePrefix='react-select'
                      id='react-select-3-live-region'
                      placeholder='select '
                      onChange={(selectedOption : any) => field.onChange(selectedOption.value)}  // Extract value here
                      value={categoryDropDown ? categoryDropDown.find(option => option.value === field.value) : null}  // Map value to the correct option
                    />
                  )}
                />
                </div>
                {errors?.category && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.category)}</p>}
          </div>
          <div className="col-span-12 lg:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Product <span className="text-red-500">*</span></label>
                    <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Product Name"
                    {...register('name')}/>
                  </div>
                    {errors?.name && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.name)}</p>}
            </div>
            <div className="col-span-12 lg:col-span-6">
                <label htmlFor="contact-lead-score" className="font-medium form-label">Choose Brand <span className="text-red-500">*</span></label>
                <div className="mt-2">
                <Controller
                  control={control}
                  name={`brand`}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={brandDropDown}
                      classNamePrefix='react-select'
                      id='react-select-3-live-region'
                      placeholder='select '
                      onChange={(selectedOption) => field.onChange(selectedOption.value)}  // Extract value here
                      value={brandDropDown ? brandDropDown.find(option => option.value === field.value) : null}  // Map value to the correct option
                    />
                  )}
                />
                </div>
                {errors?.brand && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.brand)}</p>}
          </div>
          <div className="col-span-12 lg:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Minimum Price</label>
                    <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Minimum Price"
                    {...register('minimumPrice')}/>
                  </div>
                    {errors?.minimumPrice && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.minimumPrice)}</p>}
            </div>
            <div className="col-span-12 lg:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Description</label>
                    <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Description"
                    {...register('decription')}/>
                  </div>
                    {errors?.decription && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.decription)}</p>}
            </div>
            <div className="col-span-12 lg:col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Return Policy <span className="text-red-500">*</span></label>
                    <div className="mt-3">
                    <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Return Policy"
                    {...register('returnpolicy')}/>
                  </div>
                    {errors?.returnpolicy && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors?.returnpolicy)}</p>}
            </div>

            <hr className="col-span-12 border-black/10 mx-[10%]"/>

            <div className="col-span-12">
            <label htmlFor="contact-lead-score" className="font-medium ">Product Images</label>
            <div className="min-h-fit border-dashed border-primaryColor border-[2px] !border-spacing-10 rounded-md flex justify-center items-center mt-2 py-6">
              {watchproductImages && watchproductImages?.length > 0  ? (
                <div className="flex flex-wrap justify-center gap-3 overflow-hidden">
                  {watchproductImages?.map((item:any,index:number) => (
                    <div className="flex gap-2" key={index}>
                    <img src={item} className="w-24 h-24" alt="" />
                    <BiXCircle 
                    className="cursor-pointer"
                     onClick={() => {
                      // Filter out the item at the current index
                      const updatedImages = watchproductImages.filter((_, i) => i !== index);
                      setValue('productImages', updatedImages); // Set the new array to productImages
                    }}
                    />
                    </div>
                  ))}
                  <div className="ms-3">
                <label className="flex flex-col items-center justify-center text-[#2B2B2D] cursor-pointer" htmlFor={`productImages`}>
                  <PiUploadFill className="w-10 h-10"/>
                  <p>Upload Images</p>
                </label>
                <input
                  id={`productImages`}
                  type="file"
                  className='hidden'
                  multiple
                  onChange={(e) => handleMultiUploadImage(e)}
                />
              </div>
                </div>
              ) : (
                <div>
                <label className="flex flex-col items-center justify-center text-[#2B2B2D] cursor-pointer" htmlFor={`productImages`}>
                  <PiUploadFill className="w-10 h-10"/>
                  <p>Upload Images</p>
                </label>
                <input
                  id={`productImages`}
                  type="file"
                  className='hidden'
                  multiple
                  onChange={(e) => handleMultiUploadImage(e)}
                />
              </div>
              )}
            </div>
            {errors?.productImages && (
                                  <p className="text-red-500">{errors.productImages?.message}</p>
                              )}
            </div>

            <hr className="col-span-12 border-black/10 mx-[10%]"/>

            <div className="col-span-12 ">
            <label htmlFor="contact-lead-score" className="font-medium ">Product Size</label>
              <div className="grid grid-cols-12 gap-4 mt-1">
                  {sizeFields.map((item, index) => {

                    const watchMrp = watch(`productSize.${index}.MRP`);
                    const watchOffer = watch(`productSize.${index}.offer`);

                    const offerPrice = watchMrp && watchOffer
                    ? (Number(watchMrp) * (1 - Number(watchOffer) / 100)).toFixed(2)
                    : "";
            
                  // Set the calculated offer price in the form's field
                  setValue(`productSize.${index}.offerPrice`, offerPrice);
                
                    return(
                      <div key={item.id} className="col-span-6 border rounded-md p-2">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="flex flex-col col-span-6">
                          <label htmlFor="contact-lead-score" className="font-medium ">Name</label>
                              <input
                                  {...register(`productSize.${index}.name`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter name"
                              />
                              {errors?.productSize?.[index]?.name && (
                                  <p className="text-red-500">{errors.productSize[index].name.message}</p>
                              )}
                          </div>
                          <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="contact-lead-score" className="font-medium ">Price</label>
                                <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Price"
                                {...register(`productSize.${index}.MRP`)}/>
                              </div>
                              {errors?.productSize?.[index]?.MRP && (
                                  <p className="text-red-500">{errors.productSize[index].MRP.message}</p>
                              )}
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="contact-lead-score" className="font-medium ">Offer</label>
                                <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Price"
                                {...register(`productSize.${index}.offer`)}/>
                              </div>
                              {errors?.productSize?.[index]?.offer && (
                                  <p className="text-red-500">{errors.productSize[index].offer.message}</p>
                              )}
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="contact-lead-score" className="font-medium ">Offer Price</label>
                                <div className="mt-3">
                                <input type="text" className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs" placeholder="Enter Price"
                                {...register(`productSize.${index}.offerPrice`)}
                                readOnly/>
                              </div>
                              {errors?.productSize?.[index]?.offerPrice && (
                                  <p className="text-red-500">{errors.productSize[index].offerPrice.message}</p>
                              )}
                        </div>
                        <div className="flex items-center justify-end col-span-12 gap-2 ml-auto">
                          {sizeFields.length > 1 && (
                            <button type="button" onClick={() => removeSize(index)} 
                          className="flex items-center justify-center text-white bg-red-400 rounded-sm w-7 h-7"><BiTrash/></button>
                          )}
                        <button type="button" onClick={() => appendSize({
                          name : '', MRP : '', offer : '', offerPrice : ''
                        })} className="flex items-center justify-center text-white bg-green-500 rounded-sm w-7 h-7"><BiPlus/></button>
                    </div>
                    </div>
                      </div>
                    )})}
                    </div>
                    </div>

                    <hr className="col-span-12 border-black/10 mx-[10%]"/>
                    
            <div className="col-span-12 ">
            <label htmlFor="contact-lead-score" className="font-medium ">Product Colour </label>
              <div className="grid grid-cols-12 gap-4 mt-1">
                  {colourFields.map((item, index) => {
                    const code = watch(`productColour.${index}.code`);
                    return(
                <div key={item.id} className="col-span-6 border p-2 rounded-md">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="flex flex-col col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Name </label>
                        <input
                            {...register(`productColour.${index}.name`)}
                            className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                            placeholder="Enter name"
                        />
                        {errors?.productColour?.[index]?.name && (
                            <p className="text-red-500">{errors.productColour[index].name.message}</p>
                        )}
                    </div>
                    <div className="col-span-6">
                    <label htmlFor="contact-lead-score" className="font-medium ">Colour Code </label>
                    <div className="flex items-center gap-2">
                    <input
                            {...register(`productColour.${index}.code`)}
                            className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                            placeholder="Enter colour code"
                        />
                        {/* Color preview box */}
                        {code ? (  // Check if user has entered something
                          /^#([0-9A-F]{3}){1,2}$/i.test(code) ? (  // Validate hex color code
                            <div
                              className="w-8 h-8 mt-2 rounded border-[1px] border-black/20"
                              style={{ backgroundColor: code }}  // Apply the entered color
                            ></div>
                          ) : (
                            <p className="mt-2 text-xs text-red-500">Enter a valid hex color code</p>  // Show error only if it's invalid
                          )
                        ) : null  // Don't show anything if the input is empty
                        }
                    </div>
                        {errors?.productColour?.[index]?.code && (
                            <p className="text-red-500">{errors.productColour[index].code.message}</p>
                        )}
                    </div>
                    <div className="col-span-12">
                    <ProductColorImages nextIndex={index}  {...{ control, register, errors, getValues ,setValue , trigger , watch}}/>
                    </div>
                    <div className="flex items-center justify-end col-span-12 gap-2 ml-auto">
                    {colourFields.length > 1 && (
                        <button type="button" onClick={() => removeColour(index)} 
                          className="flex items-center justify-center text-white bg-red-400 rounded-sm w-7 h-7"><BiTrash/></button>
                    )}
                        <button type="button" onClick={() => appendColour({
                          name : '', code : '', images : [{ img_url : "",name :'' }]
                        })} className="flex items-center justify-center text-white bg-green-500 rounded-sm w-7 h-7"><BiPlus/></button>
                    </div>
                   
                </div>
                </div>
               )})}
            </div>
            </div>

                  {watchCategory && (
                  <div className="col-span-12">
                  <label htmlFor="contact-lead-score" className="font-medium ">Specifications</label>
                  { categoryFullData?.fullData?.category_type === 'furnitures' ? (
                    <div className="grid grid-cols-12 gap-3 mt-2">
                      <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Material</label>
                              <input
                                  {...register(`specifications.furnitures.material`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter material eg.Wood,Metal"
                              />
                              {errors?.specifications?.furnitures?.material && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.material.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">WeightCapacity</label>
                              <input
                              type="number"
                                  {...register(`specifications.furnitures.weightCapacity`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter weightCapacity eg.150 (in kg)"
                              />
                              {errors?.specifications?.furnitures?.weightCapacity && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.weightCapacity.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Assembly Required</label>
                          <div className="flex items-center p-3 bg-gray-100 border rounded-lg">
                            <label className="flex items-center mr-3">
                              <input
                                type="radio"
                                value="true"
                                className="w-4 h-4 text-green-500 form-radio"
                                {...register("specifications.furnitures.assemblyRequired")}
                              />
                              <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="false"
                                className="w-4 h-4 text-gray-400 form-radio"
                                {...register("specifications.furnitures.assemblyRequired")}
                              />
                              <span className="ml-2">No</span>
                            </label>
                            </div>
                              {errors?.specifications?.furnitures?.assemblyRequired && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.assemblyRequired.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Finish Type</label>
                              <input
                                  {...register(`specifications.furnitures.finishType`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Finish Type e.g.,Matte, Glossy"
                              />
                              {errors?.specifications?.furnitures?.finishType && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.finishType.message}</p>
                              )}
                          </div>
                          <div className="col-span-12">
                          <label htmlFor="contact-lead-score" className="font-medium ">Dimensions</label>
                          <div className="grid grid-cols-12 gap-3">
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Length</label>
                              <input
                              type="number"
                                  {...register(`specifications.furnitures.dimensions.length`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Length e.g., 200 (in cm)"
                              />
                              {errors?.specifications?.furnitures?.dimensions?.length && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.dimensions?.length.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Width</label>
                              <input
                              type="number"
                                  {...register(`specifications.furnitures.dimensions.width`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Width e.g., 100 (in cm)"
                              />
                              {errors?.specifications?.furnitures?.dimensions?.width && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.dimensions?.width.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Height</label>
                              <input
                              type="number"
                                  {...register(`specifications.furnitures.dimensions.height`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Height e.g., 75 (in cm)"
                              />
                              {errors?.specifications?.furnitures?.dimensions?.height && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.dimensions?.height.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Unit</label>
                              <input
                                  {...register(`specifications.furnitures.dimensions.unit`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Unit"
                              />
                              {errors?.specifications?.furnitures?.dimensions?.unit && (
                                  <p className="text-red-500">{errors?.specifications?.furnitures?.dimensions?.unit.message}</p>
                              )}
                          </div>
                          </div>
                          </div>
                    </div>
                  ) : categoryFullData?.fullData?.category_type === 'electronics' ? (
                    <div className="grid grid-cols-12 gap-3 mt-2">
                       <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">PowerConsumption</label>
                              <input
                                  {...register(`specifications.electronics.powerConsumption`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter PowerConsumption e.g., 1500W"
                              />
                              {errors?.specifications?.electronics?.powerConsumption && (
                                  <p className="text-red-500">{errors?.specifications?.electronics?.powerConsumption.message}</p>
                              )}
                          </div>
                          {/* <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Warranty</label>
                              <input
                                  {...register(`specifications.electronics.warranty`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Warranty e.g., 2 years"
                              />
                              {errors?.specifications?.electronics?.warranty && (
                                  <p className="text-red-500">{errors?.specifications?.electronics?.warranty.message}</p>
                              )}
                          </div> */}
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Battery Life</label>
                              <input
                                  {...register(`specifications.electronics.batteryLife`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Battery Life e.g., 8 Hours"
                              />
                              {errors?.specifications?.electronics?.batteryLife && (
                                  <p className="text-red-500">{errors?.specifications?.electronics?.batteryLife.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Connectivity</label>
                              <input
                                  {...register(`specifications.electronics.batteryLife`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Connectivity e.g., WiFi, Bluetooth, USB"
                              />
                              {errors?.specifications?.electronics?.connectivity && (
                                  <p className="text-red-500">{errors?.specifications?.electronics?.connectivity.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Voltage</label>
                              <input
                                  {...register(`specifications.electronics.voltage`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Voltage e.g., 220V"
                              />
                              {errors?.specifications?.electronics?.voltage && (
                                  <p className="text-red-500">{errors?.specifications?.electronics?.voltage.message}</p>
                              )}
                          </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-3 mt-2">
                       <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Material</label>
                              <input
                                  {...register(`specifications.kitchen.material`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Material e.g., Stainless Steel, Plastic"
                              />
                              {errors?.specifications?.kitchen?.material && (
                                  <p className="text-red-500">{errors?.specifications?.kitchen?.material.message}</p>
                              )}
                          </div>
                          <div className="flex flex-col col-span-3">
                              <label htmlFor="contact-lead-score" className="font-medium">
                                Dishwasher Safe 
                              </label>
                              <div className="flex items-center p-3 bg-gray-100 border rounded-lg">
                                <label className="flex items-center mr-3">
                                  <input
                                    type="radio"
                                    value="true"
                                    className="w-4 h-4 text-green-500 form-radio"
                                    {...register("specifications.kitchen.dishwasherSafe")}
                                  />
                                  <span className="ml-2">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    value="false"
                                    className="w-4 h-4 text-gray-400 form-radio"
                                    {...register("specifications.kitchen.dishwasherSafe")}
                                  />
                                  <span className="ml-2">No</span>
                                </label>
                              </div>
                              {errors?.specifications?.kitchen?.dishwasherSafe && (
                                <p className="text-red-500">{errors?.specifications?.kitchen?.dishwasherSafe.message}</p>
                              )}
                            </div>
                          <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">Heat Resistance</label>
                              <input
                                  {...register(`specifications.kitchen.heatResistance`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Heat Resistance e.g., Up to 400°F"
                              />
                              {errors?.specifications?.kitchen?.heatResistance && (
                                  <p className="text-red-500">{errors?.specifications?.kitchen?.heatResistance.message}</p>
                              )}
                          </div>
                          {/* <div className="flex flex-col col-span-3">
                          <label htmlFor="contact-lead-score" className="font-medium ">set Includes</label>
                              <input
                                  {...register(`specifications.kitchen.setIncludes`)}
                                  className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs mt-2"
                                  placeholder="Enter Connectivity e.g., Spoon, Fork, Knife"
                              />
                              {errors?.specifications?.kitchen?.setIncludes && (
                                  <p className="text-red-500">{errors?.specifications?.kitchen?.setIncludes.message}</p>
                              )}
                          </div> */}
                    </div>
                  )}
                  </div>
                  )}
           

            <div className="flex justify-end col-span-12 mt-2">
              <button className="px-5 py-3 text-white rounded-md bg-primaryColor flex justify-center items-center hover:bg-yellow-400 hover:text-black font-bold" type="submit">{productData ? "Update" : "Create"}</button>
            </div>

    </div>
      </form>
    </div>
  )
}

export default ProductCreate
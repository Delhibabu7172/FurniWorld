import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadSingleApi } from "../../../../api-service/authApi";
import { MdCancel } from "react-icons/md";
import { PiUploadFill } from "react-icons/pi";
import { getErrorMessage } from "../../../../utils/helper";
import { BiPlus, BiTrash } from "react-icons/bi";

function ProductColorImages({ nextIndex, control, register , errors , setValue, trigger, watch} : any) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `productColour.${nextIndex}.images`
      });

      

      const handleUploadImage = async (e: any, index: number,) => {

        const file = e.target.files[0];
        const allowedFileTypes = ['image/jpeg', 'image/png'];
      
        // File size and type checks
        
        if (file.size > 2 * 1024 * 1024) {
          toast.error('File size exceeds 2MB.');
          return;
        } else if (!allowedFileTypes.includes(file.type)) {
          toast.error('Only JPG, PNG files are allowed.');
          return;
        }
      
        try {
          const formData = new FormData();
          formData.append('file', e.target.files[0]);
          const uploadData = await uploadSingleApi(formData);
          if (
            uploadData &&
            uploadData.data.result &&
            uploadData.data.result.length
          ) {
            const imageUrl = uploadData.data.result[0].location;
            console.log(imageUrl);
            // setValue(`productColour.${index}.${fieldName}` as any, imageUrl || '');
            setValue(`productColour.${nextIndex}.images.${index}.img_url` as any, imageUrl || '');
            console.log(`productColour.${nextIndex}.images.${index}.img_url`);
            
            toast.success(uploadData.data.msg)
          }
        } catch (error) {
          toast.error('Something went wrong...');
          }
      };
    
      return (
        <div>
          <div className="grid grid-cols-12 gap-3">
            
           {fields.map((item, index) => {
                const imageArray = watch(`productColour.${nextIndex}.images.${index}.img_url`);
          
           return (
                <div
                  className="col-span-6 gap-2 "
                  key={item.id}
                >
                  <div>
                  <label htmlFor="contact-lead-score" className="font-medium ">Image Name</label>
                    <input
                      type="text"
                      className="border-[1px] w-full py-[6px] rounded-sm px-2 placeholder:text-xs"
                      placeholder="Enter Image Name"
                      {...register(
                        `productColour.${nextIndex}.images.${index}.name`
                      )}
                    />
                    {errors.productColour?.[nextIndex]?.images?.[index]?.name && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.productColour[nextIndex].images[index].name.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 mt-2">
                        <label className="font-medium ">Upload Image</label>
                        <div className="h-36 border-dashed border-primaryColor border-[2px] !border-spacing-10 rounded-md flex justify-center items-center mt-2">
                          
                        {imageArray ?  (
                                <div className='flex items-center justify-center w-full mx-auto my-3'>
                                  <div className="flex h-32 cursor-pointer w-36">
                                    <img
                                      className="rounded-md h-full w-[80%] mx-auto border-[1px] border-[#DFDFDF]"
                                      alt="No Image"
                                      src={imageArray}  // Use the dynamic frontImage value
                                    />
                                    <MdCancel
                                      className='w-[18px] hover:scale-110 ms-1 hover:text-primaryColor'
                                      onClick={() => {
                                        setValue(`productColour.${nextIndex}.images.${index}.img_url`, ''); // Clear image
                                        trigger(`productColour.${nextIndex}.images.${index}.img_url`); // Trigger validation
                                      }}
                                    />
                                  </div>
                                </div>
                            ) : (
                              <div>
                                <label className="flex flex-col items-center justify-center text-[#2B2B2D] cursor-pointer" htmlFor={`frontImage-${index}`}>
                                  <PiUploadFill className="w-10 h-10"/>
                                  <p>Upload Image</p>
                                </label>
                                <input
                                  id={`frontImage-${index}`}
                                  type="file"
                                  className='hidden'
                                  onChange={(e) => handleUploadImage(e, index)}
                                />
                              </div>
                            )}
                       </div>
                        {errors?.productColour?.[nextIndex]?.images?.[index]?.img_url && (
                            <p className="text-red-500">{getErrorMessage(errors.productColour[nextIndex]?.images?.[index]?.img_url)}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                    {fields.length > 1 && (
                    <button
                      type="button"
                      className="flex items-center justify-center mb-2 text-white bg-red-500 rounded-sm h-7 w-7"
                      onClick={() => remove(index)}
                    >
                     <BiTrash/>
                    </button>
                  )}
                  <button
                    type="button"
                    className="flex items-center justify-center mb-2 text-white bg-green-500 rounded-sm h-7 w-7"
                    onClick={()=> append({name : '' , })}
                  >
                   <BiPlus/>
                  </button>
                  </div>
                </div>
              )})}
              </div>
        </div>
      )
    }
    

export default ProductColorImages
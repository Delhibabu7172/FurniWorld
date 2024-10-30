import { yupResolver } from "@hookform/resolvers/yup";
import newLogo from "../../assets/images/navbar/newlogo.svg"
import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { postSigninApi } from "../../api-service/authApi";
import { getErrorMessage } from "../../utils/helper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function LoginWithoutHeaderModal() {

  

    const navigate = useNavigate()
    const [error , setError] = useState('')
    const [passwordshow1, setpasswordshow1] = useState(false);

    interface LoginFormData {
        email: string;
        password: string;
        navigate?: any;
        device_id?: string;
        role: string;
      }
    
      const schema = yup.object().shape({
        email: yup.string().required('UserName is required'),
        password: yup.string().required('Password is required'),
        navigate : yup.string().optional(),
        device_id : yup.string().optional(),
        role : yup.string().optional(),
    })

    const {
        handleSubmit,
        register,
        formState : {errors}
      } = useForm<LoginFormData>({
        mode: 'onChange',
        resolver: yupResolver(schema) as Resolver<LoginFormData>,
      });
    
      const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        const payload = {
          ...data,
          ip: '30',
        };
      
        console.log(payload);
      
        try {
          const updateApi = await postSigninApi(payload);
          console.log(updateApi);
      
          if (updateApi?.status === 200) {

            localStorage.setItem('access-token', updateApi.data?.result.tokens.accessToken);
            localStorage.setItem( 'role',btoa(updateApi.data?.result.user.role.name));
            localStorage.setItem('refreshToken',updateApi.data?.result.tokens.refreshToken);
            localStorage.setItem('userId',updateApi.data?.result.user._id);
            localStorage.setItem('name', updateApi.data?.result.user.name);
    
            toast.success(updateApi?.data?.msg)
            navigate('/')  
            window.location.reload()
          } else{
            setError('InValid UserName or Password.')
            toast.remove()
          }
      
        } catch (error) {
          console.error("Failed to login:", error);
        }
      };
    

  return (
    
        <div className="flex flex-col  px-5 py-4 font-Lexend">
            <div>
            <div className='col-span-12 flex items-center justify-center gap-2'>
                        <img src={newLogo} alt="" />
                        <p className='font-bold text-lg'>FURNI WORLD</p>
                    </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
             <div className="grid grid-cols-12 mt-4 gap-y-4">
                            <div className="col-span-12 xl:col-span-12">
                                <label htmlFor="signin-username" className="form-label text-default">User Name</label>
                             <input type="text" className="border-[1px] border-primaryColor/40 p-2 w-full !rounded-md" id="signin-username" placeholder="user name" {...register('email')} />
                             {errors.email && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors.email)}</p>}
                            </div>
                            <div className="col-span-12 mb-2 xl:col-span-12">
                                <label htmlFor="signin-password" className="block form-label text-default">Password</label>
                                <div className="col-span-12 input-group border-[1px] border-primaryColor/40 !rounded-md overflow-hidden relative">
                                <input type={(passwordshow1) ? 'text' : "password"} className="w-full p-2" id="signin-password" placeholder="password" {...register('password')} />
                                    <div onClick={()=>setpasswordshow1(!passwordshow1)} aria-label="button" className="absolute top-[50%] right-2 transform translate-y-[-50%] " >{passwordshow1 ? <FaRegEye className="w-4 h-4"/> : <FaRegEyeSlash  className="w-4 h-4"/>}</div>
                                </div>
                                {errors.password && <p className='mt-1 text-xs font-medium text-red-500'>{getErrorMessage(errors.password)}</p>}
                                <div className="flex items-center justify-between mt-2">
                                    <div className="form-check !ps-0 flex justify-center focus-visible:bg-none">
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="text-xs ms-1" htmlFor="defaultCheck1">
                                            Remember password ?
                                        </label>
                                    </div>
                                    <Link to={`/forgotPassword`} className="ltr:float-right rtl:float-left text-danger">Forget password ?</Link>
                                </div>
                            </div>
                            {error && <p className='col-span-12 font-medium text-red-500'>{error}</p>}
                            <div className="grid col-span-12 xl:col-span-12">
                            <button aria-label="button" type="submit" className=" !bg-yellow-400 py-2 rounded-sm  !font-bold"
                      
                      >
                        Sign In
                      </button>
                            </div>
                 </div>
                 </form>
                 </div>
        </div>
    
  )
}

export default LoginWithoutHeaderModal
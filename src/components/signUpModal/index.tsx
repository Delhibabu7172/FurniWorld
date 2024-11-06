
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "../../utils/helper";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "./OtpModal.css"
import { BiCheckCircle } from 'react-icons/bi';
import newLogo from "../../assets/images/navbar/newlogo.svg"
import { postMobileOtpSendApi, postMobileOtpVerifyApi, putSignUpFormApi } from '../../api-service/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SignUpModal() {

    const navigate = useNavigate()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [otp, setOtp] = useState<string>("");
    // const [otpError ,setOtpError] = useState('')
    const [userId , setUserId] = useState('')
    const [timer, setTimer] = useState(30);
    const [isDisabled, setIsDisabled] = useState(true);

    const [emailSendOtp, setEmailSendOtp] = useState(false)
    const [emailOtpVerify, setEmailOtpVerify] = useState(false)

    const [passwordshow1, setpasswordshow1] = useState(false);

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        mobile: yup.string().required('Mobile Number is required').matches(/^[6-9][0-9]{9}$/, "Mobile number should be 10 digits"),
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string()
            .required('Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    
    // for email validation
    const handleEmailChange = (e:any) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const otpTrigger = async () => {
        const payload = {
            mobile : email
        }
        const uploadApi = await postMobileOtpSendApi(payload)
        if(uploadApi?.status === 200){
            toast.success(uploadApi?.data?.msg)
        }
    };

    // for email otp send function
    const handleEmailSend  = async() => {
        if(!emailRegex.test(email)){
            setEmailError('Please enter a valid email');
            return;
        }else{
            setEmailError('');
        }

        const payload = {
            mobile : email
        }
        const uploadApi = await postMobileOtpSendApi(payload)
        if(uploadApi?.status === 200){
            toast.success(uploadApi?.data?.msg)
            setEmailSendOtp(true)
        }
    }

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            setIsDisabled(false);
        }
    }, [timer]);

    const handleResend = () => {
        otpTrigger();
        setIsDisabled(true);
        setTimer(30);
    };

    // for otp verify api function
    const otpVerify = async () => {
        const payload = {
            mobile : email,
            otp : otp
        }
        const verifyApi = await postMobileOtpVerifyApi(payload)
        if(verifyApi?.status === 200){
            toast.success(verifyApi?.data?.msg)
            setUserId(verifyApi?.data?.result?.user?._id)
            setEmailOtpVerify(true)
            setEmailSendOtp(false)
        }
        
    }

    const onSubmit = async (data: any) => {
        const payload = {
            firstName: data?.firstName,
            lastName: data?.lastName,
            mobile: data?.mobile,
            password: data?.password,
            confirmPassword: data?.confirmPassword,
        };
        
        console.log(payload);
        const updateApi = await putSignUpFormApi(userId,payload)
        if(updateApi?.status === 200){
            toast.success(updateApi?.data?.msg)
            navigate('/')
            window.location.reload()
        }
    }



    return (
        <>
        

            <div className="px-5 py-4 font-Lexend">
            <form action="">
                <div className="grid grid-cols-12 gap-y-4 mt-4">
                    <div className='col-span-12 flex items-center gap-2'>
                        <img src={newLogo} alt="" />
                        <p className='font-bold text-lg'>FURNI WORLD</p>
                    </div>
                    <div className="col-span-12">
                        <label htmlFor="signin-username" className="form-label text-default">Enter Email <span className='text-red-400'>*</span></label>
                        <input type="email" className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs" placeholder="Enter Email"
                            onChange={handleEmailChange}
                            value={email} />
                            {emailError && <p className='text-red-400 text-xs mt-1 font-medium'>{emailError}</p>}
                    </div>
                    {emailSendOtp ? (
                        <div className='col-span-12'>
                            <div className="flex justify-center">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    inputType="tel"
                                    numInputs={6}
                                    inputStyle="custom-otp-field"
                                    renderInput={(props) => <input {...props} />}
                                />

                            </div>
                            {/* {otpError && <p className="text-red mt-1 text-xs">{otpError}</p>} */}
                            <div className="flex justify-center mt-5">
                                <button
                                    type='button'
                                    className="bg-primaryColor w-fit text-white py-2 px-2 rounded-md"
                                    disabled={!otp || otp.length !== 6}
                                    onClick={otpVerify}
                                >
                                    Verify & Continue
                                </button>
                            </div>
                            <p className="text-sm mt-3 text-gray-500">
                                Didn&apos;t receive code?{" "}
                                <span
                                    className={`  ${isDisabled ? "text-primaryColor/60 cursor-not-allowed" : "text-primaryColor underline cursor-pointer"
                                        }`}
                                    onClick={isDisabled ? undefined : handleResend}
                                >
                                    Request again {isDisabled && `(${timer}s)`}
                                </span>
                            </p>
                        </div>
                    ) : (
                        
                        !emailSendOtp && !emailOtpVerify  ? (
                            <div className="col-span-12 flex justify-end">
                                <button
                                type='button'
                                    onClick={() => handleEmailSend()}
                                    className="bg-primaryColor text-white hover:bg-yellow-400 hover:text-black p-2 flex justify-center items-center rounded-sm font-light text-sm">Send OTP</button>
                            </div>
                        ) : (
                            <div className='col-span-12 flex justify-end'>
                                <p className='flex items-center text-white gap-[2px] bg-green-400 px-2 py-1 rounded-tl-2xl rounded-br-2xl '><span className='text-white'>Verified</span> <BiCheckCircle /></p>
                            </div>
                        )

                    )}

                    {emailOtpVerify && (
                        <>
                            <div className="col-span-12 grid grid-cols-12 gap-3">
                                <div className="col-span-12 lg:col-span-6">
                                    <label htmlFor="signin-username" className="form-label text-default">First Name <span className='text-red-400'>*</span></label>
                                    <input type="text" className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs" placeholder="Enter First Name" {...register('firstName')} />
                                    {errors.firstName && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.firstName)}</p>}
                                </div>
                                <div className="col-span-12 lg:col-span-6">
                                    <label htmlFor="signin-username" className="form-label text-default">Last Name <span className='text-red-400'>*</span></label>
                                    <input type="text" className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs" placeholder="Enter Last Name" {...register('lastName')} />
                                    {errors.lastName && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.lastName)}</p>}
                                </div>
                            </div>

                            <div className="col-span-12">
                                <label htmlFor="signin-username" className="form-label text-default">Mobile Number <span className='text-red-400'>*</span></label>
                                <input
                                    id="alternateNumber"
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs"
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
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="signin-username" className="form-label text-default">Password <span className='text-red-400'>*</span></label>
                                <input type="email" className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs" id="signin-username" placeholder="Enter Old Password" {...register('password')} />
                                {errors.password && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.password)}</p>}
                            </div>
                            <div className="xl:col-span-12 col-span-12 mb-2">
                                <label htmlFor="signin-password" className="form-label text-default block">Confirm Password <span className='text-red-400'>*</span></label>
                                <div className="input-group">
                                    <input type={(passwordshow1) ? 'text' : "password"} className="w-full border border-primaryColor/50 p-2  outline-none  !rounded-md bg-gray-100 placeholder:text-xs" id="signin-password" placeholder="Enter Confirm password" {...register('confirmPassword')} />
                                    <button onClick={() => setpasswordshow1(!passwordshow1)} aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                                </div>
                                {errors.confirmPassword && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.confirmPassword)}</p>}
                            </div>
                            <div className="xl:col-span-12 col-span-12 grid mt-2">
                        <button  type="submit" className=" !bg-primaryColor  py-2 !text-white !font-medium"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </button>
                    </div>
                        </>
                    )}


                    {/* <div className='col-span-12'>
                        <p className='text-sm font-extralight'>Already have an Account. <span className='underline cursor-pointer font-medium text-primaryColor'
                        onClick={()=>{setOpenLogin(true)}}>SignIn</span></p>
                    </div> */}
                </div>
            </form>
        </div>
        

        {/* {openLogin && (
            <LoginModal openModal={openLogin} handleClose={()=>setOpenLogin(!openLogin)}/>
        ) } */}
        </>
        
    )
}

export default SignUpModal
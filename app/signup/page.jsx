// 'use client'
// import React, { useState } from 'react'
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
// import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
// import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import signupAnimation from '../../animation/signup.json'
// import signupAnimation2 from '../../animation/signup2.json'
// import { ToastContainer, toast } from 'react-toastify';

// import { useFormik } from 'formik';
// import '../login/login.css'
// import './signup.css'
// import { signupSchema } from '../../assests/Schema/Schema.jsx'
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// const initialValues = {
//     name: '',
//     phone_no: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//     address: '',
// }
// const Sign = () => {
//     const router = useRouter();
//     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//         initialValues: initialValues,
//         validationSchema: signupSchema,
//         onSubmit: async (values) => {

//             try {
//                 let res = await axios.post('/api/newuser', values)
//                 res = res.data;
//                 if (res.success) {
//                     router.push(`/login`);
//                 } else {
//                     toast.error(`${res.msg}`, {
//                         position: "top-center",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                 }
//             } catch (err) {
//                 toast.error(`Phone no or email is already registered`, {
//                     position: "top-center",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                 });

//             }

//         }
//     })
//     const [err, setErr] = useState('')
//     // console.log(errors)
//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//             />
//             <div className=' lg:hidden mt-20 signup_container  w-screen md:w-3/5 lg:w-2/5 lg:mt-20 mb-12'>
//                 <form onSubmit={handleSubmit}>
//                     <div className='  login_wrapper mx-4 flex flex-col px-4 py-4 rounded-xl'>

//                         <div className='flex justify-around px-2 '>
//                             <div className='login_button px-7 py-2 signin_button  rounded-lg  text-white flex justify-center items-center'><span><PersonAddAltOutlinedIcon className=' icons' /></span> <button>Sign up</button></div>
//                         </div>
//                         <div className=' mt-2  px-2 py-2 '>

//                             <div className='flex flex-col'>
//                                 <div className=' flex  items-center shadow-sm mt-7 signup_wrapper  px-2 py-2 '>
//                                     <div>
//                                         <Person4OutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' name='name' placeholder='Name' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.name && touched.name ? <p className='errorclass'>{errors.name}</p> : null
//                                 }
//                             </div>



//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper  px-2 py-2 '>
//                                     <div>
//                                         <LocalPhoneOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" name='phone_no' value={values.phone_no} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Phone Number' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.phone_no && touched.phone_no ? <p className='errorclass'>{errors.phone_no}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <HomeWorkOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Address' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.address && touched.address ? <p className='errorclass'>{errors.address}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <MailOutlineOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Email' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.email && touched.email ? <p className='errorclass'>{errors.email}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <LockOpenIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Password' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.password && touched.password ? <p className='errorclass'>{errors.password}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>

//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <LockOpenIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="password" name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Confirm Password' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.confirm_password && touched.confirm_password ? <p className='errorclass'>{errors.confirm_password}</p> : null
//                                 }
//                             </div>
//                         </div>



//                         <div className='ml-3 mt-7'>
//                             <h1 className='text-blue underline'>Forgot Password?</h1>
//                         </div>
//                         <div className='login_button signin_button  text-center shadow-lg  py-3 px- 2 rounded-xl mt-4 '>
//                             <button type='submit' className='text-white '>Sign In</button>
//                         </div>
//                         <div className='mt-7'>
//                             <h1>{`Don't have an Account `}<span className='text-blue-500 underline'>Sign up</span></h1>
//                         </div>
//                     </div>
//                 </form>

//             </div>


//             {/* large screen signup start */}

//             <div className=' hidden lg:inline-block mt-20 signup_container neon-shadow w-screen lg:w-2/5 '>



//                 <div className='   mx-4 flex flex-col px-4 py-4 rounded-xl'>
//                     <div className='flex justify-around px-2 '>
//                         <div className='login_button px-7 py-2 shadow-sm  rounded-lg  text-white flex justify-center items-center'><span><PersonAddAltOutlinedIcon className=' icons' /></span> <button>Sign up</button></div>
//                     </div>
//                     <form onSubmit={handleSubmit}>

//                         <div className=' mt-2  px-2 py-2 '>

//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper  px-2 py-2 '>
//                                     <div>
//                                         <Person4OutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Name' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.name && touched.name ? <p className='errorclass'>{errors.name}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper  px-2 py-2 '>
//                                     <div>
//                                         <LocalPhoneOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" name='phone_no' value={values.phone_no} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Phone Number' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.phone_no && touched.phone_no ? <p className='errorclass'>{errors.phone_no}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <HomeWorkOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="text" name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Address' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.address && touched.address ? <p className='errorclass'>{errors.address}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <MailOutlineOutlinedIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Email' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.email && touched.email ? <p className='errorclass'>{errors.email}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <LockOpenIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Password' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.password && touched.password ? <p className='errorclass'>{errors.password}</p> : null
//                                 }
//                             </div>


//                             <div className='flex flex-col'>
//                                 <div className=' flex items-center shadow-sm mt-7 signup_wrapper px-2 py-2 '>
//                                     <div>
//                                         <LockOpenIcon className='' />
//                                     </div>
//                                     <div className='w-full ml-2 '>
//                                         <input type="password" name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Confirm Password' />
//                                     </div>
//                                 </div>
//                                 {
//                                     errors.confirm_password && touched.confirm_password ? <p className='errorclass'>{errors.confirm_password}</p> : null
//                                 }
//                             </div>

//                         </div>
//                         <div className='ml-3 mt-7'>
//                             <h1 className='text-blue underline'>Forgot Password?</h1>
//                         </div>
//                         <div className='login_button text-center shadow-lg  py-3 px- 2 rounded-xl mt-4 signin_button'>
//                             <button type='submit' className='text-white w-full'>Sign In</button>
//                         </div>
//                     </form>

//                     <div className='mt-7'>
//                         <h1>{`Don't have an Account`} <span className='text-blue-500 underline'>Sign up</span></h1>
//                     </div>
//                 </div>

//             </div>

//             {/* large screen   end */}



//         </>


//     )

// }

// export default Sign

'use client'

import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaGooglePlus } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Loader from '../../components/Loader/Loader'



const page = () => {
    const [loading, setLoading] = useState(true)
    const session = useSession();
    const router = useRouter()


    useEffect(() => {
        if (session?.status === "loading") {
            setLoading(true);
        }
        else if (session.status === 'authenticated') {
            router.push('/need')
        } else {
            setLoading(false);
        }
    }, [session, session.status])


    if (loading) {
        return <Loader />
    }
    return (
        <div className='flex-col h-screen w-screen flex justify-center items-center gap-y-6'>
            <div className='w-full h-full flex justify-center items-center flex-col'>
                <h2 className='text-3xl font-bold'>Login</h2>
                <div onClick={(e) => signIn('google')} className='flex cursor-pointer justify-center items-center gap-x-4  w-72 rounded-xl text-white font-bold bg-red-500 py-3 px-5 mt-5'>
                    <FaGooglePlus className='login_icons w-8 h-8' /> <span>Continue with Google</span>
                </div>
                <div onClick={(e) => signIn('github')} className=' flex cursor-pointer gap-x-4 justify-center items-center  w-72 rounded-xl text-white font-bold bg-black py-3 px-5 mt-2'>
                    <FaGithub className='login_icons w-8 h-8' />
                    <span> Continue with Github </span></div>
            </div>

        </div>
    )
}

export default page
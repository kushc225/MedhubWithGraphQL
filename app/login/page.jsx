'use client'
import React, { useState, useEffect } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import loginAnimation from '../../animation/login.json'
import { useContext } from 'react';
import Link from 'next/link';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import axios from 'axios';
import { useFormik } from 'formik';
import Lottie from 'lottie-react';
import './login.css'
import { loginSchema } from '../../assests/Schema/Schema';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import { useSession } from 'next-auth/react';
import Loader from '../../components/Loader/Loader';

const Login = () => {
    const session = useSession();

    const { user, setToken, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const initialValues = {
        email: "",
        password: ''
    }

    const router = useRouter();

    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const toast_hanlder_object = {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            };
            try {
                let res = await axios.post('/api/login', values)
                let profile = await axios.get('/api/profile');
                profile = profile.data.userProfile;
                res = res.data;
                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem('username', profile.name);
                    setToken(() => {
                        return { token: res.token }
                    });
                    setUser({ username: profile.name });
                    router.push('/donate')

                } else {
                    toast.error(res.data.msg, toast_hanlder_object)
                }
            } catch (err) {
                toast.error(err.messaage, toast_hanlder_object)
            }
        }
    })

    useEffect(() => {
        console.log({ session })
        if (session?.status === "loading") {
            setLoading(true);
        }
        else if (session.status === '"authenticated"') {
            router.push('/need')
            setLoading(false);
        } else setLoading(false);
    }, [session && session.status])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className='main_login_main_container'>

                <div className='login_container w-screen  lg:w-full md:flex  md:justify-center '>
                    <div className='lg:flex largescreenContainer bgblue mx-5 lg:w-auto neon-shadow'>
                        <div className='hidden lg:inline-block'>
                            <div className="flex justify-center w-full  items-center ">
                                {/* <Lottie className="" options={defaultOptions} height={400} width={400} /> */}
                                <Lottie animationData={loginAnimation} style={{ height: 400, width: 400 }} loop={true} />
                            </div>
                        </div>
                        <div className='login_wrapper  mx-4 flex flex-col px-4 py-4 rounded-xl lg:w-96'>
                            <div className='flex justify-around pt-1 '>
                                <div className='login_button px-7 p-2  rounded-lg  text-black flex justify-center items-center shadow-lg '><span><Person4OutlinedIcon className=' icons' /></span> <p className='text-white'>Login</p></div>

                            </div>
                            <div className=' mt-4  px-2 pt-2 '>
                                <form onSubmit={handleSubmit}>
                                    <div className=' flex items-center rounded-xl shadow-sm mt-7 input_wrapper px-2 py-2 '>
                                        <div className='flex justify-center items-center w-full'>

                                            <div>
                                                <Person4OutlinedIcon className='' />
                                            </div>
                                            <div className='w-full ml-2 '>
                                                <input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' name='email' placeholder='E-mail' />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        touched.email && errors.email ? <p className='errorclass'> {errors.email}</p> : null
                                    }
                                    <div className=' flex items-center w-full rounded-xl shadow-sm mt-7 input_wrapper px-2 py-2 '>
                                        <div>
                                            <LockOpenIcon className='' />
                                        </div>
                                        <div className='w-full ml-2 '>
                                            <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='login_form_input py-3  outllne-none w-full' placeholder='Password' />
                                        </div>
                                    </div>
                                    {
                                        touched.password && errors.password ? <p className='errorclass'> {errors.password}</p> : null
                                    }
                                    <div className='ml-3 mt-7'>
                                        <h1 className='cursor-pointer text-blue underline'>{`Forgot Password ?`}</h1>
                                    </div>
                                    <div className='login_button text-center shadow-lg  py-3 px- 2 rounded-xl mt-4 '>
                                        <button type='submit' className='w-full  text-white '>{`Login`}</button>
                                    </div>
                                </form>
                            </div>

                            <div className='mt-7 flex'>
                                <h1>{`Don't have an Account ?  `}</h1>
                                <Link href='/signup' className='hover:text-xl  cursor-pointer  ml-2 underline transition-all'>
                                    {` Sign up`}
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div >


        </>

    )
}

export default Login
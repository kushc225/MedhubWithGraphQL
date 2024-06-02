'use client'
import React, { useState, useEffect } from 'react'
import c from '../../animation/c.json'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import './donate.css'
import { ToastContainer, toast, useToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react'
import Loader from '../../components/Loader/Loader'
import { request } from '../../lib/graphql'
import { DONATE } from '../../lib/mutation'
const Donate = (props) => {
    const session = useSession();
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [mfd, setMFD] = useState('')
    const [expire, setExpire] = useState('')
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        if (session?.status === "loading") {
            setLoading(true);
        } else if (session.status === 'unauthenticated') {
            router.push('/login')
        } else {
            setLoading(false);
        }
    }, [session && session.status])

    const submitHanlder = async () => {
        try {
            if (!name || quantity === 0 || !mfd || !expire) {
                toast.error('Please Enter all the Infomation ')
                return;
            }
            setLoading(true);
            const input = {
                input: {
                    email: session?.data?.user?.email,
                    expire,
                    mfd,
                    name,
                    quantity: parseInt(quantity)
                }
            }

            const { donate } = await request(DONATE, input);
            console.log({ donate: donate.success })
            setName('')
            setQuantity(0);
            let toast_handler = toast.error;
            if (donate.success) {
                toast('Added Successfully...');
                setLoading(false);
            }
        } catch (error) {
            toast(error.messaage);
        } finally {
            setLoading(false);
        }
    }
    //FIXME: THIS WAS THE PREVIOUS API CALL 
    // const submitHanlder = async () => {
    //     try {
    //         if (!title || !description) {
    //             toast.error('Please Enter something in Medicine Name and provide a little description.')
    //             return;
    //         }
    //         const token = localStorage.getItem("token");
    //         const data = { title, description, quantity, token }
    //         let res = await axios.post('/api/donate', data)
    //         setTitle('')
    //         setDescription('')
    //         setQuantity(1);
    //         let flag = res.data.success;
    //         let toast_handler = toast.error;
    //         if (flag) {
    //             toast_handler = toast.success;
    //         }
    //         toast_handler(`${res.data.msg}`, {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //         // toast(res.data.msg);
    //     } catch (error) {
    //         toast(error.messaage);
    //     }
    // }


    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className='donate_container  mt-12 mx-2 '>
                <div className='donate_heading '>
                    <h1 className='capitalize text-center mg:text-3xl lg:text-3xl mt-2 text_black'>Please Enter the details of the medicine</h1>
                </div>
            </div>
            <div className=''>
                <div className='mx-2 '>
                    <div className=' mt-8 flex  items-center justify-center flex-col space-y-6  '>
                        <div className=' flex items-center py-2 shadow-lg border-2 border-blue-500 rounded-xl md:w-2/3'>
                            <AiOutlineMedicineBox className='w-12 h-7 cursor-pointer' />
                            <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Medicine Name' className='w-full bg-transparent border-none outline-none text-xl' />
                        </div>
                        <div className=' flex items-center py-2 shadow-lg border-2 border-blue-500 rounded-xl md:w-2/3'>
                            <AiOutlineMedicineBox className='w-12 h-7 cursor-pointer' />
                            <input name="mfd" value={mfd} onChange={(e) => setMFD(e.target.value)} type="date" placeholder='Medicine Description' className='w-full bg-transparent border-none outline-none text-xl' />
                        </div>
                        <div className=' flex items-center py-2 shadow-lg border-2 border-blue-500 rounded-xl md:w-2/3'>
                            <AiOutlineMedicineBox className='w-12 h-7 cursor-pointer' />
                            <input name="expire" value={expire} onChange={(e) => setExpire(e.target.value)} type="date" placeholder='Enter Expire Date' className='w-full bg-transparent border-none outline-none text-xl' />
                        </div>
                        <div className=' flex items-center py-2 shadow-lg border-2 border-blue-500 rounded-xl w-fit'>
                            <input name="quantity" value={quantity} inputMode="numeric" placeholder='Medicine quantity' onChange={(e) => setQuantity(e.target.value)} type="number" className='pl-2 w-full bg-transparent border-none outline-none text-xl' />
                        </div>
                        <button onClick={submitHanlder} className='border-2 border-blue-500 hover:bg-blue-500 py-2 px-4 rounded-xl transition ease-in-out'>Submit</button>
                    </div>
                </div>
            </div>

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
        </>

    )
}
const Temp = ({ title, id, edit, del }) => {

    return <>
        <div className=' shadow-lg bggreen flex rounded-lg mt-4 md:justify-center md:w-2/3'>
            <div className='flex items-center justify-between mx-2 w-full'>
                <h1 className='text-white text-2xl py-2 font-sans overflow-scroll md:line-clamp-1'>{title}</h1>
                <div className='flex'>
                    <AiOutlineEdit onClick={() => edit(id)} className=' ml-2 w-6 h-6 cursor-pointer ' />
                    <MdDeleteOutline onClick={() => del(id)} className='ml-2 w-6 h-6 cursor-pointer' />
                </div>
            </div>
        </div>
    </>
}

export default Donate
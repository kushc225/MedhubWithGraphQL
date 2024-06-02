'use client'
import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './temp.css'




const Temp = () => {
    const imgUlr = "https://qph.cf2.quoracdn.net/main-qimg-603a70b456b433931e2fbd534710ca95-lq"
    return (
        <>
            <div className="main_container py-6">
                <div className='flex border-2 border-blue-500 '>
                    <div className='flex justify-between '>
                        <p className='text-black text-xl'>People</p>
                        <p className='text-black text-xl font-bold'>X</p>
                    </div>
                </div>

                <div>
                    <div className=''>
                        <div className='flex items-center light-blue-bg max-w-fit rounded-md px-2 '>
                            <PersonAddAltIcon className='text-blue-500' />
                            <p className='light-blue text-bold p-2 text-xl capitalize rounded-md'>
                                Add people
                            </p>
                        </div>
                    </div>
                </div>


                <div className='flex  p-2 space-x-2 items-center'>
                    <IoSearchSharp />
                    <input type="text" className='input' placeholder='Search for People' />
                </div>

                <div>
                    <h1 className='font-mono pl-4 uppercase text-black'>In Meeting</h1>
                </div>


                <div>
                    <div className='flex justify-between px-3'>

                        <h1 className='text-black'>Contributors</h1>
                        <div className='flex items-center gap-2'>
                            <p className='text-black'>1</p>
                            <p>
                                <IoIosArrowDown />
                            </p>
                        </div>
                    </div>


                    <div>
                        <Card meetingHost={true} img={imgUlr} name={"Kush Kumar Choudhary"} />
                    </div>
                </div>


            </div>
        </>
    )
}

export default Temp


const Card = ({ img, name, meetingHost }) => {
    return <>
        <div className='flex px-2 justify-around'>
            <div className='flex space-x-2 '>
                <div className='w-10 h-10 '>
                    <img className='rounded-full' src={img} alt="profileimg" />
                </div>
                <div>
                    <p className='text-black'> {name}</p>
                    {meetingHost && <p className='text-black'>Meeting Host</p>}
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <CiMicrophoneOn className='w-4 h-4 black' />
                <BsThreeDotsVertical className='w-4 h-4' />
            </div>
        </div>
    </>
}
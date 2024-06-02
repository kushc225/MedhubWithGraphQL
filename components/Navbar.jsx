'use client'
import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context/UserContext'
import { usePathname, useRouter } from 'next/navigation'
import { FaBars } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import Link from 'next/link'
import './Navbar.css'

import { MdOutlineDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react'
const Navbar = () => {
    const { token, setToken, setUser, user, webTheme, toggleTheme } = useContext(UserContext)
    const [showNavbar, setShowNavbar] = useState(false)
    const session = useSession();
    useEffect(() => {
        setUser(localStorage.getItem('username'))
        setToken(() => localStorage.getItem('token'));
        // console.log({ token })
    }, [token])
    const pathname = usePathname()
    const router = useRouter();
    const handleLogout = async () => {
        try {
            signOut();
            // await axios.get('/api/logout')
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            setUser(null);
            setToken(undefined)
            router.push('/login')
        } catch (error) {
            console.log(error.message);
        }
    }

    const smallScreenLogout = () => {
        signOut();
        setShowNavbar(!showNavbar)
    }

    useEffect(() => {
        if (session.status === 'authenticated') {
            setToken(session.data.user);
        }
    }, [session, session.status])


    return (
        <div className='navbar header h-14 '>
            <div className=' px-4 h-full wrapper flex justify-between items-center'>
                <div className='company_name font-mono font-bold '>
                    <h1 className='text-2xl hoverclass ggreen cursor-pointer'>
                        MedHub
                    </h1>
                </div>
                {
                    !showNavbar &&
                    <div className="bar md:hidden" onClick={() => setShowNavbar(true)}>
                        <FaBars className='text-2xl' />
                    </div>
                }
                {/* navbar for mobile start */}
                {
                    showNavbar && <div className='dropdown md:hidden absolute border-2 w-screen top-0 left-0 h-screen '  >
                        <div className='flex w-screen'>
                            <ul className='flex flex-col text-center mt-12 justify-center items-center w-full '>
                                <li onClick={() => setShowNavbar(!showNavbar)} className={`'${pathname === '/' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/">Home</Link></li>
                                {
                                    session.status === 'authenticated' && <li onClick={() => setShowNavbar(!showNavbar)} className={`'${pathname === '/donate' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/donate">Donate Us</Link></li>
                                }
                                {
                                    session.status === 'authenticated' && <li onClick={() => setShowNavbar(!showNavbar)} className={`'${pathname === '/need' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/need">Need</Link></li>
                                }

                                <li onClick={() => setShowNavbar(!showNavbar)} className={`'${pathname === '/about' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/about">About</Link></li>

                                {session.status === 'unauthenticated' && <li onClick={() => setShowNavbar(!showNavbar)} className={`'${pathname === '/signup' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/signup">Sign Up/ Login</Link></li>}
                                {
                                    session.status === 'authenticated' && (<>
                                        <li onClick={smallScreenLogout} className={` ${pathname === '/logout' && ' active hoverclass '}'py-3 border-b-2 w-5/6 text-center cursor-pointer `}>Logout</li>\
                                        <li className={`'${pathname === '/profile' && ' active hoverclass '}' py-3 border-b-2 w-5/6 text-center'`}><Link className='text-2xl ' href="/profile">P</Link></li>
                                    </>
                                    )
                                }
                            </ul>
                            {/* navbar for mobile end */}

                            <div onClick={() => setShowNavbar(false)} className=' pt-12 '>
                                <ImCross className='-ml-10 mt-4' />
                            </div>
                        </div>
                    </div>
                }

                {/* large screen navar  start */}
                <div className="hidden  md:flex justify-center ">
                    <div className='mr-2 cursor-pointer' onClick={toggleTheme}>
                        {
                            // webTheme === '' ? < BsSun className='darkmode' /> : <MdOutlineDarkMode className='darkmode' />
                        }

                    </div>

                    <ul className='md:flex   justify-end  items-center w-full '>
                        <li className='mx-2 '><Link className={`'${pathname === '/' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/">Home</Link></li>
                        {session.status === 'authenticated' && <li className='mx-2 '><Link className={`'${pathname === '/donate' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/donate">Donate Us</Link></li>
                        }
                        {
                            session.status === 'authenticated' &&
                            <li className='mx-2 '><Link className={`'${pathname === '/need' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/need">Need</Link></li>}

                        <li className='mx-2 '><Link className={`'${pathname === '/about' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/about">About</Link></li>
                        {session.status === 'unauthenticated' && <li className='mx-2 '><Link className={`'${pathname === '/signup' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/signup">Sign Up/Login</Link></li>}
                        {
                            session.status === "authenticated" && <>
                                <li onClick={signOut} className={`'${pathname === '/logout' && 'text-2xl  mx-2 active hoverclass '}md:text-xl lg:text-2xl cursor-pointer '`}>Logout</li>
                                <li className='mx-2 '><Link className={`'${pathname === '/profile' && ' active hoverclass '}md:text-xl lg:text-2xl '`} href="/profile">Profile</Link></li>
                            </>
                        }

                        {
                            session.status === 'authenticated' && <li className='mx-2 '><p className={`hoverclass font-light text-sm ml-2 underline inline-block md:text-xl lg:text-xl '`} > {session.data.user.name.split(' ')[0]}</p></li>
                        }
                    </ul>
                </div>
                {/* large screen navar  end */}
            </div>
        </div>
    )
}

export default Navbar
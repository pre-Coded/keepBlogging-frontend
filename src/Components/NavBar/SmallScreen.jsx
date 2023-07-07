import React, { useState, useRef, useEffect } from 'react'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useBlogContext } from '../../utils/BlogContext'

const SmallScreen = () => {
    const blgctx = useBlogContext();

    const [showNav, setShowNav] = useState(null)
    const navigate = useNavigate();

    const handleActive = (e) => {
        const navUlChild = document.getElementById("navUlSmall").querySelectorAll("*");
        console.log(navUlChild);

        navUlChild.forEach((child, index) => {
            if (index !== 0) {
                child.classList.remove("active");
            }

            e.currentTarget.classList.add("active");
        })

        setShowNav(null);
    }

    const location = useLocation();
    const homeRef = useRef(null);
    const blogRef = useRef(null);
    const publishRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const { pathname } = location;

        console.log(pathname);
        if (pathname === '/') {
            homeRef.current?.click();
        } else if (pathname === '/blogs') {
            blogRef.current?.click();
        } else if (pathname === '/publish') {
            publishRef.current?.click();
        } else if (pathname === 'profile') {
            profileRef.current?.click();
        }

    }, [location])

    return (
        <div className="md:hidden text-white">
            {
                <div onClick={() => { setShowNav(prev => !prev) }} className='flex flex-col space-y-4'>
                    <motion.div animate={{ rotate: showNav ? "45deg" : "0" }} className='h-[2px] w-6 bg-white origin-top-left'></motion.div>
                    <motion.div animate={{ rotate: showNav ? "-45deg" : "0" }} className='h-[2px] w-6 bg-white origin-top-left'></motion.div>
                </div>
            }

            <motion.div
                animate={{
                    width: showNav ? "100%" : "0",
                }}
                className='h-full absolute top-[4rem] right-0 overflow-y-scroll scrollbar-hidden z-[1000] bg-[#121212]'
            >
                <ul id="navUlSmall" className='flex flex-col items-center w-full h-full my-20 space-y-4 p-4'>
                    {
                        !blgctx.user ?
                            <>
                                <li
                                    className='whitespace-normal cursor-pointer border-[1px] border-gray-800 w-full py-3 rounded-lg'
                                >
                                    <button onClick={() => { setShowNav(prev => !prev); navigate('/signup') }} className='h-full w-full'>
                                        Sign Up
                                    </button>
                                </li>

                                <li
                                    className=' whitespace-normal cursor-pointer w-full py-3 rounded-lg bg-white text-black'
                                >
                                    <button onClick={() => { setShowNav(prev => !prev); navigate('/login') }} className='h-full w-full'>
                                        Log In
                                    </button>
                                </li>
                            </> :

                            <li
                                className=' whitespace-normal cursor-pointer w-full py-3 rounded-lg bg-white text-black'
                            >
                                <button onClick={() => { setShowNav(prev => !prev); navigate('/login'); blgctx.handleSignOut(); }} className='h-full w-full'>
                                    Log Out
                                </button>
                            </li>
                    }

                    {
                        blgctx.user &&
                        <>
                            <li
                                ref={homeRef}
                                onClick={handleActive}
                                className='bg-transparent z-10 active whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                            >
                                <Link to="/" className='h-full w-full'>
                                    Home
                                </Link>
                            </li>
                            <li
                                ref={blogRef}
                                onClick={handleActive}
                                className='bg-transparent z-10 whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                            >
                                <Link to="/blogs" className='h-full w-full'>
                                    Blogs
                                </Link>
                            </li>
                            <li
                                ref={publishRef}
                                onClick={handleActive}
                                className='bg-transparent z-10 whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                            >
                                <Link to="/publish" className='h-full w-full'>
                                    Create
                                </Link>
                            </li>
                            <li
                                ref={profileRef}
                                onClick={(e) => {
                                    blgctx.fetchUserInfo(blgctx.user.username);
                                    handleActive(e);
                                }}
                                className='bg-transparent z-10 whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                            >
                                <Link to="/profile" className='h-full w-full'>
                                    Profile
                                </Link>
                            </li></>
                    }
                </ul>
            </motion.div>
        </div>
    )
}

export default SmallScreen
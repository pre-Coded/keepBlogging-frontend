import React, { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useBlogContext } from '../../utils/BlogContext';
import { FaBlog } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import { BsArrowDown, BsGraphDownArrow, BsSun } from 'react-icons/bs'
import { MdAccountCircle, MdNightlight } from 'react-icons/md'
import { motion } from 'framer-motion'
import { GrDown } from 'react-icons/gr';

const LargeScreen = () => {
    const blgctx = useBlogContext();
    const navigate = useNavigate();

    const [hoverLeft, setHoverLeft] = useState(null);
    const [width, setWidth] = useState(null);
    const [visible, setVisible] = useState(false);

    const location = useLocation();
    const homeRef = useRef(null);
    const blogRef = useRef(null);
    const publishRef = useRef(null);
    const profileRef = useRef(null);
    useEffect(() => {
        const { pathname } = location;

        if (pathname === '/') {
            homeRef.current?.click();
        } else if (pathname === '/blogs') {
            blogRef.current?.click();
        } else if (pathname === '/publish') {
            publishRef.current?.click();
        } else if (pathname === '/profile') {
            publishRef.current?.click();
        }

    }, [location])


    const handleMouseOver = (e) => {
        const navUl = document.getElementById("largeNavLi");

        const netLeft = e.currentTarget.getBoundingClientRect().left - navUl.getBoundingClientRect().left;
        setHoverLeft(netLeft);
        setWidth(e.currentTarget.offsetWidth);
    }

    const handleMouseOut = (e) => {
        const navUl = document.getElementById("largeNavLi");
        setHoverLeft(null);
        setWidth(null);
    }

    const handleActive = (e) => {
        const navUlChild = document.getElementById("largeNavLi").querySelectorAll("*");
        console.log(navUlChild);

        navUlChild.forEach((child, index) => {
            if (index !== 0) {
                child.classList.remove("active");
            }

            e.currentTarget.classList.add("active");
        })
    }

    const [page, setPage] = useState(false);

    return (
        <>
            { blgctx.user && <nav className='hidden md:flex items-center justify-around h-full text-sm'>

                <ul id="largeNavLi" className='h-10 flex flex-row items-center relative'>
                    <motion.div
                        animate={{
                            left: hoverLeft ? hoverLeft : "0",
                            width: width ,
                            opacity: width ? "1" : "0",
                        }}
                        className={`absolute bg-white/5 h-full rounded-md z-0`}
                    ></motion.div>
                    <li ref={homeRef}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={handleActive}
                        className='bg-transparent z-10 active whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                    >
                        <Link to="/" className='h-full w-full'>
                            Home
                        </Link>
                    </li>
                    <li
                        ref={blogRef}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={handleActive}
                        className='bg-transparent z-10 whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                    >
                        <Link to="/blogs" className='h-full w-full'>
                            Blogs
                        </Link>
                    </li>
                    <li
                        ref={publishRef}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={handleActive}
                        className='bg-transparent z-10 whitespace-normal py-2 px-8 cursor-pointer text-gray-500'
                    >
                        <Link to="/publish" className='h-full w-full'>
                            Create
                        </Link>
                    </li>
                </ul>

            </nav>}

            <div>
                {
                    !blgctx.user ?
                        (
                            <>
                                {
                                    page ?
                                        <button onClick={() => { setPage(prev => !prev); navigate('/signup') }} className=" tracking-wider h-12 w-48 hidden md:block">
                                            Sign Up
                                        </button> :
                                        <button onClick={() => { setPage(prev => !prev); navigate('/login') }} className="tracking-wider h-12 w-48 hidden md:block">
                                            Log In
                                        </button>
                                }
                            </>
                        ) :
                        <button ref={profileRef} onClick={() => {
                            blgctx.fetchUserInfo(blgctx.user.username);
                            navigate('/profile')
                        }} className="tracking-wider hidden md:block">
                            Profile
                        </button>
                }
            </div>

        </>
    )
}

export default LargeScreen
import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useBlogContext } from '../../utils/BlogContext';
import { FaBlog } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import { BsArrowDown, BsGraphDownArrow, BsSun } from 'react-icons/bs'
import { MdAccountCircle, MdNightlight } from 'react-icons/md'
import { motion } from 'framer-motion'
import { GrDown } from 'react-icons/gr';
import LargeScreen from './LargeScreen';
import SmallScreen from './SmallScreen'

const NavBar = () => {

    const blgctx = useBlogContext();
    const navigate = useNavigate();

    const [hoverLeft, setHoverLeft] = useState(null);
    const [width, setWidth] = useState(null);


    const handleMouseOver = (e) => {
        const navUl = document.getElementById("largeNavLi");

        const netLeft = e.currentTarget.getBoundingClientRect().left - navUl.getBoundingClientRect().left;
        setHoverLeft(netLeft);
        setWidth(e.currentTarget.offsetWidth);
    }

    const handleMouseOut = (e) => {
        const navUl = document.getElementById("largeNavLi");
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

    return (
        <div className='h-20 w-full flex items-center justify-around overflow-hidden px-4'>
            <p onClick={() => {
                navigate('/');
            }} className='cursor-pointer flex items-center justify-center flex-row space-x-2 whitespace-nowrap font-dyna text-xl'>
                NitJ Bloggers
            </p>

            <LargeScreen />
            <SmallScreen/>
        </div>
    )
}

export default NavBar



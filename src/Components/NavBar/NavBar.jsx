import React from 'react'
import { useNavigate } from "react-router-dom";
import LargeScreen from './LargeScreen';
import SmallScreen from './SmallScreen'

const NavBar = () => {

    const navigate = useNavigate();

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



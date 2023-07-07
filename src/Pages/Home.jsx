import React from 'react'
import {  useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogContext } from '../utils/BlogContext'
import { BiCopyright } from 'react-icons/bi'
import Blog1 from '../assets/blog1.jpg'
import Blog2 from '../assets/blog2.jpg'

const Home = () => {
    const navigate = useNavigate();
    const blgctx = useBlogContext();

    const downRef = useRef(null);
    const home_ref = useRef(null);

    return (

        <div ref={home_ref} id="home-container" className='h-screen w-full pb-24 scroll-smooth relative'>

            <div className='h-full w-full flex flex-col justify-center relative'>
                <div className='flex flex-col items-center justify-center space-y-3 md:space-y-0 md:space-x-4 md:flex-row'>
                    <h1 className='text-white text-6xl lg:text-7xl font-bold tracking-widest gradient-text-1'>Think.</h1>
                    <h1 className='text-white text-6xl lg:text-7xl font-bold tracking-widest gradient-text-2'>Create.</h1>
                    <h1 className='text-white text-6xl lg:text-7xl font-bold tracking-widest gradient-text-3'>Publish.</h1>
                </div>

                <p className="text-gray-500 text-center p-4 text-xl mt-8">
                    Elevate Your Blogging Journey: Unleash Your Creativity, Connect with a Global Community, and Inspire the World with Your Words on our Engaging Blogging Platform!
                </p>

                <div className='flex flex-row items-center space-x-4 justify-center w-full md:space-y-0 md:space-x-3 md:flex-row text-sm mt-8'>
                    <button onClick={() => {
                        downRef.current.scrollIntoView({behavior : 'smooth'});
                    }} className='bg-white h-12 w-36 text-black rounded-lg tracking-wider'>Learn More</button>
                    <button onClick={() => {
                        if(blgctx.user){
                            return navigate('/publish')
                        }
                        navigate('/login')
                    }} className='h-12 w-36 bg-transparent text-white z-10 rounded-lg tracking-wider relative button-gradient flex items-center justify-center'></button>
                </div>

            </div>

            <div ref={downRef} className='w-full relative flex flex-col p-2 mt-10'>

                <div className='w-full flex items-center justify-center'>
                    <div className='flex flex-col md:flex-row md:space-x-4 w-full md:w-[80%] items-center'>
                        <div className='w-full flex items-center justify-center' >
                            <img src={Blog1} className='w-full md:w-[80%] object-cover rounded-md' alt="img loading"></img>
                        </div>

                        <div className='w-full flex flex-col items-center justify-start md:justify-center text-center space-y-4 tracking-wide'>
                            <p className='text-2xl md:text-4xl text-white'>The Blogging Realm Where Dreams Turn into Masterpieces!</p>
                            <p className='text-sm md:text-xl text-gray-500 '>Immerse yourself in a whimsical world of bloggers transforming their dreams into powerful narratives. Explore inspiring stories and thought-provoking ideas to fuel your own creative masterpiece.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <div className='flex flex-col md:flex-row-reverse md:space-x-4 w-full md:w-[80%] items-center'>
                        <div className='w-full flex items-center justify-center' >
                            <img src={Blog2} className='w-full md:w-[80%] object-cover rounded-md' alt="img loading"></img>
                        </div>

                        <div className='w-full flex flex-col items-center justify-start md:justify-center text-center space-y-4 tracking-wide'>
                            <p className='text-2xl md:text-4xl text-white'>Stay Ahead of the Curve with Trendsetters Leading the Way!</p>
                            <p className='text-sm md:text-xl text-gray-500 '>Join the legion of blogging trailblazers who are redefining the landscape of digital storytelling. Stand tall among the ranks or get inspired by the visionaries transforming the blogosphere.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    <p className='w-full md:w-[80%] mt-16 justify-start text-5xl'>
                        Inquiry Expedition
                    </p>

                    <div className='w-full md:w-[80%] place-items-center gap-8 grid grid-cols-1 lg:grid-cols-2 mt-10'>
                        <div className='w-full flex flex-col space-y-4'>
                            <p className='text-3xl text-white'>What makes a blogger exceptional?</p>
                            <p className='text-sm text-gray-500'>An exceptional blogger captivates readers with their unique voice, compelling storytelling, and fresh perspectives on a myriad of subjects. They challenge norms and inspire creative thought.</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>
                            <p className='text-3xl text-white'>How do I join the community?</p>
                            <p className='text-sm text-gray-500'>Simply sign up and embark on a splendid journey through our community of distinguished bloggers who navigate the vast ocean of creative expression, waiting to embrace you!</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>
                            <p className='text-3xl text-white'>Can I contribute to Top Blogs Today?</p>
                            <p className='text-sm text-gray-500'>Absolutely! We’re always seeking brilliant minds and captivating storytellers to contribute to our growing collection of superb blogs. Fan the flames of creativity and let your words ignite the world!</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>
                            <p className='text-3xl text-white'>What if I need inspiration?</p>
                            <p className='text-sm text-gray-500'>Fear not! Our vast treasure trove of blog posts spans across genres, ideas, and creativity that will spur your imagination into action and drive you to create your own masterpiece.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex item-center justify-around mt-32 text-gray-500 text-xs'>
                    <span className='flex items-center space-x-4'>
                        <span>NITJ BLOGGERS</span>
                        <span className='flex'>
                            <sup><BiCopyright /></sup>
                            ALL RIGHTS RESERVED 
                        </span>
                    </span>
                    <span className=''>
                        Created on Wednesday,   July 5,   2023
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Home

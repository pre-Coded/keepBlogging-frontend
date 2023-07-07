import React, { useState, useEffect } from 'react';
import { BiFilterAlt } from 'react-icons/bi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Bg from '../assets/bg.jpg'
import BlogCard from '../Components/Cards/BlogCard';
import { useBlogContext } from '../utils/BlogContext';

const Blogs = () => {
    const [filter, setFilter] = useState(false);
    const [colspan, setColSpan] = useState(false);
    const blgctx = useBlogContext();

    const handleMouseOver = () => { };

    const items = [
        "Technology",
        "Travel",
        "Food",
        "Lifestyle",
        "Health",
        "Fashion",
        "Fitness",
        "Beauty",
        "Personal",
        "Parenting",
        "Finance",
        "Business",
        "Education",
        "Science",
        "Arts and Culture",
    ];

    const [blogList, setBlogList] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setBlogList(blgctx.blogList);
    }, [blgctx.blogList])

    useEffect(() => {
        if (tags.length > 0) { setBlogList(() => blgctx.blogList.filter(blog => blog.blogData.tags.some(tag => tags.includes(tag)))); }
        else {
            setBlogList(blgctx.blogList);
        }
    }, [tags])


    const handleTags = (e) => {
        if (e.currentTarget.classList.contains('activeTag')) {
            e.currentTarget.classList.remove('activeTag');
            setTags((prev) => prev.filter((tag) => tag !== e.target.id));
        } else {
            e.currentTarget.classList.add('activeTag');
            setTags(prev => [...prev, e.target.id]);
        }
    }

    return (
        <div className='h-full w-full flex flex-col space-y-2 overflow-y-scroll scrollbar-hidden pb-24'>

            <div className={`px-4 relative text-gray-500 flex flex-col space-y-3 my-2 transition-all`}>

                <button
                    onClick={() => {
                        setFilter((prev) => !prev);
                    }}
                    className='flex space-x-2 items-center'
                >
                    <h1>Filter</h1>
                    <BiFilterAlt />
                </button>

                {
                    filter ?
                        <>
                            <div className='flex flex-row gap-2  w-full lg:overflow-hidden scroll-smooth scrollbar-hidden overflow-x-scroll lg:flex-wrap text-xs'>
                                {
                                    <button className='bg-gradient-to-br from-orange-500 to-yellow-600 text-white py-2 px-4 rounded-full'>
                                        <p>Categories</p>
                                    </button>
                                }
                                {
                                    items.map((tag) => {
                                        const isActive = tags.includes(tag);
                                        return (
                                
                                            <button id={tag} onClick={handleTags} className={`whitespace-nowrap py-2 px-4  border rounded-full cursor-pointer ${isActive ? "activeTag" : ""}`}>
                                                {tag}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex flex-row gap-2  w-full lg:overflow-hidden scroll-smooth scrollbar-hidden overflow-x-scroll lg:flex-wrap text-xs'>
                                {
                                    <button className='bg-gradient-to-br from-orange-500 to-yellow-600 text-white py-2 px-4 rounded-full'>
                                        <p>Users</p>
                                    </button>
                                }

                                <button id={blgctx.user.username} onClick={handleTags} className='whitespace-nowrap py-2 px-4  border rounded-full cursor-pointer'>
                                    {blgctx.user.username}
                                </button>

                                {
                                    blgctx.user.following?.map((following) => {
                                        return (
                                            <button id={following.username} onClick={handleTags} className='whitespace-nowrap py-2 px-4  border rounded-full cursor-pointer'>
                                                {following}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </> : ""
                }
            </div>

            <div className='h-full w-full p-2 grid gap-2 grid-cols-1 lg:grid-cols-2 scrollbar-hidden'>
                {
                    blogList?.map((blog) => {
                        return <BlogCard data={blog.blogData} imageData={blog.imgData} />
                    })
                }
            </div>
        </div>
    );
};

export default Blogs;

import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../utils/BlogContext';

const BlogCard = ({ data, imageData }) => {

    const blgctx = useBlogContext();
    const navigate = useNavigate();

    const taglist = data.tags;
    const date = new Date(data.createdAt);
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <>
            <div className='w-full flex flex-col rounded-md relative'>
                <div className='flex flex-col lg:flex-row'>

                    <div onClick={() => {
                        const combinedData = {
                            blogData : data , 
                            imgData : imageData,
                        }

                        blgctx.handleSelectedBlog(combinedData);

                        const suggested = blgctx.blogList.filter((blog) => blog.blogData.username === data.username);

                        blgctx.handleSuggestedBlog(suggested);

                        navigate(`/blogs/view/${data._id}`);
                    }} onMouseOver={() => { setMouseOver(prev => !prev) }} onMouseOut={() => { setMouseOver(prev => !prev) }} className='w-full lg:w-96 aspect-square relative'>

                        <img src={`data:image/jpg;base64,${imageData}`} alt="alt" className='object-cover aspect-square w-full rounded-md' />
                        <div className={`absolute top-0 left-0 h-full w-full backdrop-filter backdrop-blur-sm z-[1000] items-center justify-center rounded-tl-md rounded-tr-md ${mouseOver ? "flex" : "hidden"} cursor-pointer`}>
                            <FaExternalLinkAlt className='text-4xl text-gray-800' />
                        </div>
                    </div>

                    <div className='flex flex-col w-full h-full justify-between'>
                        <div className='w-full flex flex-col space-y-2 p-2'>
                            <div className='flex flex-row flex-wrap gap-2  text-xs'>
                                {
                                    taglist && taglist.map((tag, index) => {
                                        if (index === 0) return "";
                                        return (
                                            <span className='text-gray-500'>{tag}</span>
                                        )
                                    })
                                }
                            </div>
                            <span className="text-xl text-gray-200 font-semibold">
                                {data.title}
                            </span>

                            <span className='text-sm text-gray-600'>
                                {data.shortDesc}
                            </span>
                        </div>


                        <div onClick={() => {
                            blgctx.fetchUserInfo(data.username);
                            navigate('/profile')
                        }} className='flex flex-row space-x-3 p-2 cursor-pointer self-end'>
                            <div className='text-sm text-gray-200 flex flex-col items-start justify-around'>
                                <span className='font-semibold'>{data.username}</span>
                                <span className='text-gray-600 text-xs'>{date.toLocaleDateString()}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
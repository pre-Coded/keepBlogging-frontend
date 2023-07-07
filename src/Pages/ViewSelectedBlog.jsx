import React, { useState, useEffect, useRef } from 'react';
import { useBlogContext } from '../utils/BlogContext';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { IoMdShareAlt } from 'react-icons/io';
import SuggestedBlogCard from '../Components/Cards/SuggestedBlogCard'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom';

const ViewSelectedBlog = () => {
  const blgctx = useBlogContext();
  const navigate = useNavigate();

  const ref = useRef(null);

  const data = (blgctx.selectedBlog.blogData);
  const imageData = (blgctx.selectedBlog.imgData);

  const [liked, setLiked] = useState(false);

  const [textScrollWidth, setTextScrollWidth] = useState(0);

  useEffect(() => {

    const handleLikes = () => {
      if (data?.likes.includes(blgctx.user.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }

    const scrollSuggestedBox = setInterval(() => {
      const scrollSpeed = 0.5;
      const container = ref.current;
      if (container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
          container.scrollLeft = 0;
        }
      }

    }, 10);

    handleLikes();
    blgctx.handleSuggestedBlog(blgctx.blogList.filter(blog => blog.blogData.username === blgctx.selectedBlog.username));

    return () => clearInterval(scrollSuggestedBox);

  }, [blgctx.selectedBlog.blogData?._id]);

  if (Object.keys(blgctx.selectedBlog).length === 0) return navigate('/blogs');

  return (
    <div className='h-full w-full overflow-x-hidden overflow-y-scroll scroll-smooth flex flex-col space-y-2 p-2 pb-20 scrollbar-hidden'>

      <div className='w-full h-auto flex flex-col md:flex-row'>

        <div className='flex flex-col space-y-2 w-full aspect-square md:w-[50%]'>
          <div className='w-full aspect-square rounded-md overflow-hidden'>
            <img src={`data:image/jpg;base64,${imageData}`} alt="alt" className='object-cover aspect-square w-full rounded-md' />
          </div>
          {/* Like and Share */}
          <div className='w-full flex items-center space-x-2 text-4xl text-white'>
            <span onClick={() => {
              blgctx.setLikes(data._id);
              setLiked(prev => !prev)
            }} className="overflow-hidden">{!liked ? <FcLikePlaceholder /> : <FcLike />}</span>
            <IoMdShareAlt />
          </div>
        </div>

        <div className='flex flex-col space-y-2 p-2 w-full overflow-x-hidden'>
          <div className={`flex flex-row flex-wrap gap-2 text-xs`}>
            {
              data.tags?.map((tags, index) => {
                if (index === 0) {
                  return "";
                }
                return <span className='text-gray-500 text-xs'>{tags}</span>
              })

            }
          </div>
          <span className='text-xl text-gray-200 font-semibold'>
            {data?.title}
          </span>

          <div onScroll={(e) => {
            const actualHeight = (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight));
            const heightPercentage = (actualHeight - e.currentTarget.scrollTop) / actualHeight;

            const scrollWidth = e.currentTarget.clientWidth - (heightPercentage * e.currentTarget.clientWidth)
            setTextScrollWidth(scrollWidth);
          }} className='w-full aspect-square md:aspect-auto md:h-[60vh] overflow-x-hidden overflow-y-scroll text-gray-200 text-sm tracking-wide scrollbar-hidden relative'>
            <motion.div
              animate={{
                width: `${textScrollWidth}px`
              }}
              className='sticky h-[2px] top-0 left-0 bg-gradient-to-r from-orange-500 to-blue-500'>
            </motion.div>
            <div dangerouslySetInnerHTML={{ __html: data?.desc }} />
          </div>
        </div>
      </div>

      {/* Suggested */}
      <div className='w-full h-full relative'>
        <h1 className='text-gray-500 text-sm italic'>More Blogs</h1>
        <ul ref={ref} className='w-full whitespace-nowrap overflow-x-scroll space-x-2 scrollbar-hidden mt-2'>
              {
                blgctx.suggestedBlogCards?.map( (blog) => {
                  return <SuggestedBlogCard key={blog.blogData._id} data={blog.blogData} imageData ={blog.imgData} />
                })
              }
        </ul> 
      </div>
    </div>
  );
};

export default ViewSelectedBlog;

import React, { useState } from 'react';
import axios from 'axios';
import { ServerUrl } from '../utils/constants';
import { useBlogContext } from '../utils/BlogContext';

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";


const Publish = () => {
    const blgctx = useBlogContext();

    const [title, setTitle] = useState("What's on your mind?");
    const [thumbnail, setThumbnail] = useState(null);
    const [shortDesc, setShortDesc] = useState('');
    const [value, setValue] = useState('');

    const [loading, setLoading] = useState(false);

    const [tags, setTags] = useState([`${blgctx.user.username}`]);
    const handleTags = (e) => {

        if (e.currentTarget.classList.contains('activeTag')) {
            e.currentTarget.classList.remove('activeTag');
            setTags((prev) => prev.filter((tag) => tag !== e.target.id));
        } else {
            e.currentTarget.classList.add('activeTag');
            setTags(prev => [...prev, e.target.id]);
        }
    }

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

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(prev => !prev);

        try {
            const result = await axios.post(`${ServerUrl}/createBlog`, {
                userId: blgctx.user.id,
                username: blgctx.user.username,
                title: title,
                blogThumbnail: thumbnail,
                shortDesc: shortDesc,
                desc: value,
                tags: tags,
            }, {
                withCredentials: true,
                credentials: 'include',
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            console.log(result);

        } catch (e) {
            console.log(e);
        }

        setLoading(prev => !prev);
    }

    return (
        <form onSubmit={handleSubmit} enctype="multipart/form-data" className='w-full h-full flex flex-col space-y-2 p-2 pb-20 overflow-y-scroll scroll-smooth items-center'>

            <div className='flex flex-col p-2 space-y-2 w-full lg:w-[50%]'>

                <input type="text" name="" placeholder='Enter title' id="" className='h-12 outline-none p-2 border-[0.5px] border-gray-800 rounded-md bg-transparent text-xs tracking-wide' value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }} required />

                <div className='w-full h-12 rounded-md relative overflow-hidden border-[0.5px] border-gray-800'>
                    <div className='h-full w-full flex items-center justify-start p-2 text-xs text-gray-400'>
                        {
                            !thumbnail ? "Choose a file" : thumbnail.name
                        }
                    </div>
                    <input name="blogThumbnail" onChange={(e) => {
                        setThumbnail(e.target.files[0])
                    }} type="file" id="" className='h-full w-full absolute top-0 left-0 cursor-pointer opacity-0' required />
                </div>
                <div className='w-full flex items-center justify-center relative'>

                    <textarea maxLength={300} className="w-full h-48 p-2 resize-none bg-transparent outline-none text-gray-200 border-[0.5px] border-gray-800 rounded-md text-xs" placeholder='Enter short description' value={shortDesc}
                        onChange={(e) => {
                            setShortDesc(e.target.value);
                        }} required></textarea>

                    <span className={`absolute bottom-2 right-2 text-xs ${shortDesc.length > 250 ? 'text-red-800' : 'text-gray-500'}`}>
                        {
                            300 - shortDesc.length
                        }
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-col items-center space-y-4 pb-10'>

                <div className='flex flex-row gap-2 w-full scroll-smooth overflow-y-hidden overflow-x-scroll text-xs scrollbar-hidden whitespace-nowrap md:w-[80%] scrollbar-hidden'>
                    {
                        <div className='bg-gradient-to-br from-orange-500 to-yellow-600 text-white py-2 px-4 rounded-full'>
                            <p>Add Tags</p>
                        </div>
                    }
                    {
                        items.map((tag) => {
                            return (
                                <div key={tag} id={tag} onClick={handleTags} className='cursor-pointer whitespace-nowrap py-2 px-4 border rounded-full'>
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>

                <ReactQuill modules={modules} theme="snow" onChange={setValue} className="text-container text-white scrollbar-hidden" />

                <div className='flex items-center justify-center w-full'>
                    <button type="submit" className='h-12 w-full rounded-md lg:w-56 bg-indigo-500 text-white tracking-wider flex items-center justify-center'>

                        {
                            loading ?
                                <div className='h-4 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
                                :
                                <span>Publish</span>
                        }

                    </button>
                </div>
            </div>
        </form>
    )
}

export default Publish
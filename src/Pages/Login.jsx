import axios from 'axios';
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../utils/BlogContext';
import { ServerUrl } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

const Login = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const blgctx = useBlogContext();

    const navigate = useNavigate();

    const passRef = useRef(null);

    const [passVisible, setPassVisible] = useState(false);


    useEffect(() => {
        const checkCookie = () => {
            if (blgctx.user) {
                navigate('/');
            }

            navigate('/login');
        }
        checkCookie();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        blgctx.setLoading(prev => !prev);
        try {
            const result = await axios.post(`${ServerUrl}/login`, {
                username: username,
                password: pass,
            }, {
                withCredentials: true,
                credentials: 'include'
            })

            console.log(result);

            if (result.data.authStatus) {
                console.log("inside result")
                blgctx.fetchAuthInfo();
                blgctx.setLoading(prev => !prev);
                navigate('/');
                return;
            }
        } catch (e) {
            toast.error("Username or Password is incorrect", { autoClose: 1500 })
            console.log(e);
        }
        blgctx.setLoading(prev => !prev);
    }


    return (
        <div className='h-full w-full flex items-center justify-center p-2 lg:pb-0 pb-20'>

            <div className='flex flex-col lg:flex-row lg:h-[60vh] lg:w-[60%] space-y-4 w-full h-full'>

                <div className='flex items-center justify-center h-full w-full'>
                    <p className='text-3xl text-center'>
                        Get Started with NITJ BLOGGERS
                    </p>
                </div>


                <div className='flex flex-col lg:items-center lg:justify-center h-full w-full space-y-4 lg:p-2'>
                    <a href={`${ServerUrl}/google`} className='bg-white p-2 text-black rounded-md flex items-center justify-center space-x-2 py-2 text-xl'>
                        <FcGoogle /><span>Login with Google</span>
                    </a>

                    <div className='w-full h-10 flex items-center justify-around space-x-4'>
                        <div className='h-[1px] w-full bg-gray-500'></div>
                        <div className=''>Or</div>
                        <div className='h-[1px] w-full bg-gray-500'></div>
                    </div>

                    <form onSubmit={handleSubmit} className='h-full w-full flex flex-col lg:items-center space-y-3'>
                        <div className='w-full p-2 border-[1px] border-gray-500 rounded-md h-14 flex items-center'>
                            <input onChange={(e) => { setUsername(e.target.value) }} value={username} type="text" name="" id="" className='outline-none bg-transparent text-sm h-full w-full' placeholder='Enter Username' />
                        </div>

                        <div className='w-full p-2 border-[1px] border-gray-500 rounded-md h-14 flex items-center'>
                            <input ref={passRef} onChange={(e) => { setPass(e.target.value) }} value={pass} type="password" name="" id="" className='outline-none bg-transparent text-sm h-full w-full' placeholder='Enter Password' />
                            {
                                passVisible ? 
                                <BsEyeFill className='text-xl' onClick={() => {
                                    setPassVisible(prev => !prev);
                                    passRef.current.type = "password";
                                }}/> :
                                <BsEyeSlash className='text-xl' onClick={() => {
                                    setPassVisible(prev => !prev);
                                    passRef.current.type = "text";
                                }}/>
                            }
                        </div>
                        <input type="submit" value="Log In" className='bg-indigo-500 text-white py-2 rounded-md text-xl w-full cursor-pointer' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
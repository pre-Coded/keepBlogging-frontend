import React, { useState, useEffect } from 'react'
import { useBlogContext } from '../utils/BlogContext';

const Profile = () => {
    const blgctx = useBlogContext();

    const [follow , setFollow] = useState( blgctx.selectedUser?.followers.includes(blgctx.user.username) );

    useEffect(() => {
        if(!blgctx.selectedUser){
            return;
        }
        const handleFollow = () => {
            if( blgctx.selectedUser?.followers.includes(blgctx.user.username) ){
              setFollow( true );
            }else{
              setFollow(false);
            }
          }

        handleFollow();
    }, [blgctx.selectedUser])

    return (
        <div className='h-full w-full flex flex-col lg:flex-row space-y-2'>
            <div className='w-full h-full flex flex-col space-y-4 items-center justify-center overflow-y-scroll scrollbar-hidden'>
                <img src={blgctx.selectedUser?.profileUrl} alt="blg profile" className='h-24 aspect-square rounded-full object-contain border' />
                <h1 className='text-xl tracking-wider font-dyna'>{blgctx.selectedUser?.username}</h1>

                <div className='w-full flex justify-center space-x-2 items-center'>
                    {
                        blgctx.selectedUser?._id === blgctx.user.id ?
                            <span className={`h-10 w-32 flex items-center justify-center text-sm tracking-wider border-[0.5px] rounded-md space-x-2`}>
                                <span>{blgctx.selectedUser?.followers?.length}</span>
                                <span>Followers</span>
                            </span> :
                            <button onClick={() => {
                                blgctx.handleFollow(blgctx.selectedUser.username);
                                setFollow(prev => !prev);
                            }} className={`h-10 w-32 flex items-center justify-center text-sm tracking-wider border-[0.5px] rounded-md space-x-2`}> {
                                !follow ? "Follow" : "Unfollow"
                            } </button>
                    }
                    {
                        blgctx.selectedUser?._id === blgctx.user.id ? 
                        <span className={`h-10 w-32 flex items-center justify-center text-sm tracking-wider bg-indigo-600 rounded-md space-x-2`}>
                        <span>{blgctx.selectedUser?.following.length}</span>
                        <span>Following</span>  </span> : 
                        
                        <span className={`h-10 w-32 flex items-center justify-center text-sm tracking-wider bg-indigo-600 rounded-md space-x-2`}>
                        <span>{blgctx.selectedUser?.followers.length}</span>
                        <span>Followers</span>  </span>
                    }
                </div>
                    {
                        blgctx.selectedUser?._id === blgctx.user.id && <li className='md:block hidden'>
                            <button onClick={blgctx.handleSignOut}>
                                Log Out
                            </button>
                        </li>
                    }
            </div>
            <div>

            </div>
        </div>
    )
}

export default Profile

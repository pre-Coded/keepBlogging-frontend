import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { credentials, ServerUrl } from "./constants";

const Context = createContext(null);

export const useBlogContext = () => {
    return useContext(Context);
}

export const ContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [day, setDay] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState({});
    const [blogList, setBlogList] = useState([]);
    const [suggestedBlogCards, setSuggestedBlogCards] = useState(null);
    const [selectedUser, setSelectedUser] = useState(user);
    const navigate = useNavigate();

    const handleFollow = async (username) => {
        try {
            await axios.put(`${ServerUrl}/user?followerUpdate=true`,
            {
                username : user.username,
                followerName: username,
            }, credentials);
    
        } catch (e) {
            console.log(e);
        }
    }

    const fetchUserInfo = async (username) => {
        try {
            const result = await axios.get(`${ServerUrl}/user?userInfo=${username}`, credentials);
            setSelectedUser(result.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const setLikes = async ( id ) => {
        try{
            

            const result = await axios.post(`${ServerUrl}/blogList/likes`, {
                userId : user.id,
                blogId : id,
            }, credentials);

            const data = result.data.data;

            const index = blogList.findIndex(blog => blog.blogData._id === id);
            const imgData = blogList[index]["imgData"];

            const combinedData = {
                blogData : data,
                imgData : imgData,
            }

            const prevArray = [...blogList];
            prevArray[index] = combinedData;
            setBlogList(prevArray);
            
        }catch(e){
            console.log(e);
        }
    }

    const handleSuggestedBlog = (data) => {
        setSuggestedBlogCards(data);
    }

    const handleSelectedBlog = (data) => {
        setSelectedBlog(data);
    };

    const handleSignOut = async () => {
        setLoading(prev => !prev);
        try {
            const result = await axios.get(`${ServerUrl}/logout`, credentials);
            setNavOpen(prev => !prev);
            if (result) {
                setUser(null);
                navigate('/')
            }
        } catch (e) {
            console.log(e);
        }

        setLoading(prev => !prev);
    }

    const fetchAuthInfo = async () => {
        setLoading(prev => !prev);
        try {
            const result = await axios.get(`${ServerUrl}/`, {
                withCredentials: true,
                credentials: 'include'
            });

            if (result.data.authStatus) {
                setUser(result.data.data);
            } else {
                setUser(null);
            }
        } catch (e) {
            console.log(e);
        }

        setLoading(prev => !prev);
    }

    const fetchBlogList = async () => {
        try {
            const { data } = await axios.get(`${ServerUrl}/blogList`, {
                withCredentials: true,
                credentials: 'include'
            });
            
            setBlogList(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAuthInfo();
        fetchBlogList();
    }, [])


    return (
        <Context.Provider value={
            {
                user,
                setUser,
                fetchAuthInfo,
                navOpen, setNavOpen,
                handleSignOut,
                day, setDay,
                loading, setLoading,
                selectedBlog, setSelectedBlog,
                blogList, setBlogList,
                handleSelectedBlog,
                fetchBlogList,
                handleSuggestedBlog,
                suggestedBlogCards,
                setLikes,fetchUserInfo, 
                selectedUser,
                handleFollow, 
            }
        }>
            {props.children}
        </Context.Provider>
    )
}
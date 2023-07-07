import { Route, Routes } from 'react-router-dom';
import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import { useBlogContext } from './utils/BlogContext';
import Nopage from './Pages/Nopage';
import Profile from './Pages/Profile'
import Blogs from './Pages/Blogs'
import ViewSelectedBlog from './Pages/ViewSelectedBlog';
import Publish from './Pages/Publish';

function App() {
  const blgctx = useBlogContext();


  return (
    <div className={`h-screen w-screen relative overflow-hidden flex flex-col bg-[#121212] text-white font-poppins`}>

      <div class={`loading-bar absolute top-0 left-0 z-[1000] ${blgctx.loading ? "block" : "hidden"}`}></div>

      <NavBar />

      <div className='h-full w-full overflow-y-scroll scrollbar-hidden'>

        <Routes>
          <Route path='/' element={<Home />} />
          {
            blgctx.user === null && <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </>
          }
          {
            blgctx.user !== null &&
            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/blogs' element={<Blogs />}>
              </Route>
              <Route path={`/blogs/view/:id`} element={ <ViewSelectedBlog/>} />
              <Route path={`/publish`} element={ <Publish/>} />
            </>
          }
          <Route path='*' element={<Nopage />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
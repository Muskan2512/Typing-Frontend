import React, { useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
// import Typing from './components/Typing'
// import Typing1 from './components/Typing1'
import Typing2 from './components/Typing2'
import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import toast from 'react-hot-toast'
import NotFound from './components/NotFound'
import './App.css'
import { useNavigate } from 'react-router-dom'

const App = () => {
const navigate=useNavigate();
  const [loggedIn, setShowLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("webmail") || "");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [final, setFinal] = useState(false);

  useEffect(() => {
  if(final){
    // console.log("Final is true, navigating to /final");
    navigate("/final");
  }
}, [final]);


  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("webmail");
    toast.success("Logged out successfully");
    setToken(null);
    setLoggedInUser("");
    setFinal(false);
    navigate("/");
  }
  return (
    <div className='image bg-gradient-to-b from-white via-blue-50 to-blue-100  min-h-screen z-[-1] pb-5'>
    {(token)&&  <div className='w-full flex justify-between p-2 text-sm '>
    <p className='text-left text-gray-300  px-3 py-2 rounded-sm'>Logged in as: {localStorage.getItem("webmail").slice(0,9)}</p>
    <button className='text-gray-300 bg-[rgb(32,36,59)] shadow-sm border-1 px-3 py-2  cursor-pointer rounded-sm border-black/10' onClick={logout} >Logout</button>
    </div>}
    <Routes>
      <Route path='/' element={<Login setToken={setToken}/>}/>
      <Route path='/signup' element={<Signup setToken={setToken}/>}/>
      <Route 
        path='/typing' 
        element={
          <PrivateRoute>
            <Typing2 loggedInUser={loggedInUser} final={final} setFinal={setFinal}/>
          </PrivateRoute>
        } 
      />
      <Route path='/final' element={<p className='instruction text-center mt-1.5 text-blue-500 font-bold text-[2rem]'>
  Thank you for participating...
</p>} />

       {/* 404 route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  )
}

export default App

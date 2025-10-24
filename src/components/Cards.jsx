import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

const FinalTestPassword = import .meta.env.VITE_FINAL_TEST_PASSWORD || "INFOTREK@25";

const Cards = ({testType,content}) => {
  const [modal,setModal]=useState(false);
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const checkPass=()=>{
    if(testType=="Sample Test" && password=="password"){
      setPassword("");
      navigate("/sample-typing");
    }else if(testType=="INFOTREK'25" && password==FinalTestPassword){
      setPassword("");
      navigate("/typing");
    }else{
      toast.error("Password is wrong");
    }
  }

  return (
    <>
      {
        modal ?(<div className="fixed inset-0 z-50 flex items-center justify-center border-1 border-gray shadow-2xl ">
        <div className="bg-[#1a1a35ec] rounded-2xl shadow-xl max-w-md w-full p-6 relative">
          <h2 className="text-xl font-semibold text-gray-500 text-center">
            Enter Password to Take {testType}
          </h2>
  
          <div className="mt-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
  
          <div className="mt-6 flex justify-end gap-3">
            <button
            onClick={()=>{setModal(false);setPassword("");}}
             className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Cancel
            </button>
            <button
            onClick={()=>{checkPass()}}
             className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Take Test
            </button>
          </div>
        </div>
      </div>   ):<div className="max-w-sm rounded overflow-hidden shadow-[5px_5px_15px_rgba(20,25,240,0.3)] ">
    <img className="w-full" src="backbg.png" alt="Sunset in the mountains"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{testType}</div>
      <p className="text-gray-700 text-base">
        {content}
      </p>
      <button onClick={()=>{setModal(true)}}
      className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-4"
      >Take {testType}</button>
    </div>
    
  </div>
      }
    </>
    
  )
}

export default Cards

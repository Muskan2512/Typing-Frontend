import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
const endpoint = import.meta.env.VITE_API_ENDPOINT;
import { useState } from "react";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
        <ClipLoader color="#0000aa" size={70} />
  </div>
);

export default function Login({setToken}) {

  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  // setIsSubmitting(true);
  try {
    const webmail = e.target.webmail.value;
    const password = e.target.password.value;

    const res = await axios.post(`${endpoint}/login`, {
      webmail,
      password,
    });

    // console.log(webmail,password);
    // console.log(res);

    // check what backend sends
    // if (res.data.message === "Invalid email or password") {
    //   toast.error("Invalid webmail or password");
    //   return;
    // }

    if (res.status !== 200) {
      toast.error(res.data.message||"Some error occurred");
      setLoading(false);
      return;
    }

    if(res.data.user.scores.length>0){
      toast.error("You had already taken the test");
      setLoading(false);
      return;
    }

    toast.success("Logged in successfully");
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("webmail", webmail);
    setToken(res.data.token);
    navigate("/tests");
  } catch (err) {
     if (err.response) {
      // Error response from backend (like 401, 400, etc.)
      toast.error(err.response.data.message || "Invalid webmail or password");
    } else if (err.request) {
      // No response from backend
      toast.error("No response from server. Please try again.");
    } else {
      // Some other error
      toast.error("Something went wrong");
    }
  }finally{
    setLoading(false);
  }
};


  return (
    <>
    {loading ? <Loader /> :
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-500">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  shadow-xl p-5 rounded-lg z-10 bg-[rgb(7,10,27)]">
          <form action="#" method="POST" className="space-y-6"
          onSubmit={handleLogin}>
            <div>
              <label htmlFor="webmail" className="block text-sm/6 font-medium text-indigo-500">
                Enter your NITT Webmail
              </label>
              <div className="mt-2">
                <input
                  id="webmail"
                  name="webmail"
                  type="email"
                  required
                  placeholder="Enter webmail"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-indigo-500">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
              
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Does not have account?{' '}
            <Link to={"/signup"} className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign up now
            </Link>
          </p>
          
        </div>
      </div>
    }
    </>
  )
}


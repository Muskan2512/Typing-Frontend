import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default function Signup({setToken}) {

  const navigate=useNavigate();
  const handleSignup=async(e)=>{
    e.preventDefault();
    try{
      // console.log(e.target);
      const email=e.target.email.value;
      const webmail=e.target.webmail.value;
      const password=e.target.password.value;
      // console.log(email,webmail,password);
      const res=await axios.post(`${endpoint}/register`,{webmail,email,password});
  
      if(res.data=="User with this email already exists"){
        toast.error("User with this email already exists");
        return;
      }
      if(res.status!==201){
        toast.error(res.data.message || "Some error occurred");
        return;
      }
      else{
        toast.success("Account created successfully");
        navigate("/");
      }
    }catch(err){
      toast.error("Something went wrong");
      console.error(err); 
  }
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-500">Create a new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-xl p-5 rounded-lg bg-[rgb(7,10,27)] z-10">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-indigo-500">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                 placeholder="Enter email address"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="webmail" className="block text-sm/6 font-medium text-indigo-500">
                NITT Webmail
              </label>
              <div className="mt-2">
                <input
                  id="webmail"
                  name="webmail"
                  type="email"
                  required
                  placeholder="Enter NITT webmail"
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
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have account?{' '}
            <Link to={"/"} className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
         
        </div>
      </div>
    </>
  )
}

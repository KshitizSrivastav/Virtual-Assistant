import React from 'react'
import bg from '../assets/authBg.png'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import { useContext } from 'react'
import axios from 'axios';
function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [err,setErr] = React.useState('');
  const serverUrl = React.useContext(userDataContext).serverUrl;
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr('');
    try{
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{
            name,
            email,
            password
        },{withCredentials:true})
        console.log(result.data);
    }catch(error){
        console.error("Sign Up Error:", error);
        setErr(error.response.data.message || "Sign Up Failed");
    }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
    <form onSubmit={handleSignUp} className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black rounded-lg flex flex-col items-center justify-center gap-[20px] px-[20px]'>
    <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>
    <input type='text' placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-grey-300 px-[20px] py-[10px] rounded-full text-[18px]'required onChange={(e)=>setName(e.target.value)} value={name} />
    <input type='email' placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-grey-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />
    <div className= 'w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
        <input type={showPassword?"text":"password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-grey-300 px-[20px] py-[10px]' onChange={(e)=>setPassword(e.target.value)} value={password} />
        {!showPassword && <IoEye className='absolute w-[25px] h-[25px] top-[18px] right-[20px] text-white  ' onClick={()=>setShowPassword(true)} />}
        {showPassword && <IoEyeOff className='absolute w-[25px] h-[25px] top-[18px] right-[20px] text-white  ' onClick={()=>setShowPassword(false)} />}
    </div>
    {err.length >0 && <p className='text-red-500 text=[17px] font-semibold '>
        *{err}
    </p> }
    <button className='min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px] '>Sign Up</button>
    <p className='text-white text-[18px] cursor-pointer' onClick={()=>navigate('/signin')}>Already have an Account ? <span className='text-blue-400 cursor-pointer font-semibold'>Sign In</span></p>
    </form>
    </div>
  )
}

export default SignUp
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';

const Login=()=>{

    const context=useContext(MyContext);
    const{loading,setLoading}=context;

    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const login=async ()=>{
        // console.log(email,password);
        setLoading(true);
        try {

            const result= await signInWithEmailAndPassword(auth,email,password);
            toast.success("Logged In Successfully!");
            localStorage.setItem('user',JSON.stringify(result))
            toast.success('Signin Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            navigate("/");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Please add valid credentials")
            setLoading(false);
        }
    }
    return(
        <>
            <div className=' flex justify-center items-center h-screen'>
                {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-green-600 w-full text-black font-bold  px-2 py-2 rounded-lg' onClick={login}>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-green-600 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;
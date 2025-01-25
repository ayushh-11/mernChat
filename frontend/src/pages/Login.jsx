import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthUser} = useAuthContext()
    async function handleSubmit(e){
        e.preventDefault(); // Prevent the default form submission
        axios.defaults.withCredentials = true;
        await axios.post("http://localhost:5000/api/auth/login",{userName, password})
            .then(response => {
                if (response.data.success){
                    localStorage.setItem("chat-user",JSON.stringify(response.data.user))
                    setAuthUser(response.data.user)
                    navigate("/")
                }
                else if(response.data.error)
                    toast.error(response.data.error)
            })
            .catch(error => {
                if (error)
                    console.log(error)
            })
    }
    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto">
            <div className="flex flex-col justify-center h-full w-full max-w-md bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                <h1 className="p-6 w-full text-3xl font-semibold text-center">
                    Login
                    <span className="text-2xl font-semibold"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit} className="w-full px-6">
                    <div className="mb-4">
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter Username"
                            required
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="password"
                            placeholder="Enter password"
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <Link
                        to="/signup"
                        className="text-sm hover:underline hover:text-blue-600 block text-right"
                    >
                        Don't have an account?
                    </Link>
                    <div>
                        <button type="submit" className="btn btn-block btn-sm mt-4 mb-6">Login</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
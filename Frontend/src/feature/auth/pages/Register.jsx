import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import { Link, useNavigate } from 'react-router'
import { Navigate } from 'react-router'

const Register = () => {
    const {loading, handleRegister} = useAuth;
    const navigate = useNavigate()
  const [username, setUsername] = useState("second")
  const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
      e.prevent.default;

      await handleRegister({username, email, password})
      navigate('/')
    }

    if(loading) {
        return (<main><h1>Loading...........</h1></main>)
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0b0b0b] px-4 py-8">

            <div className="w-full max-w-md">

                {/* Register Box */}
                <div className="bg-[#151515] border border-white/10 rounded-2xl p-7 sm:p-9 shadow-2xl">

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="text-gray-400 text-sm mt-2">
                            Create your account to get started.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Username
                            </label>

                            <input
                              onChange={(e) =>{setUsername(e.target.value)}}
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email
                            </label>

                            <input
                            onChange={(e) =>{setEmail(e.target.value)}}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                onChange={(e) =>{setPassword(e.target.value)}}
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 pr-16 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-orange-500 transition"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>

                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold transition duration-200 active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                        {/* Login */}
                        <p className="text-center text-sm text-gray-400 pt-2">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-orange-500 hover:text-orange-400 font-medium transition"
                            >
                                Login
                            </Link>
                        </p>

                    </form>
                </div>

            </div>
        </main>
    )
}

export default Register

import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";

const Register = () => {
    
const { loading, handleRegister } = useAuth();
const navigate = useNavigate();

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [role, setRole] = useState("customer");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
        setError("Please fill all fields.");
        return;
    }

    try {
        await handleRegister({
            username: username.trim(),
            email: email.trim(),
            password,
            role,
        });

        navigate("/");
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
    }
};

if (loading) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin mb-4" />

                <p className="text-white font-medium">
                    Creating your account...
                </p>

                <p className="text-gray-500 text-sm mt-1">
                    Please wait a moment
                </p>
            </div>
        </main>
    );
}

return (
    <main className="min-h-screen bg-[#0b0b0b] p-4 sm:p-6 lg:p-8 flex items-center justify-center">

        <div className="w-full max-w-5xl min-h-[680px] grid lg:grid-cols-2 bg-[#151515] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            {/* Left Branding Section */}
            <section className="relative hidden lg:flex flex-col justify-between p-12 bg-[#111111] border-r border-white/10 overflow-hidden">

                <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold text-lg">
                            S
                        </div>

                        <span className="text-white text-xl font-bold tracking-tight">
                            SupportFlow
                        </span>
                    </div>


                    {/* Content */}
                    <div className="mt-20">

                        <span className="inline-block text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase mb-5">
                            Join the platform
                        </span>

                        <h1 className="text-5xl font-bold leading-tight text-white">
                            Better support
                            <span className="block text-orange-500">
                                starts here.
                            </span>
                        </h1>

                        <p className="text-gray-400 leading-7 mt-6 max-w-md">
                            Create your SupportFlow account and manage support
                            requests, conversations, and tickets in one
                            organized workspace.
                        </p>

                    </div>

                </div>


                {/* Bottom Text */}
                <div className="relative border-t border-white/10 pt-6">

                    <p className="text-gray-500 text-sm">
                        Simple, organized, and efficient support management.
                    </p>

                </div>

            </section>


            {/* Right Register Section */}
            <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center gap-3 mb-10">

                        <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold text-lg">
                            S
                        </div>

                        <span className="text-white text-xl font-bold">
                            SupportFlow
                        </span>

                    </div>


                    {/* Heading */}
                    <div className="mb-8">

                        <p className="text-orange-500 text-sm font-semibold mb-3">
                            GET STARTED
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Create your account
                        </h1>

                        <p className="text-gray-500 text-sm mt-3">
                            Fill in your details to join SupportFlow.
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}


                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit}
                    >

                        {/* Username */}
                        <div>

                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Username
                            </label>

                            <input
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError("");
                                }}
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-xl bg-[#0b0b0b] border border-white/10 text-white placeholder-gray-600 outline-none transition duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                            />

                        </div>


                        {/* Email */}
                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email address
                            </label>

                            <input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-[#0b0b0b] border border-white/10 text-white placeholder-gray-600 outline-none transition duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
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
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Create a secure password"
                                    className="w-full px-4 py-3 pr-20 rounded-xl bg-[#0b0b0b] border border-white/10 text-white placeholder-gray-600 outline-none transition duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-orange-500 transition"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 mt-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create account"}
                        </button>

                    </form>


                    {/* Login */}
                    <p className="text-center text-sm text-gray-500 mt-7">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-orange-500 hover:text-orange-400 font-semibold transition"
                        >
                            Sign in
                        </Link>

                    </p>

                </div>

            </section>

        </div>

    </main>
);

};

export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth.js";

const Login = () => {
const { handleLogin, loading } = useAuth();
const navigate = useNavigate();


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
        setError("Please enter your email and password.");
        return;
    }

    try {
        const user = await handleLogin({
            email: email.trim(),
            password,
        });

        if (user?.role === "agent") {
            navigate("/agent");
        } else {
            navigate("/");
        }
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Login failed. Please try again."
        );
    }
};

if (loading) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin mb-4" />
                <p className="text-white font-medium">Logging you in...</p>
                <p className="text-gray-500 text-sm mt-1">
                    Please wait a moment
                </p>
            </div>
        </main>
    );
}

return (
    <main className="min-h-screen bg-[#0b0b0b] p-4 sm:p-6 lg:p-8 flex items-center justify-center">

        <div className="w-full max-w-5xl min-h-[620px] grid lg:grid-cols-2 bg-[#151515] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            {/* Left Branding Section */}
            <section className="relative hidden lg:flex flex-col justify-between p-12 bg-[#111111] border-r border-white/10 overflow-hidden">

                {/* Background decoration */}
                <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold text-lg">
                            S
                        </div>

                        <span className="text-white text-xl font-bold tracking-tight">
                            SupportFlow
                        </span>
                    </div>

                    <div className="mt-24">
                        <span className="inline-block text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase mb-5">
                            Smart Support Management
                        </span>

                        <h1 className="text-5xl font-bold leading-tight text-white">
                            Support made
                            <span className="block text-orange-500">
                                simpler.
                            </span>
                        </h1>

                        <p className="text-gray-400 leading-7 mt-6 max-w-md">
                            Manage customer requests, track support tickets,
                            and keep every conversation organized in one place.
                        </p>
                    </div>
                </div>

                <div className="relative border-t border-white/10 pt-6">
                    <p className="text-gray-500 text-sm">
                        Secure support management platform
                    </p>
                </div>

            </section>


            {/* Right Login Section */}
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

                    <div className="mb-9">
                        <p className="text-orange-500 text-sm font-semibold mb-3">
                            WELCOME BACK
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Sign in to your account
                        </h2>

                        <p className="text-gray-500 text-sm mt-3">
                            Enter your details below to continue.
                        </p>
                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit} className="space-y-5">

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
                                className="w-full px-4 py-3.5 rounded-xl bg-[#0b0b0b] border border-white/10 text-white placeholder-gray-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                            />
                        </div>


                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-xs text-orange-500 hover:text-orange-400 transition"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            <div className="relative">

                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3.5 pr-20 rounded-xl bg-[#0b0b0b] border border-white/10 text-white placeholder-gray-600 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
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


                        {/* Remember */}
                        <div className="flex items-center gap-2.5">

                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 accent-orange-500 cursor-pointer"
                            />

                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-500 cursor-pointer"
                            >
                                Remember me
                            </label>

                        </div>


                        {/* Login */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold transition duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>


                    {/* Register */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-orange-500 hover:text-orange-400 font-semibold transition"
                        >
                            Create an account
                        </Link>
                    </p>

                </div>

            </section>

        </div>

    </main>
);

};

export default Login;

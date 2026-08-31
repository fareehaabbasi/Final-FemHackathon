import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if (loading) {
    return (
        <main className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
            <div className="flex flex-col items-center">

                <div className="relative w-16 h-16 mb-5">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>

                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
                </div>

                <h1 className="text-white text-xl font-bold">
                    SupportFlow
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    Loading your dashboard...
                </p>

            </div>
        </main>
    );
}

    if(!user) {
        return <Navigate to={'/login'} />
    }

  return children
}

export default Protected
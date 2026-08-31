import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";
import React from "react";

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
                <h1>Loading...........</h1>
            </main>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;
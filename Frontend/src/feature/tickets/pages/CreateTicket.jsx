import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createTicket, getAgents } from "../services/ticket.api";

const CreateTicket = () => {
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [agents, setAgents] = useState([]);
    const [assignedAgent, setAssignedAgent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!subject || !description) {
            setError("Subject and description are required");
            return;
        }

        try {
            setLoading(true);
            console.log("Selected Agent:", assignedAgent);

            await createTicket({
                subject,
                description,
                category: category || "General",
                assignedAgent: assignedAgent || null
            });

            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create ticket"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadAgents = async () => {
            try {
                const data = await getAgents();
                setAgents(data.agents);
            } catch (err) {
                console.log("Failed to load agents");
            }
        };

        loadAgents();
    }, []);

    return (
        <main className="min-h-screen bg-[#090909] text-white px-4 py-8 sm:py-12">

            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition mb-7"
                >
                    <span className="text-lg group-hover:-translate-x-1 transition-transform">
                        ←
                    </span>
                    Back to My Tickets
                </button>

                {/* Page Header */}
                <div className="mb-7">
                    <div className="flex items-center gap-3 mb-3">

                        <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <span className="text-orange-500 text-xl">
                                +
                            </span>
                        </div>

                        <div>
                            <p className="text-orange-500 text-xs font-semibold tracking-wider uppercase">
                                Support Center
                            </p>

                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                Create a Support Ticket
                            </h1>
                        </div>

                    </div>

                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                        Tell us what you need help with. Our support team
                        will review your request and get back to you.
                    </p>
                </div>

                {/* Main Card */}
                <div className="relative bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Top Accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

                    <div className="p-6 sm:p-8 lg:p-9">

                        {/* Error */}
                        {error && (
                            <div className="mb-7 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">

                                <div className="w-6 h-6 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-xs font-bold">
                                    !
                                </div>

                                <p className="text-sm text-red-400 leading-relaxed">
                                    {error}
                                </p>

                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2"
                                >
                                    Subject
                                    <span className="text-orange-500">*</span>
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="What can we help you with?"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 text-white placeholder-gray-600 outline-none transition-all duration-200 hover:border-white/20 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/10"
                                />

                                <p className="text-xs text-gray-600 mt-2">
                                    Keep your subject short and specific.
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2"
                                >
                                    Description
                                    <span className="text-orange-500">*</span>
                                </label>

                                <textarea
                                    id="description"
                                    rows="7"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Please describe your issue in detail. Include any relevant information that may help our support team..."
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 text-white placeholder-gray-600 outline-none resize-none transition-all duration-200 hover:border-white/20 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/10 leading-relaxed"
                                />

                                <p className="text-xs text-gray-600 mt-2">
                                    The more details you provide, the faster we can help.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/5 pt-6">

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-5">
                                    Ticket Details
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* Category */}
                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block text-sm font-semibold text-gray-300 mb-2"
                                        >
                                            Category
                                            <span className="text-gray-600 font-normal ml-1">
                                                Optional
                                            </span>
                                        </label>

                                        <select
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
                                        >
                                            <option value="">
                                                Select category
                                            </option>
                                            <option value="Billing">
                                                Billing
                                            </option>
                                            <option value="Technical">
                                                Technical
                                            </option>
                                            <option value="Account">
                                                Account
                                            </option>
                                            <option value="Delivery">
                                                Delivery
                                            </option>
                                            <option value="General">
                                                General
                                            </option>
                                        </select>
                                    </div>

                                    {/* Agent */}
                                    <div>
                                        <label
                                            htmlFor="agent"
                                            className="block text-sm font-semibold text-gray-300 mb-2"
                                        >
                                            Support Agent
                                            <span className="text-gray-600 font-normal ml-1">
                                                Optional
                                            </span>
                                        </label>

                                        <select
                                            id="agent"
                                            value={assignedAgent}
                                            onChange={(e) =>
                                                setAssignedAgent(e.target.value)
                                            }
                                            className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
                                        >
                                            <option value="">
                                                Select an agent
                                            </option>

                                            {agents.map((agent) => (
                                                <option
                                                    key={agent._id}
                                                    value={agent._id}
                                                >
                                                    {agent.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {/* Submit Area */}
                            <div className="pt-2">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold transition-all duration-200 shadow-lg shadow-orange-500/10"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                            Creating Ticket...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Create Support Ticket
                                            <span className="text-lg">→</span>
                                        </span>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-600 mt-3">
                                    Your ticket will be securely submitted to the support team.
                                </p>

                            </div>

                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-600">
                        SupportFlow • Customer Support Portal
                    </p>
                </div>

            </div>
        </main>
    );
};

export default CreateTicket;


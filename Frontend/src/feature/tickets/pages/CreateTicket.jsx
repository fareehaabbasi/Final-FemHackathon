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
        <main className="min-h-screen bg-[#0b0b0b] text-white px-4 py-8">

            <div className="max-w-2xl mx-auto">

                <button
                    onClick={() => navigate("/")}
                    className="text-sm text-gray-400 hover:text-orange-500 mb-6"
                >
                    ← Back to My Tickets
                </button>

                <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-8">

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Generate Ticket
                    </h1>

                    <p className="text-gray-400 text-sm mt-2 mb-7">
                        Tell us about your problem and our support team will help you.
                    </p>

                    {error && (
                        <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Subject */}
                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Subject
                            </label>

                            <input
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. Charged twice for my order"
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                rows="6"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your problem..."
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Category
                                <span className="text-gray-500 font-normal">
                                    {" "} (Optional)
                                </span>
                            </label>

                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white outline-none focus:border-orange-500"
                            >
                                <option value="">Select category</option>
                                <option value="Billing">Billing</option>
                                <option value="Technical">Technical</option>
                                <option value="Account">Account</option>
                                <option value="Delivery">Delivery</option>
                                <option value="General">General</option>
                            </select>
                        </div>

                        {/* Agent */}
                        <div>
                            <label
                                htmlFor="agent"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Select Support Agent
                            </label>

                            <select
                                id="agent"
                                value={assignedAgent}
                                onChange={(e) => setAssignedAgent(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white outline-none focus:border-orange-500"
                            >
                                <option value="">Select an agent</option>

                                {agents.map((agent) => (
                                    <option key={agent._id} value={agent._id}>
                                        {agent.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold transition"
                        >
                            {loading ? "Creating Ticket..." : "Create Ticket"}
                        </button>

                    </form>
                </div>

            </div>
        </main>
    );
};

export default CreateTicket;
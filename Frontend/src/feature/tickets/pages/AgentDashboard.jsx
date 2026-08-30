import React, { useEffect, useState } from "react";
import { getAgentTickets, updateTicketStatus } from "../services/ticket.api";
import { useNavigate } from "react-router";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [resolutionNotes, setResolutionNotes] = useState({});
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (id, status, resolutionNote = "") => {
    try {
      await updateTicketStatus(id, {
        status,
        resolutionNote,
      });

      const data = await getAgentTickets();
      setTickets(data.tickets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getAgentTickets();
        setTickets(data.tickets);
      } catch (error) {
        console.log("Failed to fetch tickets", error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // ================= STATS =================

  const totalTickets = tickets.length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending",
  ).length;

  const activeTickets = tickets.filter(
    (ticket) => ticket.status === "Accepted" || ticket.status === "In Progress",
  ).length;

  const completedTickets = tickets.filter(
    (ticket) => ticket.status === "Completed",
  ).length;

  const highPriority = tickets.filter(
    (ticket) => ticket.priority === "High",
  ).length;

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-11 h-11 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
          </div>

          <p className="text-sm text-gray-500">Loading agent dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* ================================================= */}
      {/* TOP NAVBAR */}
      {/* ================================================= */}

      <nav className="sticky top-0 z-50 h-[72px] border-b border-white/[0.08] bg-[#0b0b0b]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-black text-xl font-black">S</span>
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none">
                Support<span className="text-orange-500">Flow</span>
              </h1>

              <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">
                Agent Portal
              </p>
            </div>
          </div>

          {/* RIGHT NAV */}

          <div className="flex items-center gap-3">
            {/* STATUS */}

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/[0.06] border border-green-500/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>

            {/* NOTIFICATION */}

            <button className="relative w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] transition flex items-center justify-center">
              <span className="text-base">🔔</span>

              {pendingTickets > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-orange-500 text-black text-[9px] font-bold flex items-center justify-center border-2 border-[#0b0b0b]">
                  {pendingTickets}
                </span>
              )}
            </button>

            {/* AVATAR */}

            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 font-bold">A</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#151515] via-[#101010] to-[#0d0d0d] p-6 sm:p-8 mb-8">
          <div className="absolute -right-24 -top-28 w-80 h-80 rounded-full bg-orange-500/[0.07] blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-500" />

                <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">
                  Agent Workspace
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Agent Dashboard
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Manage assigned tickets, review AI insights and resolve customer
                issues.
              </p>
            </div>

            {/* QUICK INFO */}

            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Assigned
                </p>

                <p className="text-xl font-bold mt-1">{totalTickets}</p>
              </div>

              <div className="px-4 py-3 rounded-xl bg-orange-500/[0.06] border border-orange-500/10">
                <p className="text-[10px] uppercase tracking-wider text-orange-500/70">
                  High Priority
                </p>

                <p className="text-xl font-bold mt-1 text-orange-400">
                  {highPriority}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* TOTAL */}

          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 hover:border-orange-500/30 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Tickets</p>

                <h2 className="text-3xl font-bold mt-2">{totalTickets}</h2>
              </div>

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                🎫
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">Assigned to you</p>
          </div>

          {/* PENDING */}

          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 hover:border-yellow-500/30 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>

                <h2 className="text-3xl font-bold mt-2">{pendingTickets}</h2>
              </div>

              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                ⏳
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">Awaiting action</p>
          </div>

          {/* ACTIVE */}

          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 hover:border-blue-500/30 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>

                <h2 className="text-3xl font-bold mt-2">{activeTickets}</h2>
              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                ⚡
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">Currently working</p>
          </div>

          {/* COMPLETED */}

          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 hover:border-green-500/30 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>

                <h2 className="text-3xl font-bold mt-2">{completedTickets}</h2>
              </div>

              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                ✓
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">Resolved tickets</p>
          </div>
        </section>

        {/* ================================================= */}
        {/* TICKETS HEADER */}
        {/* ================================================= */}

        <section className="bg-[#111111] border border-white/[0.08] rounded-3xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-white/[0.07]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">Assigned Tickets</h2>

                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-[10px] text-gray-500">
                    {totalTickets}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  Review customer requests and manage their status.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />

                <span className="text-xs text-gray-500">
                  {pendingTickets} awaiting action
                </span>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {tickets.length === 0 ? (
            <div className="py-24 text-center px-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-500/[0.06] border border-orange-500/10 flex items-center justify-center text-3xl mb-5">
                ✓
              </div>

              <h3 className="text-xl font-bold">All caught up!</h3>

              <p className="text-sm text-gray-600 mt-2">
                No tickets are currently assigned to you.
              </p>
            </div>
          ) : (
            /* ================================================= */
            /* TICKETS */
            /* ================================================= */

            <div className="divide-y divide-white/[0.05]">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-5 sm:p-6 hover:bg-white/[0.015] transition"
                >
                  {/* TOP ROW */}

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-orange-500">
                          #{ticket.ticketNumber}
                        </span>

                        {/* STATUS */}

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                            ticket.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : ticket.status === "Accepted"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : ticket.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : ticket.status === "Completed"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : ticket.status === "Rejected"
                                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                                      : "bg-white/5 text-gray-400 border-white/10"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold">
                        {ticket.subject}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Customer:
                        <span className="text-gray-300 ml-1">
                          {ticket.customer?.username || "Unknown Customer"}
                        </span>
                      </p>
                    </div>

                    {/* PRIORITY */}

                    <span
                      className={`w-fit px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        ticket.priority === "High"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-green-500/10 text-green-400 border-green-500/20"
                      }`}
                    >
                      {ticket.priority || "Low"} Priority
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <div className="mt-5 p-4 rounded-2xl bg-[#0d0d0d] border border-white/[0.06]">
                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">
                      Customer Issue
                    </p>

                    <p className="text-sm text-gray-400 leading-6">
                      {ticket.description}
                    </p>
                  </div>

                  {/* ================================================= */}
                  {/* AI INSIGHTS */}
                  {/* ================================================= */}

                  <div className="mt-4 rounded-2xl border border-orange-500/10 bg-orange-500/[0.025] overflow-hidden">
                    <div className="px-4 py-3 border-b border-orange-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                          ✦
                        </div>

                        <div>
                          <p className="text-xs font-bold text-orange-400">
                            AI TRIAGE
                          </p>

                          <p className="text-[10px] text-gray-600">
                            Review AI-generated ticket insights
                          </p>
                        </div>
                      </div>

                      <span className="text-[9px] px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/10">
                        AI
                      </span>
                    </div>

                    <div className="p-4">
                      {/* SUMMARY */}

                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                          Summary
                        </p>

                        <p className="text-sm text-gray-400 leading-6">
                          {ticket.summary || "No AI summary available."}
                        </p>
                      </div>

                      {/* AI DATA */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/[0.05]">
                          <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                            Category
                          </p>

                          <p className="text-sm font-medium text-white">
                            {ticket.category || "General"}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/[0.05]">
                          <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                            Priority
                          </p>

                          <p className="text-sm font-medium text-white">
                            {ticket.priority || "Low"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* ACTIONS */}
                  {/* ================================================= */}

                  <div className="mt-5">
                    <button
                      onClick={() => navigate(`/tickets/${ticket._id}`)}
                      className="mb-4 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-orange-500 hover:text-black border border-white/[0.08] text-white text-sm font-semibold transition"
                    >
                      View Ticket →
                    </button>

                    {/* PENDING */}

                    {ticket.status === "Pending" && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() =>
                            handleStatusChange(ticket._id, "Accepted")
                          }
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-bold transition"
                        >
                          ✓ Accept Ticket
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(ticket._id, "Rejected")
                          }
                          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-semibold transition"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}

                    {/* ACCEPTED */}

                    {ticket.status === "Accepted" && (
                      <button
                        onClick={() =>
                          handleStatusChange(ticket._id, "In Progress")
                        }
                        className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-sm font-bold transition shadow-lg shadow-orange-500/10"
                      >
                        ⚡ Start Work
                      </button>
                    )}

                    {/* IN PROGRESS */}

                    {ticket.status === "In Progress" && (
                      <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-white/[0.07]">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

                          <p className="text-sm font-semibold">
                            Resolve Ticket
                          </p>
                        </div>

                        <textarea
                          value={resolutionNotes[ticket._id] || ""}
                          onChange={(e) =>
                            setResolutionNotes({
                              ...resolutionNotes,
                              [ticket._id]: e.target.value,
                            })
                          }
                          placeholder="Write resolution note for the customer..."
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none resize-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition"
                        />

                        <div className="flex justify-end mt-3">
                          <button
                            onClick={() =>
                              handleStatusChange(
                                ticket._id,
                                "Completed",
                                resolutionNotes[ticket._id],
                              )
                            }
                            className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-bold transition"
                          >
                            ✓ Complete Ticket
                          </button>
                        </div>
                      </div>
                    )}

                    {/* COMPLETED */}

                    {ticket.status === "Completed" && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/[0.05] border border-green-500/10">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                          ✓
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-green-400">
                            Ticket Completed
                          </p>

                          <p className="text-xs text-gray-600">
                            This support request has been resolved.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* REJECTED */}

                    {ticket.status === "Rejected" && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/[0.04] border border-red-500/10">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                          ✕
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-red-400">
                            Ticket Rejected
                          </p>

                          <p className="text-xs text-gray-600">
                            This ticket was not accepted.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}

        <footer className="text-center py-8">
          <p className="text-[11px] text-gray-700">
            SupportFlow
            <span className="mx-2">•</span>
            Agent Workspace
          </p>
        </footer>
      </div>
    </main>
  );
};

export default AgentDashboard;

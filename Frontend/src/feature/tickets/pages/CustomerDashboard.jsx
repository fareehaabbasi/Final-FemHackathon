import React, { useEffect, useState } from "react";
import { getMyTickets } from "../services/ticket.api";
import { getMe, logout } from "../../auth/service/auth.api";
import { useNavigate } from "react-router";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const [error, setError] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);

  // ================= FETCH TICKETS =================
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyTickets();
      setTickets(data.tickets);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load tickets"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      setUserLoading(true);

      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.log(
        error.response?.data?.message || "Failed to load user"
      );
    } finally {
      setUserLoading(false);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await logout();
      navigate("/login");
    } catch (error) {
      console.log(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    fetchTickets();
    fetchUser();
  }, []);

  // ================= STATS =================
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status !== "Resolved"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const highPriority = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-white/10 flex-col z-50">

        {/* BRAND */}
        <div className="h-20 px-6 flex items-center border-b border-white/10">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <span className="text-black font-black text-lg">
                S
              </span>
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none">
                Support<span className="text-orange-500">Flow</span>
              </h1>

              <p className="text-[10px] text-gray-500 mt-1">
                Customer Portal
              </p>
            </div>

          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 px-4 py-6">

          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
            Workspace
          </p>

          <nav className="space-y-1">

            {/* DASHBOARD */}
            <button
              onClick={() => navigate("/customer-dashboard")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-orange-500/10 border border-orange-500/10 text-orange-400 text-sm font-medium transition"
            >
              <span className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-sm">
                ▦
              </span>

              <span>Dashboard</span>
            </button>

            {/* TICKETS */}
            <button
              onClick={() => {
                document
                  .getElementById("my-tickets")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium transition"
            >
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  ▤
                </span>

                <span>My Tickets</span>
              </span>

              <span className="text-xs text-gray-600">
                {totalTickets}
              </span>
            </button>

            {/* CREATE TICKET */}
            <button
              onClick={() => navigate("/create-ticket")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium transition"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                +
              </span>

              <span>Create Ticket</span>
            </button>

          </nav>

          {/* QUICK INFO */}
          <div className="mt-8 mx-1 p-4 rounded-2xl bg-orange-500/[0.06] border border-orange-500/10">

            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
              <span className="text-orange-400">?</span>
            </div>

            <p className="text-sm font-medium text-white">
              Need help?
            </p>

            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Create a support ticket and our team will get back to you.
            </p>

            <button
              onClick={() => navigate("/create-ticket")}
              className="mt-3 text-xs font-semibold text-orange-400 hover:text-orange-300 transition"
            >
              Create a ticket →
            </button>

          </div>

        </div>

        {/* USER / LOGOUT */}
        <div className="p-4 border-t border-white/10">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-9 h-9 shrink-0 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 font-semibold">
                {user?.username
                  ? user.username.charAt(0).toUpperCase()
                  : "C"}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {userLoading
                  ? "Loading..."
                  : user?.username || "Customer"}
              </p>

              <p className="text-[11px] text-gray-500 capitalize">
                {user?.role || "Customer"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              title="Logout"
              className="w-8 h-8 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              ↪
            </button>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MOBILE / TABLET TOPBAR
      ====================================================== */}
      <header className="lg:hidden sticky top-0 z-50 h-16 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">

        <button
          onClick={() => navigate("/customer-dashboard")}
          className="flex items-center gap-2"
        >

          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
            <span className="text-black font-black">
              S
            </span>
          </div>

          <h1 className="font-bold">
            Support<span className="text-orange-500">Flow</span>
          </h1>

        </button>

        <div className="flex items-center gap-2">

          <button
            onClick={() => navigate("/create-ticket")}
            className="px-3 py-2 rounded-lg bg-orange-500 text-black text-xs font-bold"
          >
            + Ticket
          </button>

          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-xs hover:text-red-400 transition"
          >
            {logoutLoading ? "..." : "Logout"}
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="lg:ml-64 min-h-screen">

        {/* DESKTOP TOPBAR */}
        <div className="hidden lg:flex h-20 border-b border-white/10 bg-[#0b0b0b] items-center justify-between px-8">

          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              Workspace
            </p>

            <p className="text-sm text-gray-300 mt-1">
              Customer Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="text-sm font-medium">
                {userLoading
                  ? "Loading..."
                  : user?.username || "Customer"}
              </p>

              <p className="text-xs text-gray-600">
                {user?.email || ""}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 font-semibold">
                {user?.username
                  ? user.username.charAt(0).toUpperCase()
                  : "C"}
              </span>
            </div>

          </div>

        </div>


        {/* CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

          {/* =================================================
              WELCOME
          ================================================== */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>

                <span className="text-[10px] font-semibold tracking-widest text-orange-400">
                  CUSTOMER PORTAL
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight">
                Welcome back
                {user?.username && (
                  <span className="text-orange-500">
                    , {user.username}
                  </span>
                )}
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl text-sm sm:text-base">
                Manage your support requests, monitor progress,
                and stay connected with our support team.
              </p>

            </div>

            <button
              onClick={() => navigate("/create-ticket")}
              className="hidden sm:flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition active:scale-[0.98] shadow-lg shadow-orange-500/10"
            >
              <span className="text-lg leading-none">+</span>
              Create New Ticket
            </button>

          </div>


          {/* =================================================
              STATS
          ================================================== */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-8">

            {/* TOTAL */}
            <div className="group bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/25 transition">

              <div className="flex items-center justify-between">

                <p className="text-xs sm:text-sm text-gray-500">
                  Total Tickets
                </p>

                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <span className="text-orange-400 text-sm">
                    #
                  </span>
                </div>

              </div>

              <p className="text-3xl font-bold mt-4">
                {totalTickets}
              </p>

              <p className="text-[11px] text-gray-600 mt-1">
                All support requests
              </p>

            </div>


            {/* OPEN */}
            <div className="group bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-blue-500/25 transition">

              <div className="flex items-center justify-between">

                <p className="text-xs sm:text-sm text-gray-500">
                  Open Tickets
                </p>

                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 text-sm">
                    ◌
                  </span>
                </div>

              </div>

              <p className="text-3xl font-bold mt-4">
                {openTickets}
              </p>

              <p className="text-[11px] text-gray-600 mt-1">
                Awaiting resolution
              </p>

            </div>


            {/* RESOLVED */}
            <div className="group bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-green-500/25 transition">

              <div className="flex items-center justify-between">

                <p className="text-xs sm:text-sm text-gray-500">
                  Resolved
                </p>

                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-400 text-sm">
                    ✓
                  </span>
                </div>

              </div>

              <p className="text-3xl font-bold mt-4">
                {resolvedTickets}
              </p>

              <p className="text-[11px] text-gray-600 mt-1">
                Successfully resolved
              </p>

            </div>


            {/* HIGH PRIORITY */}
            <div className="group bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-red-500/25 transition">

              <div className="flex items-center justify-between">

                <p className="text-xs sm:text-sm text-gray-500">
                  High Priority
                </p>

                <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">
                    !
                  </span>
                </div>

              </div>

              <p className="text-3xl font-bold mt-4">
                {highPriority}
              </p>

              <p className="text-[11px] text-gray-600 mt-1">
                Need attention
              </p>

            </div>

          </div>


          {/* =================================================
              TICKETS
          ================================================== */}
          <section
            id="my-tickets"
            className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/10"
          >

            {/* SECTION HEADER */}
            <div className="px-5 sm:px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-xl font-semibold">
                    My Tickets
                  </h2>

                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-500">
                    {totalTickets}
                  </span>

                </div>

                <p className="text-sm text-gray-600 mt-1">
                  Track and manage your support requests
                </p>

              </div>

              <button
                onClick={() => navigate("/create-ticket")}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold text-sm transition"
              >
                <span>+</span>
                Create Ticket
              </button>

            </div>


            {/* LOADING */}
            {loading && (
              <div className="py-24 flex flex-col items-center justify-center">

                <div className="relative w-9 h-9 mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin"></div>
                </div>

                <p className="text-gray-400 text-sm">
                  Loading your tickets...
                </p>

              </div>
            )}


            {/* ERROR */}
            {!loading && error && (
              <div className="m-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-center justify-between gap-4">

                <p className="text-sm">
                  {error}
                </p>

                <button
                  onClick={fetchTickets}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-sm font-medium transition"
                >
                  Retry
                </button>

              </div>
            )}


            {/* EMPTY */}
            {!loading && !error && tickets.length === 0 && (
              <div className="py-24 text-center px-5">

                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center">
                  <span className="text-orange-400 text-xl">
                    #
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  No tickets yet
                </h3>

                <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                  You haven't created any support requests yet.
                  Create your first ticket and our support team
                  will be happy to help.
                </p>

                <button
                  onClick={() => navigate("/create-ticket")}
                  className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition"
                >
                  + Create Your First Ticket
                </button>

              </div>
            )}


            {/* TICKETS */}
            {!loading && !error && tickets.length > 0 && (
              <div className="divide-y divide-white/5">

                {tickets.map((ticket) => (

                  <div
                    key={ticket._id}
                    onClick={() =>
                      navigate(`/tickets/${ticket._id}`)
                    }
                    className="p-5 sm:px-6 hover:bg-white/[0.025] cursor-pointer transition group"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                      {/* INFO */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-center flex-wrap gap-2.5 mb-2">

                          <span className="text-[11px] text-orange-500 font-bold">
                            #{ticket.ticketNumber}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                              ticket.status === "Resolved"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : ticket.status === "In Progress"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            }`}
                          >
                            {ticket.status}
                          </span>

                        </div>

                        <h3 className="font-semibold text-base sm:text-lg truncate group-hover:text-orange-400 transition">
                          {ticket.subject}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {ticket.description}
                        </p>

                      </div>


                      {/* META */}
                      <div className="flex items-center gap-2 sm:gap-3">

                        <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-gray-500">
                          {ticket.category || "General"}
                        </span>

                        <span
                          className={`px-3 py-1.5 rounded-lg text-[11px] border ${
                            ticket.priority === "High"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : ticket.priority === "Medium"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}
                        >
                          {ticket.priority || "Low"}
                        </span>

                        <span className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-gray-600 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition">
                          →
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </section>


          {/* FOOTER */}
          <footer className="text-center py-8 text-[11px] text-gray-700">
            SupportFlow • Customer Support Portal
          </footer>

        </main>

      </div>

    </div>
  );
};

export default CustomerDashboard;


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

  // ================= FETCH LOGGED-IN USER =================
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

      {/* ================= NAVBAR ================= */}
      <nav className="h-16 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between px-5 sm:px-8 sticky top-0 z-50">

        {/* LOGO */}
        <div
          onClick={() => navigate("/customer-dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >

          <div>
            <h1 className="font-bold text-lg leading-none">
              Support<span className="text-orange-500">
                Flow
              </span>
            </h1>

            <p className="text-[10px] text-gray-500">
              Customer Portal
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* NEW TICKET */}
          <button
            onClick={() => navigate("/create-ticket")}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm transition"
          >
            <span className="text-lg">+</span>
            New Ticket
          </button>

          {/* NOTIFICATION */}
          <button className="relative w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
            <span className="text-lg"></span>

            {openTickets > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[9px] text-black font-bold flex items-center justify-center">
                {openTickets}
              </span>
            )}
          </button>

          {/* USER INFO */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white">
              {userLoading
                ? "Loading..."
                : user?.username || "Customer"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role || "Customer"}
            </p>
          </div>

          {/* USER AVATAR */}
          <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <span className="text-orange-400 font-semibold">
              {user?.username
                ? user.username.charAt(0).toUpperCase()
                : "C"}
            </span>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 text-sm font-medium transition disabled:opacity-50"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>

        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">

        {/* ================= WELCOME HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <p className="text-orange-500 text-sm font-medium mb-1">
              CUSTOMER DASHBOARD
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold">
              Welcome back
              {user?.username && (
                <span className="text-orange-500">
                  , {user.username}
                </span>
              )}{" "}
              👋
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your support requests and track their progress.
            </p>

          </div>

          {/* MOBILE CREATE BUTTON */}
          <button
            onClick={() => navigate("/create-ticket")}
            className="sm:hidden w-full px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold transition"
          >
            + Create New Ticket
          </button>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* TOTAL */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition">

            <div className="flex items-center justify-between">

              <p className="text-gray-400 text-sm">
                Total Tickets
              </p>

              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                🎫
              </div>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              {totalTickets}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              All support requests
            </p>

          </div>

          {/* OPEN */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition">

            <div className="flex items-center justify-between">

              <p className="text-gray-400 text-sm">
                Open Tickets
              </p>

              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                📂
              </div>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              {openTickets}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Awaiting resolution
            </p>

          </div>

          {/* RESOLVED */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition">

            <div className="flex items-center justify-between">

              <p className="text-gray-400 text-sm">
                Resolved
              </p>

              <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                ✓
              </div>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              {resolvedTickets}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Successfully resolved
            </p>

          </div>

          {/* HIGH PRIORITY */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition">

            <div className="flex items-center justify-between">

              <p className="text-gray-400 text-sm">
                High Priority
              </p>

              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                !
              </div>

            </div>

            <h2 className="text-3xl font-bold mt-3">
              {highPriority}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Need attention
            </p>

          </div>

        </div>

        {/* ================= TICKETS SECTION ================= */}
        <section className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">

          {/* SECTION HEADER */}
          <div className="px-5 sm:px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold">
                My Tickets
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Track and manage your support requests
              </p>

            </div>

            <button
              onClick={() => navigate("/create-ticket")}
              className="hidden sm:block px-4 py-2 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-black font-medium text-sm transition"
            >
              + Create Ticket
            </button>

          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center">

              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-4"></div>

              <p className="text-gray-400 text-sm">
                Loading your tickets...
              </p>

            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="m-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-center justify-between gap-4">

              <p className="text-sm">
                {error}
              </p>

              <button
                onClick={fetchTickets}
                className="text-sm font-medium text-red-300 hover:text-white"
              >
                Retry
              </button>

            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!loading && !error && tickets.length === 0 && (
            <div className="py-20 text-center px-5">

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-orange-500/10 flex items-center justify-center text-2xl">
                🎫
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No tickets yet
              </h3>

              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                You haven't created any support requests.
                Create your first ticket and our support team
                will help you.
              </p>

              <button
                onClick={() => navigate("/create-ticket")}
                className="px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold transition"
              >
                + Create Your First Ticket
              </button>

            </div>
          )}

          {/* ================= TICKETS ================= */}
          {!loading && !error && tickets.length > 0 && (
            <div className="divide-y divide-white/5">

              {tickets.map((ticket) => (

                <div
                  key={ticket._id}
                  onClick={() =>
                    navigate(`/tickets/${ticket._id}`)
                  }
                  className="p-5 sm:px-6 hover:bg-white/[0.02] cursor-pointer transition group"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* TICKET INFO */}
                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-3 mb-2">

                        <span className="text-xs text-orange-500 font-semibold">
                          #{ticket.ticketNumber}
                        </span>

                        {/* STATUS */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
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

                      <h3 className="font-semibold text-lg truncate group-hover:text-orange-400 transition">
                        {ticket.subject}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {ticket.description}
                      </p>

                    </div>

                    {/* CATEGORY + PRIORITY */}
                    <div className="flex items-center gap-3">

                      <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400">
                        {ticket.category || "General"}
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs border ${
                          ticket.priority === "High"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : ticket.priority === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-green-500/10 text-green-400 border-green-500/20"
                        }`}
                      >
                        {ticket.priority || "Low"}
                      </span>

                      {/* OPEN DETAILS */}
                      <span className="text-gray-600 group-hover:text-orange-500 transition text-lg">
                        →
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

        {/* ================= FOOTER ================= */}
        <div className="text-center py-8 text-xs text-gray-600">
          SupportFlow • Customer Support Portal
        </div>

      </main>
    </div>
  );
};

export default CustomerDashboard;

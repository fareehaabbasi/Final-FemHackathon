import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTicket, sendMessage } from "../services/ticket.api";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await getTicket(id);
        setTicket(data.ticket);
      } catch (error) {
        console.log("Failed to fetch ticket", error);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      setSending(true);

      const data = await sendMessage(id, message);

      setTicket(data.ticket);
      setMessage("");
    } catch (error) {
      console.log("Failed to send message", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <p>Loading ticket...</p>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <p>Ticket not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-orange-500 mb-6"
        >
          ← Back
        </button>

        {/* Ticket Info */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">{ticket.ticketNumber}</p>

              <h1 className="text-2xl font-bold mt-1">{ticket.subject}</h1>

              <p className="text-gray-400 mt-3">{ticket.description}</p>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs">
                {ticket.priority}
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs">
                {ticket.status}
              </span>
            </div>
          </div>

          {/* AI Summary */}
          <div className="mt-6 bg-[#0d0d0d] rounded-xl p-4">
            {/* Assigned Agent */}
            <div className="mt-5 bg-[#0d0d0d] rounded-xl p-4 border border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Support Agent
              </p>

              <p className="text-sm text-white font-medium">
                {ticket.assignedAgent?.username || "Not assigned yet"}
              </p>
            </div>

            <p className="text-xs text-orange-500 font-semibold mb-2">
              AI SUMMARY
            </p>

            {/* Resolution Note */}
            {ticket.resolutionNote && (
              <div className="mt-4 bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                <p className="text-xs text-green-400 font-semibold mb-2">
                  RESOLUTION
                </p>

                <p className="text-sm text-gray-300">{ticket.resolutionNote}</p>
              </div>
            )}

            <p className="text-sm text-gray-400">{ticket.summary}</p>

            <p className="text-sm text-gray-400 mt-2">
              Category: <span className="text-white">{ticket.category}</span>
            </p>
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 mt-5">
          <h2 className="text-lg font-semibold mb-5">Conversation</h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {ticket.messages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No messages yet.
              </p>
            ) : (
              ticket.messages.map((msg) => (
                <div key={msg._id} className="bg-[#0d0d0d] rounded-xl p-4">
                  <div className="flex justify-between gap-3">
                    <span className="text-sm font-semibold text-orange-500">
                      {msg.sender?.username}
                    </span>

                    <span className="text-xs text-gray-600">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 mt-2">{msg.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Send Message */}
          {ticket.status !== "Completed" && ticket.status !== "Rejected" && (
            <form onSubmit={handleSendMessage} className="flex gap-3 mt-6">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 px-4 py-3 rounded-lg bg-[#0d0d0d] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                disabled={sending}
                className="px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-semibold disabled:opacity-50"
              >
                {sending ? "..." : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;

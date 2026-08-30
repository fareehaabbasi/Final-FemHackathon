const { Router } = require("express");
const ticketController = require("../controllers/ticket.controller.js");
const { authUser } = require("../middleware/auth.middleware.js");

const ticketRoutes = Router();

// Create a new ticket
ticketRoutes.post("/", authUser, ticketController.createTicket);

// Get logged-in customer's tickets
ticketRoutes.get("/my-tickets", authUser, ticketController.getMyTickets);

ticketRoutes.get("/agents", authUser, ticketController.getAgents);

ticketRoutes.get(
    "/agent-tickets",
    authUser,
    ticketController.getAgentTickets
);

ticketRoutes.patch(
    "/:id/status",
    authUser,
    ticketController.updateTicketStatus
);

ticketRoutes.post(
    "/:id/messages",
    authUser,
    ticketController.sendMessage
);

// Get single ticket
ticketRoutes.get("/:id", authUser, ticketController.getTicket);

module.exports = ticketRoutes;
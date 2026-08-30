const ticketModel = require("../models/ticket.model.js");
const { analyzeTicket } = require("../services/ai.service.js");


// Create Ticket
async function createTicket(req, res) {
    try {
        const { subject, description, category, assignedAgent } = req.body;

        console.log("Assigned Agent:", assignedAgent);

        if (!subject || !description) {
            return res.status(400).json({
                message: "Subject and description are required"
            });
        }

        let aiResult = {
            category: category || "General",
            priority: "Medium",
            summary: description.slice(0, 150)
        };

        // AI analysis
        try {
            aiResult = await analyzeTicket({
                subject,
                description,
                category
            });
        } catch (aiError) {
            console.log("AI failed:", aiError.message);
        }

        const ticketNumber = `TKT-${Date.now()}`;

        const ticket = await ticketModel.create({
            ticketNumber,
            subject,
            description,
            category: aiResult.category,
            priority: aiResult.priority,
            summary: aiResult.summary,
            customer: req.user.id,
            assignedAgent: assignedAgent || null
        });

        res.status(201).json({
            message: "Ticket created successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create ticket",
            error: error.message
        });
    }
}


// Get Customer's Tickets
async function getMyTickets(req, res) {
    try {
        const tickets = await ticketModel
            .find({ customer: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            tickets
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tickets",
            error: error.message
        });
    }
}

// Get Agent's Assigned Tickets
async function getAgentTickets(req, res) {
    try {
        const tickets = await ticketModel
            .find({ assignedAgent: req.user.id })
            .populate("customer", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            tickets
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch agent tickets",
            error: error.message
        });
    }
}

// Update Ticket Status
async function updateTicketStatus(req, res) {
    try {
        const { status, resolutionNote } = req.body;

        const allowedStatuses = [
            "Accepted",
            "Rejected",
            "In Progress",
            "Completed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const ticket = await ticketModel.findOne({
            _id: req.params.id,
            assignedAgent: req.user.id
        });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found or not assigned to you"
            });
        }

        // Completed/Rejected ticket cannot be changed
        if (
            ticket.status === "Completed" ||
            ticket.status === "Rejected"
        ) {
            return res.status(400).json({
                message: "This ticket can no longer be changed"
            });
        }

        // Completed requires resolution note
        if (status === "Completed" && !resolutionNote?.trim()) {
            return res.status(400).json({
                message: "Resolution note is required"
            });
        }

        ticket.status = status;

        if (status === "Completed") {
            ticket.resolutionNote = resolutionNote;
        }

        await ticket.save();

        res.status(200).json({
            message: "Ticket status updated successfully",
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update ticket status",
            error: error.message
        });
    }
}


// Get Single Ticket
async function getTicket(req, res) {
    try {
        const ticket = await ticketModel
            .findById(req.params.id)
            .populate("customer", "username email")
            .populate("assignedAgent", "username email")
            .populate("messages.sender", "username role");

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Customer can only see their own ticket
        if (
            req.user.role === "customer" &&
            ticket.customer._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not allowed to view this ticket"
            });
        }

        res.status(200).json({
            ticket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch ticket",
            error: error.message
        });
    }
}

// Get Available Agents
async function getAgents(req, res) {
    try {
        const agents = await require("../models/user.model.js")
            .find({ role: "agent" })
            .select("username email");

        res.status(200).json({
            agents
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch agents",
            error: error.message
        });
    }
}

// Send Message
async function sendMessage(req, res) {
    try {
        const { message } = req.body;

        if (!message?.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const ticket = await ticketModel.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Only customer or assigned agent can message
        const isCustomer =
            ticket.customer.toString() === req.user.id;

        const isAgent =
            ticket.assignedAgent &&
            ticket.assignedAgent.toString() === req.user.id;

        if (!isCustomer && !isAgent) {
            return res.status(403).json({
                message: "You are not allowed to message on this ticket"
            });
        }

        ticket.messages.push({
            sender: req.user.id,
            message: message.trim()
        });

        await ticket.save();

        const updatedTicket = await ticketModel
            .findById(ticket._id)
            .populate("messages.sender", "username role");

        res.status(201).json({
            message: "Message sent successfully",
            ticket: updatedTicket
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to send message",
            error: error.message
        });
    }
}


// Export Controllers
module.exports = {
    createTicket,
    getMyTickets,
    getTicket,
    getAgents,
    getAgentTickets,
    updateTicketStatus,
    sendMessage,
};
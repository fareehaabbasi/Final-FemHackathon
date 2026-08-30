const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        ticketNumber: {
            type: String,
            unique: true,
            required: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "Billing",
                "Technical",
                "Account",
                "Delivery",
                "General",
            ],
            default: "General",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        summary: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "In Progress", "Completed"],
            default: "Pending",
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        assignedAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: null,
        },

        messages: [
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true,
                },

                message: {
                    type: String,
                    required: true,
                    trim: true,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        resolutionNote: {
            type: String,
            default: "",
        },

        review: {
            rating: {
                type: Number,
                min: 1,
                max: 5,
                default: null
            },

            comment: {
                type: String,
                default: ""
            },
        },
    },
    {
        timestamps: true,
    }
);

const ticketModel = mongoose.model("ticket", ticketSchema);

module.exports = ticketModel;
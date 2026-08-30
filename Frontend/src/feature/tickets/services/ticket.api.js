import axios from "axios";

const API = "https://final-fem-hackathon.vercel.app/api/tickets";

export const createTicket = async (data) => {
    const response = await axios.post(
        API,
        data,
        { withCredentials: true }
    );

    return response.data;
};

export const getMyTickets = async () => {
    const response = await axios.get(
        `${API}/my-tickets`,
        { withCredentials: true }
    );

    return response.data;
};

export const getTicket = async (id) => {
    const response = await axios.get(
        `${API}/${id}`,
        { withCredentials: true }
    );

    return response.data;
};

export const getAgents = async () => {
    const response = await axios.get(
        `${API}/agents`,
        { withCredentials: true }
    );

    return response.data;
};

export const getAgentTickets = async () => {
    const response = await axios.get(
        `${API}/agent-tickets`,
        { withCredentials: true }
    );

    return response.data;
};

export const updateTicketStatus = async (id, data) => {
    const response = await axios.patch(
        `${API}/${id}/status`,
        data,
        { withCredentials: true }
    );

    return response.data;
};

export const sendMessage = async (id, message) => {
    const response = await axios.post(
        `${API}/${id}/messages`,
        { message },
        { withCredentials: true }
    );

    return response.data;
};
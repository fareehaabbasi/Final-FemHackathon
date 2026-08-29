const mongoose = require('mongoose');

const blackListUserScheme = new mongoose.Schema({
    token:{
        type: String,
        required:[true, "Token is required"]
    }
},{ timestamps: true })

const tokenBlacklistModel = mongoose.model("blacklistToken", blackListUserScheme);

module.exports = tokenBlacklistModel;
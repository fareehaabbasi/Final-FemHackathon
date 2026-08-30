const authModel = require("../models/user.model.js");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

/**
 * @name userRegister
 * @desc Controller to handle user registration, expect username, email and password in the request body
 * @access Public
 */
async function userRegister(req, res) {
    const { username, email, password, role } = req.body;

    if(!username || !email || !password) {
        return res.status(400).
        json({message: "All fields are required"})
    }

    const isAlreadyRegistered = await authModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "Username or Email already registered"
        })
    }

    const hashesPassword = await bcrypt.hash(password, 10)

    const user = await authModel.create({
        username, 
        email,
        password: hashesPassword,
        role
    })

    const token = jwt.sign(
        {id: user._id, username: user.username, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role:user.role
        }
    })
}

/**
 * @name userLogin
 * @desc Controller to handle user login,expect email and password in the request body
 * @access Public
 */
async function userLogin(req, res) {
    const {email, password} = req.body;

    const user = await authModel.findOne({ email })

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

        const token = jwt.sign(
        {id: user._id, username: user.username, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role:user.role
        }
    })

}

/**
 * @name userLogout
 * @desc Controller to handle user logout, expect token in the cookies
 * @access Private
 */
async function userLogout(req, res) {
    const token = req.cookies.token;

    if(token) {
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMe
 * @desc Controller to get the logged in user's details, expect token in the cookies
 * @access Private
 */
async function userGetMe(req, res) {
    const user = await authModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role:user.role
        }
    })
}

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    userGetMe
}
const { Router } = require('express');
const authController = require("../controllers/auth.controller")
const middleware = require("../middleware/auth.middleware.js")

const authRoutes = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRoutes.post('/register', authController.userRegister)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRoutes.post('/login', authController.userLogin)

/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Private
 */
authRoutes.get('/logout', authController.userLogout)

/**
 * @route GET /api/auth/get-me
 * @desc Get the logged in user's details
 * @access Private
 */
authRoutes.get('/get-me', middleware.authUser, authController.userGetMe)

module.exports = authRoutes;
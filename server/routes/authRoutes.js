import express from "express";
import { forgotPassword, login, resetPassword, signup, test, verifyEmail } from "../controllers/authController.js";

const router = express.Router()

//a test route
router.get('/test', test)

//Sign up route
router.post('/signup', signup)

//verify account route
router.post('/verify-email',  verifyEmail)

//User forgot password 
router.post('/forgot-password', forgotPassword)

//login route
router.post('/login', login)

//reset password route
router.post('/reset-password/:token', resetPassword)


export default router
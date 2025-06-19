import express from "express";
import { getAllUsers, getUsersByName, login, signup, test, verifyEmail } from "../controllers/authController.js";

const router = express.Router()

//a test route
router.get('/test', test)

//Sign up route
router.post('/signup', signup)

//verify account route
router.post('/verify-email',  verifyEmail)

//login route
router.post('/login', login)

//get users by name
router.get('/user', getUsersByName)

//get all users
router.get('/users', getAllUsers)

export default router
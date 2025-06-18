import express from "express";
import { getAllUsers, getUsersByName, signup, test, verifyEmail } from "../controllers/authController.js";

const router = express.Router()

//a test route
router.get('/test', test)

//Sign up route
router.post('/signup', signup)

//verify account route
router.post('/verify-email',  verifyEmail)

//get users by name
router.get('/user', getUsersByName)

//get all users
router.get('/users', getAllUsers)

export default router
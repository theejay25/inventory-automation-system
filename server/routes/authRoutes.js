import express from "express";
import { checkAuth, deleteUser, forgotPassword, login, logout, resetPassword, signup, test, updateUser, verifyEmail } from "../controllers/authController.js";
import { verifyTokenAndRole } from "../middleware/verifyTokenAndRole.js";


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

//logout route
router.post('/logout', logout)

//update user info
router.put('/update-user/:id', verifyTokenAndRole, updateUser)

//delete user
router.delete('/delete-users/:id', deleteUser)

//reset password route
router.post('/reset-password/:token', resetPassword)

//check user auth
router.get('/check-auth', verifyTokenAndRole, checkAuth)


export default router
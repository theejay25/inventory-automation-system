import express from "express";
import { signup, test } from "../controllers/authController.js";

const router = express.Router()

//a test route
router.get('/test', test)

//Sign up route
router.post('/signup', signup)

export default router
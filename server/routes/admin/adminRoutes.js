import express from 'express'
import { getAllUsers, getUsersByName } from '../../controllers/admins/adminController.js'
import { verifyTokenAndRole } from '../../middleware/verifyTokenAndRole.js'
import { isAdmin } from '../../middleware/isAdmin.js'


const adminRouter = express.Router()

//get users by name
adminRouter.get('/user', verifyTokenAndRole, isAdmin, getUsersByName)

//get all users
adminRouter.get('/users', verifyTokenAndRole, isAdmin, getAllUsers)

export default adminRouter
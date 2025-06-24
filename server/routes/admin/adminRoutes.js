import express from 'express'
import { adminUpdates, getAllUsers, getUsersByName, makeAdmin } from '../../controllers/admins/adminController.js'
import { verifyTokenAndRole } from '../../middleware/verifyTokenAndRole.js'
import { isAdmin } from '../../middleware/isAdmin.js'


const adminRouter = express.Router()

//get users by name
adminRouter.get('/user', verifyTokenAndRole, isAdmin, getUsersByName)

//get all users
adminRouter.get('/users', verifyTokenAndRole, isAdmin, getAllUsers)

//update user info
adminRouter.put('/update-user/:id', verifyTokenAndRole, isAdmin, adminUpdates)

//make user an admin
adminRouter.post('/make-admin/:id', verifyTokenAndRole, isAdmin, makeAdmin)

export default adminRouter
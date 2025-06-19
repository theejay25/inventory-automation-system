import express from 'express'
import { getAllUsers, getUsersByName } from '../../controllers/admins/adminController.js'

const adminRouter = express.Router()

//get users by name
adminRouter.get('/user', getUsersByName)

//get all users
adminRouter.get('/users', getAllUsers)

export default adminRouter
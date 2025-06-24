import express from 'express'
import { addNewProduct, getAllProducts, getProductById } from '../controllers/productsController.js'
import { verifyTokenAndRole } from '../middleware/verifyTokenAndRole.js'

const productRouter = express.Router()

//POST
// add new product to stock
productRouter.post('/:id', verifyTokenAndRole, addNewProduct)

//GET
//get all products from db
productRouter.get('/:id', verifyTokenAndRole, getAllProducts)

//GET
//get product by Id
productRouter.get('/:id/:prodId', verifyTokenAndRole, getProductById)

export default productRouter


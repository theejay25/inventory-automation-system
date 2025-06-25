import express from 'express'
import { addNewProduct, deleteproducts, getAllProducts, getProductById, updateproducts } from '../controllers/productsController.js'
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

//PUT
//update product info
productRouter.put('/update-products/:id/:prodId', verifyTokenAndRole, updateproducts)


//DELETE
//delete product from db
productRouter.delete('/delete-products/:id/:prodId', verifyTokenAndRole, deleteproducts)


export default productRouter


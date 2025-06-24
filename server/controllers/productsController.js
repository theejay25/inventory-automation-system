import products from '../models/products.js'
import Users from '../models/users.js'

// name – String, required
// sku – String, required, unique
// category – String, required
// price – Number, required


// description – String, optional (default: '')
// quantity – Number, optional (default: 0)
// supplier – String, optional (default: '')


// route @ api/product/:id
//desc add products to db
export const addNewProduct = async ( req, res ) => {
    const { name, sku, description, category, quantity, price, supplier} = req.body
    const { id } = req.params

    try {
        
        if(!id) {
            return res.status(400).json({success: false, message: 'No id provided in the request parameters'})
        }

        const existingUser = await Users.findById(id)

        if(!existingUser) {
            return res.status(400).json({success: false, message: 'user with this id does not exist'})
        }

        const newProduct = new products({
            name,
            sku, 
            description, 
            category, 
            quantity, 
            price, 
            supplier,
            addedBy : id
        })

        await newProduct.save()

        res.status(201).json({success: true, message: 'Product has been added to stocks'})



    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'error in adding products'})
    }
}

// @route GET /api/products/:id
//get all products in db
export const getAllProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const allProducts = await Products.find();

    res.status(200).json({
      success: true,
      message: 'All products retrieved successfully',
      products: allProducts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
};


// route @ api/product/:id/:prodId
//get product by Id
export const getProductById = async (req, res) => {
  const { id, prodId } = req.params;

  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await Products.findById(prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error retrieving product' });
  }
};

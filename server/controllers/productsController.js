import products from '../models/products.js'
import Users from '../models/users.js'

// name – String, required
// sku – String, required, unique
// category – String, required
// price – Number, required


// description – String, optional (default: '')
// quantity – Number, optional (default: 0)
// supplier – String, optional (default: '')


// @route POST api/product/:id
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
  const { name, category, supplier } = req.query;

  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Build query object dynamically for flexible filtering
    const query = {};
    if (name) query.name = { $regex: new RegExp(name, 'i') };
    if (category) query.category = { $regex: new RegExp(category, 'i') };
    if (supplier) query.supplier = { $regex: new RegExp(supplier, 'i') };

    const filteredProducts = await products.find(query);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      products: filteredProducts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
};


// @route GET api/product/:id/:prodId
//get product by Id
export const getProductById = async (req, res) => {
  const { id, prodId } = req.params;

  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await products.findById(prodId);
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


// @route PUT /api/product/update-products/:id/:prodId
//update product info
export const updateproducts = async (req, res) => {
   const { id, prodId } = req.params;
   const {name, category, supplier, description, price, quantity} = req.body

  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await products.findById(prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if(name) product.name = name
    if(category) product.category = category
    if(price) product.price = price
    if(description) product.description = description
    if(supplier) product.supplier = supplier
    if(quantity) product.quantity = quantity

    await product.save()

    res.status(200).json({
      success: true, 
      message: `successfully updated ${product.name} ${product.sku} information` 
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'error in updating product information'})
  }
}

// @toute POST /api/product/delete-product/:id/:prodId
// delete product from db
export const deleteproducts = async (req, res) => {
  const { id, prodId } = req.params;
  
  try {
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const product = await products.findByIdAndDelete(prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true, 
      message: `${product.name} ${product.sku} successfully deleted from database`
    })


  } catch(error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Error in deleting product'})
  }

}
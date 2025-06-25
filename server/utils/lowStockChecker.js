import products from "../models/products.js";

const checkStocks = async (req,res) => {

  try {
      const product = await products.find({quantity: {$lt : 30}})
  
      if (product.length === 0) {
        return res.status(200).json({success: true, message: 'All stocks are suffiecient'})
      } 

      console.log(`some stocks are low: ${product.name} | ${product.sku} | ${product.quantity}`)
  
      res.status(200).json({
          success: true,
          message: 'Some stocks are low',
          products: product.map(p => ({
              name: p.name,
              sku: p.sku,
              quantity: p.quantity
          }))
      })
  } catch (error) {
    console.log( 'error in checking stocks:', error)
    res.status(500).json({success: false, message:'Error in checking stocks'})
  }

}

export default checkStocks
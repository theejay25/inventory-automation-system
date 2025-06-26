import products from "../models/products.js";

// Core logic for getting low stock products
export const getLowStockProducts = async () => {
  return await products.find({ quantity: { $lt: 30 } });
};

// Express handler
const checkStocks = async (req, res) => {
  try {
    const lowStock = await getLowStockProducts();
    if (lowStock.length === 0) {
      return res.status(200).json({ success: true, message: 'All stocks are sufficient' });
    }
    res.status(200).json({
      success: true,
      message: 'Some stocks are low',
      products: lowStock.map(p => ({
        name: p.name,
        sku: p.sku,
        quantity: p.quantity
      }))
    });
  } catch (error) {
    console.log('error in checking stocks:', error);
    res.status(500).json({ success: false, message: 'Error in checking stocks' });
  }
};

export default checkStocks;
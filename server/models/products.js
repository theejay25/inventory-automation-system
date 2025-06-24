// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true // stock keeping unit
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    default: ''
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);

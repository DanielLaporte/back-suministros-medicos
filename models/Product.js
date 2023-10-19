const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
  },
  description: {
    type: String,
    required: [true, "Product description is required."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
  },
  brand: {
    type: String,
    required: [true, "Product brand is required."],
  },
  category: {
    type: String,
    required: [true, "Product category is required."],
  },
  promotional: {
    type: Boolean,
    default: false, // Puedes establecer un valor por defecto (false para no promocional)
  },
  sales: {
    type: Number,
    default: 0, // Inicialmente no se han vendido
  },
  favorites: { type: Number, default: 0 },
  
  image:{
    type: String,
  }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;








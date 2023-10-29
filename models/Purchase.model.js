// Purchase.model.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Hace referencia al modelo de usuario
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Hace referencia al modelo de producto
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  // Puedes agregar más campos según tus necesidades
});

module.exports = mongoose.model('Purchase', purchaseSchema);


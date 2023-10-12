const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js'); // Asegúrate de importar tu modelo de producto


// POST '/NewProducts' para crear un nuevo producto
router.post('/', (req, res) => {
  const { name, description, price, category } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  newProduct
    .save()
    .then((savedProduct) => {
      res.json(savedProduct);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el producto' });
    });
});

// GET '/products' para obtener todos los productos
router.get('/', (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    });
});


// PUT '/NewProducts/:id' para actualizar un producto por ID
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(updatedProduct);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    });
});

// DELETE '/NewProducts/:id' para eliminar un producto por ID
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((removedProduct) => {
      if (!removedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado con éxito' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    });
});

module.exports = router;
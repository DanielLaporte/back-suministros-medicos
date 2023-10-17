const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const multer = require('multer');
const upload = require('../config/upload.js'); 




// POST '/NewProducts' para crear un nuevo producto
router.post('/', upload.single('image'), (req, res) => {
  let { name, description, price, category, brand, promotional, } = req.body;

  Product.create({
    name,
    description,
    price,
    category,
    brand,
    promotional,
    image: req?.file?.path,
  })
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

router.get('/promotional', async (req, res) => {
  try {
    const promotionalProducts = await Product.find({ promotional: true });
    res.json(promotionalProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos en promoción' });
  }
});


router.get('/:id' , (req, res) => {
  let id = req.params.id
  Product.findById(id).then(data=>{
    res.send(data)
  })

});

module.exports = router;
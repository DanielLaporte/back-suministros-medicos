const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const multer = require('multer');
const upload = require('../config/upload.js');
const User = require('../models/User.model.js');

// POST '/NewProducts' para crear un nuevo producto
router.post('/', upload.single('image'), (req, res) => {
  var { name, description, price, category, brand, promotional } = req.body;

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
router.put('/:id', upload.single('image'), (req, res) => {
  const { name, description, price, category, brand, promotional } = req.body;
  let image = req.file ? req.file.path : null; // Verifica si se ha subido una nueva imagen

  // Busca el producto existente en la base de datos para obtener su imagen actual
  Product.findById(req.params.id)
    .then((existingProduct) => {
      if (!existingProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Utiliza los campos del producto existente si no se proporcionan nuevos valores
      const updateData = {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
        category: category || existingProduct.category,
        brand: brand || existingProduct.brand,
        promotional: promotional || existingProduct.promotional,
        image: image || existingProduct.image, // Mantiene la imagen existente si no se proporciona una nueva
      };

      // Actualiza el producto en la base de datos
      return Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    })
    .then((updatedProduct) => {
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


router.get('/:id', (req, res) => {
  let id = req.params.id;
  Product.findById(id).then(data => {
    res.send(data);
  });
});

router.put('/:id/favorites', async (req, res) => {
  try {
    // Verifica si el usuario está autenticado (debes implementar la autenticación)
    

    // Busca el producto por su ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza el contador de "Me Gusta" en el producto
    product.favorites += 1;
    const updatedProduct = await product.save();

    // Registra el "Me Gusta" en el usuario (debes implementar cómo se guarda en el usuario)
    // Por ejemplo, si tienes un campo `likedProducts` en el modelo del usuario, puedes hacer esto:
    req.user.likedProducts.push(product._id);
    await req.user.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al dar "Me Gusta" al producto' });
  }
});
  

module.exports = router;
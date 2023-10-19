const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const multer = require('multer');
const upload = require('../config/upload.js'); 
const User = require('../models/User.model.js');



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
  Product.findByIdAndUpdate(req.params.id, req.body)
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

const likeProduct = async (req, res) => {
  try {
    const { userId } = req.user; // Supongo que tienes la información del usuario en el objeto req.user
    const { productId } = req.params;

    // Verificar si el usuario ya le dio "Me gusta" a este producto
    const user = await User.findById(userId);
    if (user.likedProducts.includes(productId)) {
      return res.status(400).json({ message: 'Ya le diste "Me gusta" a este producto.' });
    }

    // Agregar el producto a los "Me gusta" del usuario
    user.likedProducts.push(productId);
    await user.save();

    // Incrementar el contador de "Me gusta" del producto
    const product = await Product.findById(productId);
    product.likes += 1;
    await product.save();

    return res.status(200).json({ message: 'Producto añadido a tus favoritos.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto a tus favoritos.' });
  }
};

const unlikeProduct = async (req, res) => {
  try {
    const { userId } = req.user; // Supongo que tienes la información del usuario en el objeto req.user
    const { productId } = req.params;

    // Remover el producto de los "Me gusta" del usuario
    const user = await User.findById(userId);
    user.likedProducts = user.likedProducts.filter((id) => id.toString() !== productId);
    await user.save();

    // Decrementar el contador de "Me gusta" del producto
    const product = await Product.findById(productId);
    product.likes -= 1;
    await product.save();

    return res.status(200).json({ message: 'Producto eliminado de tus favoritos.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto de tus favoritos.' });
  }
};

router.post('/:Id', likeProduct);
router.delete('/:Id', unlikeProduct);


module.exports = router;
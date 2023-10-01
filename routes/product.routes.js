const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model"); // Asegúrate de que la ruta y el nombre del modelo sean correctos


router.post("/", (req, res, next) => {
  const { name, description, price, category } = req.body;
  
  Product.create ({ name, price, description, category })
  .then((response) => {
    res.json(response);
  })
  .catch((err) => res.json(err));
});

   
router.get("/", (req, res, next) => {
  Project.find()
    .populate("")
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => res.json(err));
  });


router.get("/:productId", (req, res, next) => {
  const { productId } = req.params;
  
    Product.findById(productId)
      .populate("")
      .then((product) => {
        res.json(product);
      })
      .catch((err) => res.json(err));
  });

router.put("/:productId", (req, res, next) => {
  const { productId } = req.params;
  
    Product.findByIdAndUpdate(productId, req.body, { new: true })
      .then((updatedProduct) => {
        res.json(updatedProduct);
      })
      .catch((err) => res.json(err));
  }); 

  router.delete("/:productId", (req, res, next) => {
    const { productId } = req.params;
  
    Product.findByIdAndRemove(productId)
      .then(() => {
        res.json({ message: "Se ha eliminado el producto correctamente." });
      })
      .catch((err) => res.json(err));
  });  

module.exports = router;



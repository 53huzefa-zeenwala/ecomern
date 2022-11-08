const router = require("express").Router();
const Product = require("../models/Product");

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// create products
router.post("/", async (req, res) => {
  const { name, description, price, category, images: pictures } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update products
router.patch("/:id", async (req, res) => {
  const { name, description, price, category, images: pictures } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id, {
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete product
router.delete("/", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await Product.findById(user_id);
    if (!user.isAdmin) return res.status(401).send("You don't have permission");
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get single product
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similarProducts = await Product.find({ category: product.category });
    res.status(200).json({ product, similarProducts });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

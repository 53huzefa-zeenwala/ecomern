const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/Order");

// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email already exists");
    }
    res.status(400).send(error.message);
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get user order
router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.status(200).json(user.orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update user notification
router.post("/:id/updateNotifications", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    user.notifications.forEach(notification => {
      notification.status = 'read'
    });
    user.markModified('notifications')
    await user.save()
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

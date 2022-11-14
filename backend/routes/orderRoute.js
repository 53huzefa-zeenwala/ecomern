const router = require("express").Router();
const User = require('../models/user')
const Order = require('../models/Order')

// const formatDate = (date) => {
    //     const hours = date.getHours()
    //     const minutes = date.getMinutes()
//     const ampm = hours
// }

// creating a order 
router.post('/', async (req, res) => {
    const io = req.app.get('socketio')
    const { userId, cart, country, address } = req.body
    try {
        const user = await User.findById(userId)
        const order = await Order.create({ owner: user._id, products: cart, country, address })
        order.count = cart.count
        order.total = cart.total
        await order.save()
        user.cart = { total: 0, count: 0 }
        user.orders.push(order)
        const notification = {status:  'unread', message: `New Order from ${user.name}`, time: new Date()}
        io.sockets.emit('new-order', notification)
        user.markModified('orders')
        await user.save()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json(error.message)
        
    }
})

// getting orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate('owner', ['email', 'name']);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id/mark-shipped", async (req, res) => {
    const io = req.app.get('socketio')
    const {id} = req.params
    const {ownerId} = req.body
    try {
        const user = await User.findById(ownerId)
        await Order.findByIdAndUpdate(id, {status: 'shipped'})
        const orders= await Order.find().populate('owner', ['email', 'name'])
        const notification = {status:  'unread', message: `Order ${id} shipped with success`, time: new Date()}
        io.sockets.emit('notification', notification, ownerId)
        user.notifications.push(notification)
        await user.save()
        console.log(user)
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router
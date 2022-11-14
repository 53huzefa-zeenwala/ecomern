const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("./connection");
const io = new Server(server, {
  cors: "://localhost:3000",
  method: ['GET', 'POST', "PATCH", 'DELETE'],
});

const User = require("./models/user");
const userRoute = require("./routes/userRoute");
const Product = require("./models/Product");
const productRoute = require("./routes/productRoute");
const imageRoute = require("./routes/imageRoute");
const orderRoute = require('./routes/orderRoute')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/images", imageRoute);
app.use("/orders", orderRoute);

app.post('/create-payment', async (req, res) =>  {
  const {amount} = req.body
  try {
    res.status(200).send(`payment successfully ${amount}`)
  } catch (error) {
    res.status(400).json(error.message)
    
  }
})

server.listen(8000, () => {
  console.log("server is connected at port 8000");
});

app.set("socketio", io);

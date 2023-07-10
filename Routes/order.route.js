const express = require("express");
const { OrderModel } = require("../Models/order.model");
OrderRouter = express.Router();
// const jwt = require("jsonwebtoken");
// const { authenticate } = require("../middlewares/authenticator");

// to add the post if user is login
OrderRouter.post("/api/orders", async (req, res) => {
    const payload = req.body;
  
    try {
      const product = new OrderModel(payload);
      await product.save();
      res.status(201).send({ msg: "New orders  has been Added in Database" });
    } catch (err) {
      res.status(404).send({ msg: "Not able to add Post" });
    }
  });




  OrderRouter.get("/api/orders/:id",async (req, res) => {
   
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, "masai");
    const { id } = req.params;
    try {
      const product = await OrderModel.find({_id: id }); //{userID:decoded.userID}
      res.status(200).send(product);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });













  module.exports={OrderRouter}
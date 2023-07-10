const express = require("express");
const { RestoModel } = require("../Models/resto.model");
RestoRouter = express.Router();
// const jwt = require("jsonwebtoken");
// const { authenticate } = require("../middlewares/authenticator");

// to add the post if user is login
RestoRouter.post("/add", async (req, res) => {
    const payload = req.body;
  
    try {
      const product = new RestoModel(payload);
      await product.save();
      res.status(200).send({ msg: "New Resto  has been Added in Database" });
    } catch (err) {
      res.status(404).send({ msg: "Not able to add Post" });
    }
  });

//   This endpoint should return a list of all available restaurants.

  RestoRouter.get("/api/restaurants",async (req, res) => {
   
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, "masai");
    try {
      const product = await RestoModel.find(); //{userID:decoded.userID}
      res.status(200).send(product);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });




//   This endpoint should return the details of a specific restaurant identified by its ID.

RestoRouter.get("/api/restaurants/:id",async (req, res) => {
   
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, "masai");
    const { id } = req.params;
    try {
      const product = await RestoModel.find({_id: id }); //{userID:decoded.userID}
      res.status(200).send(product);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });

//   This endpoint should return the menu of a specific restaurant identified by its ID.

RestoRouter.get("/api/restaurants/:id/menu", async (req, res) => {
    const { id } = req.params;
    try {
      const restaurant = await RestoModel.findById(id);
      
      if (!restaurant) {
        return res.status(404).send({ msg: "Restaurant not found" });
      }
  
      const menu = restaurant.menu;
      
      res.status(200).send(menu);
    } catch (err) {
      res.status(500).send({ msg: "Internal server error" });
    }
  });

//   This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.

RestoRouter.post("/api/restaurants/:id/menu", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
  
    try {
      const restaurant = await RestoModel.findById(id);
  
      if (!restaurant) {
        return res.status(404).send({ msg: "No restaurants found" });
      }
  
      const newMenuItem = {
        name: name,
        description: description,
        price: price,
        image: image
      };
  
      restaurant.menu.push(newMenuItem);
      await restaurant.save();
  
      res.status(201).send({ msg: "New menu item added successfully" });
    } catch (err) {
      res.status(500).send({ msg: "Internal server error" });
    }
  });


//   This endpoint should allow the user to delete a particular menu item identified 
// by its id from a specific restaurant.
  
RestoRouter.delete("/api/restaurants/:restaurantId/menu/:menuId", async (req, res) => {
    const { restaurantId, menuId } = req.params;
  
    try {
      const restaurant = await RestoModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).send({ msg: "Restaurant not found" });
      }
  
      const menuIndex = restaurant.menu.findIndex((menuItem) => menuItem._id.toString() === menuId);
  
      if (menuIndex === -1) {
        return res.status(404).send({ msg: "Menu item not found" });
      }
  
      restaurant.menu.splice(menuIndex, 1);
      await restaurant.save();
  
      res.status(200).send({ msg: "Menu item deleted successfully" });
    } catch (err) {
      res.status(500).send({ msg: "Internal server error" });
    }
  });













  module.exports={RestoRouter}
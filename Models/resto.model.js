const mongoose = require("mongoose");

const RestoSchema = mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
       
      name: String,
      description: String,
      price: Number,
      image: String
    }]
    
});

const RestoModel = mongoose.model("Resto", RestoSchema);
module.exports = { RestoModel };
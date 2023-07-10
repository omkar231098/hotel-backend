const express=require('express');
const cors=require("cors")

const { userRouter } = require("./Routes/user.route");
const {RestoRouter } = require("./Routes/resto.route");
const {OrderRouter } = require("./Routes/order.route");
const { connection } = require("./Configs/db");


const app=express();
app.use(express.json())
require("dotenv").config()
app.use(cors())



app.use("/", userRouter);

app.use("/", RestoRouter);

app.use("/", OrderRouter);



app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to MongoDb");
    } catch (err) {
      console.log("Not able to connected to MongoDb");
      console.log(err);
    }
  
    console.log(`Server is running on ${process.env.port}`);
  });
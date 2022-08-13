const express = require("express");
const orderdetails = require("../models/orderSchema");
const userSearch = require("../models/registerShema");
const router = express.Router();

//post the create order to the server side
router.post("/createOrder", (req, res) => {
  const now = new Date();
  const value = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const value1 = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const day = now.toLocaleDateString("en-Us", value);
  const time = now.toLocaleTimeString("en-Us", value1);
  const date = day + " " + time;
  try {
    const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    userSearch
      .find({ Email: user })
      .then((data) => {
        if (data.length) {
          orderdetails
            .create({
              userId: req.body.userId,
              orderId: req.body.orderId,
              dateTime: date,
              storeInfo: req.body.storeInfo,
              status: req.body.status,
              userAddress: req.body.userAddress,
              items: req.body.items,
              price: req.body.price,
            })
            .then(() => {
              res.status(200).send("added successfully");
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
        // console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).send("Unauthorize user", err);
  }
});
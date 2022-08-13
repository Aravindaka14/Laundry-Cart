const express = require('express');
const orderdetails = require('../Models/order');
const router = express.Router();

router.post("/createOrder",(req,res)=>{  
    const today = new Date()
    const option  = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    const option1 = {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }
    const day = today.toLocaleDateString("en-Us", option);
    const time = today.toLocaleTimeString("en-Us", option1);
    const date = day + " " + time;  
    orderdetails.create({ 
        userId : req.body.userId,
        orderId :req.body.orderId,
        dateTime : date,
        storeInfo : req.body.storeInfo,
       
        status : req.body.status,
        userAddress: req.body.userAddress,
        items : req.body.items,
        price: req.body.price
     }).then(()=>{
        res.status(200).send("added successfully")
            
    }).catch((err)=>{
        res.status(400).send(err)
    })
    
})
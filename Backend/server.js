const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerModals = require("./Schema/registerSchema/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();
const checkExistingMail = require("./reuseabaility");
const salt = 7;
const mongodb = process.env.ATLAS_URI
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.listen(3003,(err)=>{
    if(!err)
    console.log("Server started on port 3003");
    else
    {
        console.log("Server not started")
    }
});
mongoose.connect(mongodb,()=>{
    console.log("db connected");
},(err)=>{
    console.log("db not connected")
})
app.post("/register",async (req,res)=>{
    // console.log(req.body.signup.email)
    if (await checkExistingMail(req.body.signup.email))
    {
        res.status(403).send("Try with another email");
    }
    else
    {   
        bcrypt.genSalt(salt).then((hashsalt)=>{
        bcrypt.hash(req.body.signup.password,hashsalt).then((hashedpassword)=>{
            registerModals.create({username:req.body.signup.name,phoneno:req.body.signup.phoneno,district:req.body.signup.district,email:req.body.signup.email,address:req.body.signup.address,pincode:req.body.signup.pincode,password:hashedpassword,state:req.body.signup.state}).then((data)=>{
                res.status(200).send({message:"New user has registered"})
            }).catch((err)=>{
                res.status(404).send({message:"Try with different email id"})
            })
        })
       })
    }
})
//login using email and password
app.post("/login",(req,res)=>{
 
    registerModals.find({email:req.body.login.email}).then((userdata)=>{
        //console.log(userdata[0].password)
        if(userdata.length)
        {
             bcrypt.compare(req.body.login.password,userdata[0].password).then((val)=>{
               // console.log(process.env.key)
               if(val)
               {
                const authToken = jwt.sign(userdata[0].username,process.env.key);
                res.status(200).send({authToken});
               }
               else
               {
                res.status(400).send({message:"invalid password"})
               }
             })
             
        }else
        {
            res.status(401).send({message:"invalid username"})
        }
    })
})

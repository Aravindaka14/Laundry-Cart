import "./register.css"
import { useState } from "react";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const schema = yup.object().shape({
  name:yup.string().required("name is required"),
  email:yup.string().email().required(),
  phoneno:yup.string()
  .required("This field is Required")
  .matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Phone number is not valid"
  ),
  district:yup.string().required("District name is required"),
  pincode:yup.string()
  .required()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(6, 'Must be exactly 6 digits')
  .max(6, 'Must be exactly 6 digits'),
  address:yup.string().required("address is required"),
  state:yup.string().required("State required"),
  password: yup.string().min(4).max(17).required(),
})

const Register = ()=>
{
  const navi = useNavigate();
  const navigate = ()=>{
    navi("/")
   }
  const [error,Seterrorvalue] = useState();

  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver : yupResolver(schema)
  });
  const sendServer = (data)=>{
    console.log(data)
    axios({
      url:"http://localhost:3003/register",
      method:"POST",
      data:{signup:data}
    }).then((res)=>{
      if (res.status === 200) {
        window.location = "/" 
}
    }).catch((err)=>{
     // console.log(err.response.data)
    Seterrorvalue(err.response.data)
    })
  }

 //console.log(errors)

  return (<>
     <div id="header">
        <text id="Laundry">Laundry</text>
        <text id="home">Home</text>
        <text id="pricing">Pricing</text>
        <text id="career">Careers</text>
        <text id="signin">SignIn</text>
       </div>
       <div id="lef">
        <text id="account">Already Have Account</text>
       </div>
       <div id="btn">
       <button id="but" onClick={navigate}>Sign In</button>
       </div>
       <div id="divd">
       <div id="lan">
       <text id="le">Laundry Sevices</text>
       <h6></h6>
       </div>
       <div id="register">
        <text id="reg">Register</text>
        <div id="rt">
  <form onSubmit={handleSubmit(sendServer)} >
 <div id="row1">
 <input type="text" placeholder="Name" {...register("name")}></input>
 <p>{errors.name?.message}</p>
 <div id="space">
 <input type="email" placeholder="Email" name="email"{...register('email')}></input>
 <p>{errors.email?.message}</p>
 <p>{error}</p>
 </div>
 </div>
 <div id="row1">
 <input type="number" name="phoneno"{...register("phoneno")} placeholder="PhoneNumber"></input>
 <p>{errors.phoneno?.message}</p>
 <br></br>
 <div id="space">
 <input type="text" name ="state"{...register("state")} placeholder="State"></input>
 <p>{errors.state?.message}</p>
 </div>
 </div>
 <div id="row1">
 <input type="text" name="pincode" {...register("district")} placeholder="District"></input>
 <p>{errors.district?.message}</p>
 <br></br>
 <div id="space">
 <input type="text" name="address" {...register("address")} placeholder="Address"></input>
 <p>{errors.address?.message}</p>
 <br></br>
 </div>
 </div>
 <div id="row1">
 <input type="text" name="pincode" {...register("pincode")} placeholder="Pincode"></input>
 <p>{errors.pincode?.message}</p>
 <div id="space">
 <input type="password" name="password" {...register("password")} placeholder="Password"></input>
 <p>{errors.password?.message}</p>
 </div>
 </div>
 <div id="check">
 <input type="checkbox" required ></input>
 <text id="agree">I agree to Terms & Condition receiving marketing and promotional materials</text>
 </div>
 <button type="submit" id="sum">Register</button>
</form>
       </div>
       </div>
       </div>
       <hr id="hro"></hr>
       <text id="refer">Now Refer & Earn ₹500 for every referral*</text>
       <div>
       <text id="terms">* Terms and conditions will be applied</text>
       </div>
       <div id="footer">
        <div id="col1">
        <text id="about">About us</text>
        <text id="us">Doorstep Wash & Dryclean Service</text>
        </div>
        <div id="col1">
        <text id="hom">Home</text>
        <text id="l1">SignIn</text>
        <text id="l2">Register</text>
        </div>
        <text id="prices">Pricing</text>
        <div id="col1">
        <text id="careers">Careers</text>
        <text id="l3">Blogs</text>
        <text id="l4">Create</text>
        </div>
        <text id="contact">Contact</text>
        <div id="col1">
        <text id="social">Social Media</text>
        <div id="ig">
          <img src="facebook.jpg" alt="facebook" id="i1"></img>
          <img src="instagram.jpg" alt="facebook" id="i2"></img>
          <img src="linkedin.jpg" alt="facebook"></img>
        </div>
        </div>
       </div>
       
  
  
  
  </>)

}

export default Register;
/*
<form onSubmit={handleSubmit(sendServer)}>
<label >Name</label>
 <input type="text" placeholder="yourname" {...register("name")}></input>
 <p>{errors.name?.message}</p>
 <br></br>
 <label for="email">email</label>
 <input type="email" placeholder="abc@gmail.com" name="email"{...register('email')}></input>
 <p>{errors.email?.message}</p>
 <p>{error}</p>
 <br></br>
 <label for="phoneno">phoneNumber</label>
 <input type="number" name="phoneno"{...register("phoneno")}></input>
 <p>{errors.phoneno?.message}</p>
 <br></br>
 <label for="district">District</label>
 <input type="text" name ="district"{...register("district")}></input>
 <p>{errors.district?.message}</p>
 <br></br>
 <label for="pincode">Pincode</label>
 <input type="text" name="pincode" {...register("pincode")}></input>
 <p>{errors.pincode?.message}</p>
 <br></br>
 <label for="address">address</label>
 <input type="text" name="address" {...register("address")}></input>
 <p>{errors.address?.message}</p>
 <br></br>
 <label for="state">State</label>
 <input type="text" name="state" {...register("state")}></input>
 <p>{errors.state?.message}</p>
 <br></br>
 <label for="password">Password</label>
 <input type="password" name="password" {...register("password")}></input>
 <p>{errors.password?.message}</p>
 <br></br>
 <input type="submit"></input>
</form>
*/
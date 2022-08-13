import React from "react";
import "./body.css";
import home from "../assets/home-run.svg";
import list from "../assets/list.svg"
import more from "../assets/more.svg"
import search from "../assets/search.svg"


const Body =()=>{
   return( 
<body>
    <div className="column1">
        <ul className="navbar">
            <li> <img src={home} alt="" /></li>
            <li> <img src={more} alt="" /></li>
            <li> <img id="list" src={list} alt="" /></li>
        </ul>
    </div>
    <div className="column2">
        <h4>Orders | 0  <img src={search} alt="" /><input type="search" /> <a href="#createOrder">Create</a></h4>
        <table>
            <tr>
                <th>Order Id</th>
                <th> Order Date:Time</th>
                <th>Store Location</th>
                <th>City</th>
                <th>Store Phone</th>
                <th>Total items</th>
                <th>Price</th>
                <th>Status</th>
                <th>View</th>
            </tr>
        </table>
    </div>
</body>
)};

export default Body;
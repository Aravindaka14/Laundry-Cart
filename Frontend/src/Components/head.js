import React from "react"
import "./head.css"

const Head =()=>{
    return(
<header className="heading">
    <ul>
        <li id="laundry">LAUNDRY</li>
        <li ><a href="#Username" id="username">User Name</a></li>
        <li ><a href="#home" id="home">Home</a></li>
        <li ><a href="#pricing" id="pricing">Pricing</a></li>
    </ul>
</header>
    )
}
export default Head;
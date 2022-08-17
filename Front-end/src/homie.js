import axios from "axios"
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Head from "./head";
import Body from "./body";
import Footer from "./footer";
const Orders = ()=>
{
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken");
    useEffect(()=> {
        axios({
            method: "GET",
            url: "http://localhost:3003/homie",
            headers: {
                'Authorization': `${token}`
              }
        }).then((data)=> {
           // console.log(data.data.data[0].email);
           localStorage.setItem("email",data.data.data[0].email)
           localStorage.setItem("name",data.data.data[0].username)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    if(token)
    {
    return (
        <>
            <Head></Head>
            <Body></Body>
            <Footer></Footer>
        </>
    )
 } else {
     console.log("Authorization missing")
     navigate("/login")
     }

  
}
export default Orders;





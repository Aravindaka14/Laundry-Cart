import axios from "axios"
import { useEffect } from "react";
const Homie = ()=>
{
    const token = localStorage.getItem("authToken");
    useEffect(()=> {
        axios({
            method: "GET",
            url: "http://localhost:3003/homie",
            headers: {
                'Authorization': `${token}`
              }
        }).then((data)=> {
            console.log(data.data.data[0]);
        }).catch((err)=> {
            console.log(err)
        })
    }, [])
    return <>
     Homie works
    </>
}

export default Homie;


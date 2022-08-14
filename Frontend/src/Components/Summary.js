import React, { useState } from "react";
import axios from 'axios';
import ConfirmPop from "./confirmpop";
import './Summary.css';
const ProdSumary = (props) => {
    // console.log(props.orderDetails)
    const Token = localStorage.getItem("authorization")
    // console.log(Token)

    const [userData, setUserData] = useState([])
    const [storedetails,setstoredetails]=useState(false)
    console.log(userData)
    React.useEffect(() => {
        fetch("http://localhost:8000/login", {
            headers: {
                authorization: Token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.user)
                // console.log(data.user)
            });
    }, [Token]);
    

    //   console.log(userData[0].Address[0])
const orderId = Math.floor(1000 + Math.random() * 1000);
const [trigger, setTrigger] = useState(false);
const [orderFinalDetail, setOrderFinaldetail] = useState({
    dateTime: "",
    storeInfo: "",
    userAddress: "",
    status: "",
    items: "",
})
if (trigger) {
    return <ConfirmPop orderDone={setTrigger} />
}
let subTotal = 0, pickUpCharge = 90, total = 0;
props.orderDetails.forEach(item => {
    subTotal += Number(item.price)
})
total = subTotal + pickUpCharge;
const actions = [
    {
        name: "Jp Nagar",
        address: "Phone booth,10th Road",
        phone: "+91 9753855624"
    },
    {
        name: "GandhiBazar",
        address: "Near Khadi store",
        phone: "+91 9876543210"
    },
    {
        name: "JayaNagar",
        address: "Near Metro",
        phone: "+91 8972534160"
    }
]

//this works when the address is selected
const onAddressChange = (e) => {
    setstoredetails(true)
    setOrderFinaldetail(prevDetail => ({ ...prevDetail, storeInfo: e.target.value }))
}
//this invoke when user confirm 
const onClickButton = (e) => {
    // console.log(orderFinalDetail)
    e.preventDefault();
    //closeSumPg(false)
  
    // console.log(trigger);
    if(storedetails){
        axios({method:'POST',
        url:"http://localhost:8000/createOrder",
            data:{
                userId: userData[0].email,
                orderId: orderId,
                storeInfo:JSON.parse(orderFinalDetail.storeInfo),
                status: "Ready to pickup",
                userAddress: userData[0].Address[0],
                items: props.orderDetails,
                price: total
            }
        }).then((res) => {
            
           setTrigger("true");
       
          }).catch((err) => {
           console.log(err)
          })
    }
    else{
    alert("Please select store Location")
    }
       
    }
    return (
        <>
            <div id="summaryBox">
                <div id="pop">
                    <div className="sumHead">
                        <p className="sumPara"><b>Summary</b></p>

                        <button onClick={() => props.closeSumPg(false)} className="closeX"><b>X</b></button>
                    </div>
                    <div className="storeDetails">
                        <div className="location">
                            <p><b>Store Location</b></p>
                            <select name="address" onChange={onAddressChange} id="address">
                                <option value="none" selected disabled hidden className="disabled">Store Location</option>
                                {actions.map(store => (<option value={JSON.stringify(store)} key={store.name}>{store.name}</option>))}
                            </select>
                        </div>
                        <div className="storeAddress">
                            <p className="storeDetails"><b>Store Address</b></p>
                            <p className="storeDetails">{
                                orderFinalDetail.storeInfo !== "" ?
                                    JSON.parse(orderFinalDetail.storeInfo).address : "__"
                            }</p>
                        </div>
                        <div className="phone">
                            <p className="storeDetails"><b>PhoneNo.</b></p>
                            <p className="storeDetails">{
                                orderFinalDetail.storeInfo !== "" ?
                                    JSON.parse(orderFinalDetail.storeInfo).phone : "__"
                            }</p>
                        </div>
                    </div>
                    <div className="orderDetails">
                        <div className="order"><p><b>Order Detail</b></p></div>
                        <div id="OrderedInfo">{props.orderDetails.map(item => (<Totalorder info={item} key={item.name}
                            orderDetails={props.orderDetails} />))}</div>
                        <div id="price_foot">
                        <div className="sub_total">Sub total: <div className="Sub_val">{subTotal}</div></div>
                        <div className="pickUp">pickUp Charges: <div className="pickUp_val">{pickUpCharge}</div></div>
                        <div id="all_total_amout"><div className="All_amnt">Total:</div><div className="All_Total_val">{total}</div></div>
                        </div>
                    </div>
                    <div className="userAdd">
                        <p id="use_Add"><b>Address</b></p>
                        <div className="A-container">
                            <div className="add">
                                <p className="ho"><b>Home</b></p>
                                <div><img src="/images/tick.svg" alt=""></img></div>
                            </div>
                            <p className="add_u">#223, 10th road, Jp Nagar,<br></br>Bangalore</p>     
                            
                        </div>
                    </div>
                    <div className="button">
                        <button className="confirm" onClick={(e)=>onClickButton(e)} > Confirm </button>
                    </div>
                </div>
            </div>
        </>
    )
}









    


    


const Totalorder = (props) => {

    const washType = ["washing", "ironing", "dry-wash", "bleach"];
    return (
        <>
            <div id="product-cart">
                <div className="productType">{props.info.name}</div>
                <div className="washType">
                    {

                        props.orderDetails[0].washType.map((a, i) => {
                            return <i key={i}>{a ? `${washType[i]}, ` : ""}</i>;

                        })}
                </div>
                <div className="priceType">
                    <div className="price_type">
                        {(props.info.quantity) + "X" + Number(props.info.price) / Number(props.info.quantity) + "="}
                    </div>
                    <div className="price_total">{props.info.price}</div>

                </div>

            </div>

        </>
    )
}

export default ProdSumary;
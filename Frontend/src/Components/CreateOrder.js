import React from "react";
import { useState,useEffect } from "react";
import "./CreateOrder.css"
import Head from "./head";
import ProductItem from "./ProductTable";


import ProdSumary from "./Summary";


const CreateOrder= ()=>{
const [sumpop, setSumpopUp] = useState(false);
// const [trigger, setTrigger] =useState(false);
const productList = [
    {
      name: "Shirt",
      image: "shirts.jpg",
    },
    {
      name: "T-Shirts",
      image: "tshirts.jpg",
    },
    {
      name: "Trousers",
      image: "trousers.jpg",
    },
    {
      name: "Jeans",
      image: "jeans.jpg",
    },
    {
      name: "Boxers",
      image: "boxers.jpg",
    },
    {
      name: "Joggers",
      image: "joggers.jpg",
    },
    {
      name: "Others",
      image: "others.jpg",
  },
];
const initialVal ={};
for(let i=0; i<productList.length;i++){
  let name =productList[i].name;
  initialVal[name]={
    quantity :"",
    washType:[false, false, false, false],
    price :0,
  };
}
const [orderDetails ,setOrderDetails] = useState({initialVal});
const [modifyOrderDetail , setModifyOrderDetail] =useState([]);

const onProceed=()=>{
  if(modifyOrderDetail.length !==0){
    setSumpopUp(prevState =>({...prevState, sumpop:true}))
  }else{
    alert("Please Select some items")
  }
}
useEffect(()=>{
  //console.log(orderDetails)
  //console.log(modifyOrderDetail);
  setModifyOrderDetail([]);
  Object.keys(orderDetails).forEach(key => {
    // console.log(modifyOrderDetail);
    let obj ={};
    if(orderDetails[key].price !==0){
      obj.name =key;
      obj.price = orderDetails[key].price;
      obj.quantity = orderDetails[key].quantity;
      obj.washType = orderDetails[key].washType;
      setModifyOrderDetail(prevDetail =>([...prevDetail, obj]))
      //console.log(modifyOrderDetail);
    }

  })
},[orderDetails])
  return(
    <>
    <Head/>
    <div id="productPg">
      <div className="prodContain">
          <p className="txt">Create Order</p>
      </div>
    
      <div id="prodHead">
          <div id="headItem">
              <div id="item1">Product Type</div>
              <div id="item2">Quantity</div>
              <div id="item3">Wash Type</div>
              <div id="item4">Price</div>
          </div>
          {productList.map(item => (<ProductItem 
            info={item}
            key={item.name} 
            setOrderDetails={setOrderDetails}
            orderDetails={orderDetails}
            setModifyOrderDetail={setModifyOrderDetail}
            modifyOrderDetail={modifyOrderDetail}
           />))} 
         <div className="B-container">
              <button className="button">Cancel</button>
              <button className="button"onClick={() => onProceed()}>Proceed</button>
          </div>    

      </div>
    </div>
   
    {sumpop && <ProdSumary closeSumPg={setSumpopUp} orderDetails={modifyOrderDetail}/>}

    <footer/>
     
    </>
  )
}

 export default CreateOrder;
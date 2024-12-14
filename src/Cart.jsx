import React, { useContext, useEffect, useState } from 'react'
import { EcommContext } from './MainContext'

export default function Cart() {
  let {cart,setCart}=useContext(EcommContext)
  return (
    <div>
       <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        
        {cart.length>0 ? 
          cart.map((v,i)=>{
            return(
              <>
              <CartRow Data={v} index={i} key={i} />
              </>
            )
          })
         : 
         " No Data Add In Cart "}
       
        
       
          
        
      </div>
      <Total/>
      

    </div>
  </div>
    </div>
  )
}


let CartRow=({Data,index})=>{
  let {cart,setCart}=useContext(EcommContext)

  const [valuess,setValuess]=useState(Data.quantity || 1)

  let DecValues=()=>{ 
    if(valuess>1){
      setValuess(valuess-1)
    }
   
  }

  let updateObjValue=()=>{
      const valueUpdate=cart.filter((v,i)=>{
        if(i==index){
          return v.quantity=valuess
        }
        return v

      })
      setCart(valueUpdate)
  }

  useEffect(()=>{
    updateObjValue()
  },[valuess])


  return(
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
    <div className="flex w-2/5">
      <div className="w-20">
        <img className="h-24" src={Data.img} alt=""/>
      </div>
      <div className="flex flex-col justify-between ml-4 flex-grow">
        <span className="font-bold text-sm"> {Data.title} </span>
        <span className="text-red-500 text-xs">{Data.brand}</span>
        <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
      </div>
    </div>
    <div className="flex justify-center w-1/5">
      <svg onClick={DecValues} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
      </svg>

      <input className="mx-2 border text-center w-8" type="text" value={valuess}/>

      <svg onClick={()=>setValuess(valuess+1)} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
      </svg>
    </div>
    <span className="text-center w-1/5 font-semibold text-sm">$ {Data.price} </span>
    <span className="text-center w-1/5 font-semibold text-sm">$ {(Data.price*Data.quantity).toFixed(2)} </span>
  </div>
  )
}

let Total=()=>{
  let {cart,setCart}=useContext(EcommContext)

  const [totalAmount,setTotalAmount]=useState(0)

  let findaTotal=()=>{
    let sum=0
    cart.forEach((v,i)=>{
      sum+=(v.price*v.quantity)
    })

    setTotalAmount(sum)
  }

  useEffect(()=>{
    findaTotal()
  },[cart])


  return(
    <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items  {cart.length} </span>
          <span className="font-semibold text-sm"> {(totalAmount).toFixed(2)} $</span>
        </div>
       
        <div className='flex justify-between '>
            <div className=''> GST </div>
            <div className=''> 18 % </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>$ {((totalAmount*18/100)+(totalAmount)).toFixed(2)} </span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
  )
}
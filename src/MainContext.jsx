import React, {  createContext, useState } from 'react'

 export const EcommContext=createContext()

export default function MainContext({children}) {

    const [cart,setCart]=useState( [])
     
   const allData={cart,setCart}

  return (
   <EcommContext.Provider value={allData} >
        {children}
   </EcommContext.Provider>
  )
}

import React, { createContext, useState } from 'react'
export const addProductResponseContext=createContext()
export const editProductResponseContext=createContext()

function ContextShare({children}) {
    const [addProductResponse,setAddproductResponse]=useState({})
    const [editProductResponse,setEditproductResponse]=useState({})

  return (
    <>
    <addProductResponseContext.Provider value={{addProductResponse,setAddproductResponse}}>
<editProductResponseContext.Provider value={{editProductResponse,setEditproductResponse}}>
  
          {children}
          
</editProductResponseContext.Provider>
    </addProductResponseContext.Provider>
    </>
  )
}

export default ContextShare
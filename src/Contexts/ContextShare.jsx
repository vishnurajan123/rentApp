import React, { createContext, useState } from 'react'
export const addProductResponseContext=createContext()
export const editProductResponseContext=createContext()
export const addREquestResponseContext=createContext()
export const deleteRequestResponseContext=createContext()
export const addChatResponseContext=createContext()
function ContextShare({children}) {
    const [addProductResponse,setAddproductResponse]=useState({})
    const [editProductResponse,setEditproductResponse]=useState({})
    const [addRequestResponse,setAddRequestREsponse]=useState({})
    const [deleteRequestResponse,setDeleteRequestResponse]=useState({})
    const [addChatResponse,setAddChatResponse]=useState({})
    

  return (
    <>
    <addProductResponseContext.Provider value={{addProductResponse,setAddproductResponse}}>
<editProductResponseContext.Provider value={{editProductResponse,setEditproductResponse}}>
  <addREquestResponseContext.Provider value={{addRequestResponse,setAddRequestREsponse}}>
  <deleteRequestResponseContext.Provider value={{deleteRequestResponse,setDeleteRequestResponse}}>
   <addChatResponseContext.Provider value={{addChatResponse,setAddChatResponse}}>
        
                {children}
                
   </addChatResponseContext.Provider>
  </deleteRequestResponseContext.Provider>
  </addREquestResponseContext.Provider>
</editProductResponseContext.Provider>
    </addProductResponseContext.Provider>
    </>
  )
}

export default ContextShare
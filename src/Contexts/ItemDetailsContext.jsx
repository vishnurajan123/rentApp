import React, { createContext, useState } from 'react'
export const itemDetailResponsesContext=createContext()
function ItemDetailsContext({children}) {
    const [items,setItems]=useState({})
  return (
    <>
<itemDetailResponsesContext.Provider value={{items,setItems}}>
    
        {children}
        
</itemDetailResponsesContext.Provider>
    </>
  )
}

export default ItemDetailsContext
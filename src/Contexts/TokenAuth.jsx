import React, { createContext, useEffect, useState } from 'react'
export const tokenAutherizationContext=createContext()

function TokenAuth({children}) {
    const [isAutherized,setIsAutherized]=useState(false)
    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setIsAutherized(true)
      }
      else{
        setIsAutherized(false)
      }
    },[isAutherized])

  return (
    <>
    <tokenAutherizationContext.Provider value={{isAutherized,setIsAutherized}}>
        
        {children}
        
    </tokenAutherizationContext.Provider>
    </>
  )
}

export default TokenAuth
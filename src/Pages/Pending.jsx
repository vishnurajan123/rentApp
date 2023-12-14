import React, { useContext, useEffect, useState } from 'react'
import { allProductsAPI, userProductsAPI } from '../Services/allAPI'
import { addProductResponseContext, editProductResponseContext } from '../Contexts/ContextShare'
import PendingCard from '../Components/PendingCard'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Pending() {
    const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)
    const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)


    const [allproducts,setAllProducts]=useState([])
    const [searchKey,setSearchKey]=useState("")
    const [searchLoc,setSearchLoc]=useState("")
    // api calling
    const getUserProducts=async ()=>{
        if(sessionStorage.getItem("token")){
          const token=sessionStorage.getItem("token")
           const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result=await userProductsAPI(reqHeader)
          if(result.status===200){
            setAllProducts(result.data.filter(item=>item.status=="pending" || item.status=="rejected" ))
          }
          else{
            console.log(result);
            alert(result.response.data)
          }
        }
      }

    useEffect(()=>{
        // api call
        getUserProducts()
    },[editProductResponse,addProductResponse])
  return (
    <>
     <Header/>
     <h1 className='exp '> <span style={{color:"orange"}}>|</span> Pening uploads</h1>

<div className='d-flex justify-content-evenly flex-wrap mt-5 pt-5'>
    {
        allproducts.length>0?allproducts.map(product=>(

            <PendingCard product={product} />
        ))
        : <img width={"200px"} src="https://static.thenounproject.com/png/4532229-200.png" alt="" />
    }

</div>
    <Footer/>
    


    </>
  )
}

export default Pending
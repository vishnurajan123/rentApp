import React, { useContext, useEffect, useState } from 'react'
import './MyProducts.css'
import ItemCard from './ItemCard'
import Add from './Add'
import { userProductsAPI } from '../Services/allAPI'
import { addProductResponseContext, editProductResponseContext } from '../Contexts/ContextShare'

function MyProducts() {
  const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)

  const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)
  const insideMyproduct=true
  const [userProducts,setUserproducts]=useState([])
  const getUserProducts=async ()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")
       const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result=await userProductsAPI(reqHeader)
      if(result.status===200){
        setUserproducts(result.data)
      }
      else{
        console.log(result);
        alert(result.response.data)
      }
    }
  }

 useEffect(()=>{
  getUserProducts()
 },[addProductResponse,editProductResponse])

 console.log(userProducts);

  return (
    <div>
        <h1 className='mt-5 text-center'>My Projects</h1>
        <div className='d-flex justify-content-center p-5'>
            
            <Add/>
    
        </div>
        <div className='d-flex justify-content-evenly'>
          {
            userProducts?.length>0?userProducts.map(product=>(
<ItemCard insideMyproduct={insideMyproduct} product={product} />
            )): <p>Nothing to Display</p>

          }

            
            


        </div>


    </div>
  )
}

export default MyProducts
import React, { useContext, useEffect, useState } from 'react'
import './MyProducts.css'
import ItemCard from './ItemCard'
import Add from './Add'
import { userProductsAPI } from '../Services/allAPI'
import { addProductResponseContext, editProductResponseContext } from '../Contexts/ContextShare'
import { Link } from 'react-router-dom'

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
        setUserproducts(result.data.filter(item=>item.status=="approved"))
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


  return (
    <div>
<h1 className='exp'> <span style={{color:"orange"}}>|</span> My Uploads</h1>
        <div className='d-flex justify-content-center p-5 flex-wrap'>
            
            <Add/>
            <Link to={'/pending'}>
              
              <button className='rq ms-lg-3 mt-3'>Pending requests</button>
            </Link>
    
        </div>
        <div className='d-flex justify-content-evenly flex-wrap'>
          {
            userProducts?.length>0?userProducts.map(product=>(
<ItemCard insideMyproduct={insideMyproduct} product={product} />
            )): <img src="https://static.thenounproject.com/png/4532229-200.png" alt="" />
          }

            
            


        </div>


    </div>
  )
}

export default MyProducts
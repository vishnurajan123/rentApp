import React, { useContext, useState } from 'react'
import { BASE_URL } from '../Services/baseURL'
import Editproduct from './Editproduct'
import { deleteProductAPI } from '../Services/allAPI'
import { addProductResponseContext } from '../Contexts/ContextShare'
import { Link } from 'react-router-dom'

function PendingCard({product}) {
    const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)
    const [id,setId]=useState("657887a1b3ac93d7c22877d5")

    const deleteProduct=async(productId)=>{

        const token=sessionStorage.getItem("token")
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result=await deleteProductAPI(productId,reqHeader)
        if(result.status===200){
          // page reload 
          setAddproductResponse(result.data)
        }
        else{
          console.log(result);
          console.log(result.response.data);
        }
      }
  return (
    <>
    <div  className='itemcard m-4'>
        
        <img width={"100%"} src={`${BASE_URL}/uploads/${product?.productImage}`} alt="" />
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <h4 className='text-center'>{product?.title}</h4>
          <h4>Status : {product?.status}</h4>
         


         <h5 className='text-center'>

         
         </h5>
        
  
            <div className='d-flex '>
              <Editproduct product={product} />
              <button onClick={()=>deleteProduct(product._id)} className='btn'><i style={{color:"orangered"}} class="fa-solid fa-trash fa-2x"></i></button>
              <Link to={`/chat/${id}`}>
      <button className='btn '><i style={{color:"black"}} class="fa-solid fa-message fa-2x mt-1"></i></button></Link>
            </div>

           
        </div>
    </div>


    </>
  )
}

export default PendingCard
import React, { useContext, useEffect } from 'react'
import './ItemCard.css'
import { BASE_URL } from '../Services/baseURL'
import Editproduct from './Editproduct'
import { deleteProductAPI } from '../Services/allAPI'
import { addProductResponseContext } from '../Contexts/ContextShare'
import { Link, useNavigate } from 'react-router-dom'
import { itemDetailResponsesContext } from '../Contexts/ItemDetailsContext'


function ItemCard({product,insideMyproduct}) {
const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)
const {items,setItems}=useContext(itemDetailResponsesContext)

 const navigate=useNavigate()
  const deleteProduct=async(productId)=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteProductAPI(productId,reqHeader)
    if(result.status===200){
      alert("item deleted successfully")
      // page reload 
      setAddproductResponse(result.data)
    }
    else{
      console.log(result);
      console.log(result.response.data);
    }
  }
  

  useEffect(()=>{
    
  })

  return (
    <>
   {
   
   product&&

    
      <div  className='itemcard m-4'>
        
          <img width={"100%"} src={`${BASE_URL}/uploads/${product?.productImage}`} alt="" />
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <h4 className='text-center'>{product?.title}</h4>
            <h4 className='text-center'>RENT : $ {product?.rent}</h4>
           <div className='d-flex justify-content-center container'>
                
                <h5>Location : {product?.place}</h5>
           </div>
  
  
           <h5 className='text-center'>
  
           
           </h5>
           {
              insideMyproduct?
    
              <div className=''>
                <Editproduct product={product} />
                <button onClick={()=>deleteProduct(product._id)} className='btn'><i style={{color:"orangered"}} class="fa-solid fa-trash fa-2x"></i></button>
              </div>

              : <Link to={`/details/${product?._id}`}> <button className='dt'>View details</button></Link>
    
           }
          </div>
      </div>
    
    }
    
    </>
  )
}

export default ItemCard
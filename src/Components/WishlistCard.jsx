import React, { useContext } from 'react'
import { BASE_URL } from '../Services/baseURL';
import { List } from '@mui/material';
import { deleteWishlistAPI } from '../Services/allAPI';
import { addChatResponseContext, addWishlistResponseContext } from '../Contexts/ContextShare';
import { Link } from 'react-router-dom';

function WishlistCard({product}) {
    const {addWishlistResponse,setAddwishlistResponse}=useContext(addWishlistResponseContext)


    const wishlist=JSON.parse(product.product)
    const deleteWishlist=async(id)=>{
        const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteWishlistAPI(id,reqHeader)
    if(result.status==200){
        setAddwishlistResponse(result.data)   
     }
    else{
        console.log(result);
        console.log(result.response.data);
    }

    }
  return (
    <div>
 <div  className='itemcard mt-4 mb-4'>
        
        <img width={"100%"} src={`${BASE_URL}/uploads/${wishlist?.productImage}`} alt="" />
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <h4 className='text-center'>{wishlist?.title}</h4>
          <h4 className='text-center'>RENT : $ {wishlist?.rent}</h4>
         <div className='d-flex justify-content-center container'>
              
              <h5>Location : {wishlist?.place}</h5>
         </div>


         <h5 className='text-center'>

         
         </h5>
         <div className='d-flex justify-content-evenly'>
             
             <Link to={`/details/${wishlist?._id}`}> <button className='dt me-2'>View details</button></Link>
             <button onClick={()=>deleteWishlist(product._id)} style={{color:"red"}} className='btn p-0'><i class="fa-solid fa-trash fa-2x"></i></button>
      
         </div>
         
        </div>
    </div>
  
      

    </div>
  )
}

export default WishlistCard
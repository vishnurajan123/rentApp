import React, { useContext } from 'react'
import { addWishlistAPI } from '../Services/allAPI'
import { addWishlistResponseContext } from '../Contexts/ContextShare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddWishlist({product}) {
    const {addWishlistResponse,setAddwishlistResponse}=useContext(addWishlistResponseContext)

    const handleAddWishlist=async()=>{
        const reqBody=new FormData()
        reqBody.append("product",JSON.stringify(product))

        const token=sessionStorage.getItem("token")
        if(token){
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }

              const result=await addWishlistAPI(reqBody,reqHeader)
              if(result.status===200){
                toast.success("wishlist added successfully")
                setAddwishlistResponse(result.data)
              }else{
                console.log(result);
                console.log(result.response.data);
              }
              
        }

    }


  return (
    <>
      <div>
  
          <button onClick={handleAddWishlist} className='rq'>Add to wishlist</button>
      </div>
              < ToastContainer position='top-right' theme='colored'/>
  
    </>
  )
}

export default AddWishlist
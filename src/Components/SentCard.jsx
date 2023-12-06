import React, { useContext } from 'react'
import { BASE_URL } from '../Services/baseURL'
import { deleteRequestAPI } from '../Services/allAPI'
import { deleteRequestResponseContext } from '../Contexts/ContextShare'
import { Link } from 'react-router-dom'
import './SentCard.css'

function SentCard({product,index}) {
const {deleteRequestResponse,setDeleteRequestResponse}=useContext(deleteRequestResponseContext)
    const productDetails=JSON.parse(product.product)
const deleteRequest=async(requestId)=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteRequestAPI(requestId,reqHeader)
    if(result.status===200){
        alert("item deleted successfully")
        // reload page
        setDeleteRequestResponse(result.data)
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}


  return (
    <>
    
    <div className='d-flex justify-content-evenly flex-wrap crd'>

      <div >
      <img width={"150px"} height={"150px"} src={`${BASE_URL}/uploads/${productDetails?.productImage}`} alt="no image" />  

      </div>
      <div className='crd-text'>
<h5>  Name :  {productDetails?.title}
</h5>
<h5> Place :
{productDetails?.place}

</h5>
<h5> Ph :
{productDetails?.contact}

</h5>

<div>
<button onClick={()=>deleteRequest(product._id)} className='btn '><i style={{color:"orangered"}} class="fa-solid fa-trash fa-2x"></i></button>
<Link to={`/chat/${productDetails.userId}`}>
            <button className='btn '><i style={{color:"black"}} class="fa-solid fa-message fa-2x mt-1"></i></button></Link>
</div>


      </div>


</div>


  
    
    </>
  )
}

export default SentCard
import React, { useContext } from 'react'
import { BASE_URL } from '../Services/baseURL'
import { deleteRequestAPI } from '../Services/allAPI'
import { deleteRequestResponseContext } from '../Contexts/ContextShare'
import { Link } from 'react-router-dom'

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
    
    <div style={{width:"100%"}}>

    <tr>
  <th>
    {index+1}
  </th>
  <th>
<img width={"100px"} src={`${BASE_URL}/uploads/${productDetails?.productImage}`} alt="no image" />  </th>
  <th>
    {productDetails?.title}
  </th>
  <th>
    {productDetails?.place}
  </th>
  <th>
    {productDetails?.contact}
  </th>
  <th>
   <div className='d-flex flex-column'>
        
        <button onClick={()=>deleteRequest(product._id)} className='btn '>delete</button>
<Link to={`/chat/${productDetails.userId}`}>
            <button className='btn '>chat</button>
    
</Link>   </div>

  </th>

</tr>
        
    </div>
    
    
    </>
  )
}

export default SentCard
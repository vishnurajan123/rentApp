import React, { useContext } from 'react'
import { BASE_URL } from '../Services/baseURL'
import { deleteRequestAPI } from '../Services/allAPI'
import { addREquestResponseContext, deleteRequestResponseContext } from '../Contexts/ContextShare'
import { Link } from 'react-router-dom'

function RecieveCard({product,index}) {
  const {addRequestResponse,setAddRequestREsponse}=useContext(addREquestResponseContext)

    const productDetails=JSON.parse(product.product)
    const userDetails=JSON.parse(product.userDetails)

const deleteRequest=async(requestId)=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteRequestAPI(requestId,reqHeader)
    if(result.status===200){
        // reload page
        setAddRequestREsponse(result.data)
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}

  return (
    <>
    





    <div className='d-flex justify-content-evenly flex-wrap crd mb-3'>

<div className='d-flex justify-content-center align-items-center'>
<img width={"150px"} height={"150px"} src={`${BASE_URL}/uploads/${productDetails?.productImage}`} alt="no image" />  

</div>
<div className='crd-text'>
<h5>  Name :  {productDetails?.title}
</h5>
<h5> User :
{userDetails?.username}

</h5>
<h5> Place :
{userDetails?.place}

</h5>
<h5> Email :
{userDetails?.email}

</h5>
<h5> Phone :
{userDetails?.phone}

</h5>

<div>
<button onClick={()=>deleteRequest(product._id)} className='btn '><i style={{color:"red"}} class="fa-solid fa-trash fa-2x"></i></button>
<Link to={`/chat/${userDetails._id}`}>
      <button className='btn '><i style={{color:"black"}} class="fa-solid fa-message fa-2x mt-1"></i></button></Link>
</div>


</div>


</div>



    
    
    </>
  )
}

export default RecieveCard
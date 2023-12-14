import React, { useContext } from 'react'
import './UploadRequestCard.css'
import { BASE_URL } from '../Services/baseURL'
import { Link } from 'react-router-dom'
import { editProductAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProductResponseContext } from '../Contexts/ContextShare'

function UploadRequestCard({product}) {
    const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)



    
    const handleApprove= async()=>{
        const {_id,title,category,overview,rent,place,contact,loc,productImage,userId,status}=product

            
            const reqBody=new FormData()
            reqBody.append("title",title)
            reqBody.append("category",category)
            reqBody.append("overview",overview)
            reqBody.append("rent",rent)
            reqBody.append("place",place)
            reqBody.append("contact",contact)
            reqBody.append("loc",loc)    
            reqBody.append("productImage",productImage)
            reqBody.append("userId",userId)    
            reqBody.append("status","approved")



            const token=sessionStorage.getItem("token")
           
                const reqHeader={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                //   api call
                const result=await editProductAPI(_id,reqBody,reqHeader)
                if(result.status===200){
                    toast.info("Product approved ...")
                    // pass response to my products
                    setEditproductResponse(result.data)

                }
                else{
                    console.log(result);
                    console.log(result.response.data)
                }
    }

    const handleReject= async()=>{
      const {_id,title,category,overview,rent,place,contact,loc,productImage,userId,status}=product

          
          const reqBody=new FormData()
          reqBody.append("title",title)
          reqBody.append("category",category)
          reqBody.append("overview",overview)
          reqBody.append("rent",rent)
          reqBody.append("place",place)
          reqBody.append("contact",contact)
          reqBody.append("loc",loc)    
          reqBody.append("productImage",productImage)
          reqBody.append("userId",userId)    
          reqBody.append("status","rejected")



          const token=sessionStorage.getItem("token")
         
              const reqHeader={
                  "Content-Type":"application/json",
                  "Authorization":`Bearer ${token}`
                }
              //   api call
              const result=await editProductAPI(_id,reqBody,reqHeader)
              if(result.status===200){
                  toast.info("Product approved ...")
                  // pass response to my products
                  setEditproductResponse(result.data)

              }
              else{
                  console.log(result);
                  console.log(result.response.data)
              }
  }



  return (
    <div className='uploadcard'>

        <div className='d-flex justify-content-center align-items-center'>
        <img width={"100%"} src={`${BASE_URL}/uploads/${product?.productImage}`} alt="" />

        </div>
        <div>
            <h5>Title: {product?.title}</h5>
            <h5>Category: {product?.category}</h5>
            <p className='ppp'>Overview: {product?.overview}</p>
            <h5>Rent: {product?.rent}</h5>
            <h5>Place: {product?.place}</h5>
            <h5>Contact: {product?.contact}</h5>
            <p className='ppp'>Location : <a className='text-primary' href={product?.loc} target='_blank'><h5>Click here</h5></a></p>



        <div className='d-flex'>
            <button onClick={handleApprove} className='btn btn-primary'>Approve</button>
            <button onClick={handleReject} className='ms-2 btn btn-danger'>Reject</button>
            <Link to={`/chat/${product?.userId}`}>
      <button className='btn '><i style={{color:"black"}} class="fa-solid fa-message fa-2x mt-1"></i></button></Link>
        </div>

        </div>


        < ToastContainer position='top-right' theme='colored'/>

    </div>
  )
}

export default UploadRequestCard
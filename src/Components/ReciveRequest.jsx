import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getRequestAPI } from '../Services/allAPI'
import SentCard from './SentCard'
import { addREquestResponseContext, deleteRequestResponseContext } from '../Contexts/ContextShare'
import RecieveCard from './ReciveCard'

function RecieveRequest() {
    const {addRequestResponse,setAddRequestREsponse}=useContext
    (addREquestResponseContext)
    const {deleteRequestResponse,setDeleteRequestResponse}=useContext(deleteRequestResponseContext)
    const [requests,setRequests]=useState([])

    const getRequests=async()=>{
        const result=await getRequestAPI()
        if(result.status===200){
            const user=JSON.parse(sessionStorage.getItem("existingUser"))

            setRequests(result.data.filter(item=>item.recieverId==user._id))
        }
        else{
            console.log(result);
        console.log(result.response.data);
        }

    }

    useEffect(()=>{
        getRequests()
      },[addRequestResponse,deleteRequestResponse])
      console.log(requests);

  return (

    <>
<Header/>
    <div className='d-flex justify-content-center align-items-center container flex-column'>
    <table style={{width:"100%"}}>


        {

            requests?.length>0?requests.map((product,index)=>(
  
    <RecieveCard product={product} index={index} />

  

            )) : <p>nothing to display</p>
        }
</table>

    

    </div>
    
    <Footer/>
    </>
  )
}

export default RecieveRequest
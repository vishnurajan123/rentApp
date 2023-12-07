import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getRequestAPI } from '../Services/allAPI'
import { addREquestResponseContext } from '../Contexts/ContextShare'
import RecieveCard from './ReciveCard'

function RecieveRequest() {
    const {addRequestResponse,setAddRequestREsponse}=useContext(addREquestResponseContext)
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
      },[addRequestResponse])

  return (

    <>
<Header/>

    <div className='d-flex justify-content-evenly container flex-wrap mt-5 pt-5 mb-5'>


        {

            requests?.length>0?requests.map((product,index)=>(
  
    <RecieveCard product={product} index={index} />

  

            )) : <img src="https://static.thenounproject.com/png/4532229-200.png" alt="" />
        }

    

    </div>
    
    <Footer/>
    </>
  )
}

export default RecieveRequest
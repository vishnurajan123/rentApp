import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import { addChatAPI, getMessageAPI } from '../Services/allAPI'
import { addChatResponseContext } from '../Contexts/ContextShare'


function Chat() {
    const {addChatResponse,setAddChatResponse}=useContext(addChatResponseContext)

    const {id}=useParams()

    const [message,setMessage]=useState("")
    const [chat,setChat]=useState([])
    const user=JSON.parse(sessionStorage.getItem("existingUser"))
        const id1=user._id

    const addChat=async()=>{
       

        const reqBody=new FormData()
        reqBody.append("id1",id1)
        reqBody.append("id2",id)
        reqBody.append("senderId",id1)
        reqBody.append("message",message)

        const token=sessionStorage.getItem("token")
        if(token){
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }

              const result=await addChatAPI(reqBody,reqHeader)
              if(result.status==200){
                setAddChatResponse(result.data)
              }
              else{
                console.log(result);
                console.log(result.response.data);
              }

            }

    }

    const getChat=async()=>{
        const result=await getMessageAPI()
        if(result.status==200){
            setChat(result.data.filter(item=>item.id1==id1&&item.id2==id || item.id1==id&&item.id2==id1))
        }
        else{
            console.log(result);
        console.log(result.response.data);
        }
    }

useEffect(()=>{
    getChat()
},[addChatResponse])
console.log(chat);
  return (
    <>

    <Header/>



    <div className='container w-50'>
{chat?.length>0?chat.map(text=>(

text.senderId==id1?

<p style={{textAlign:"right"}}>
{text?.message}

</p>:
<p style={{textAlign:"left"}}>
{text?.message}

</p>




)) : <p></p>



}


    </div>


    <div className='d-flex justify-content-center align-items-center'>
        <textarea onChange={(e)=>setMessage(e.target.value)} name="" id="" cols="70" rows="4"></textarea>
        <button onClick={addChat} className='btn btn-dark'>send</button>
    </div>
    <Footer/>
    
    
    </>
  )
}

export default Chat
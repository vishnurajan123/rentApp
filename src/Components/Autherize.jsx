import React, { useState } from 'react'
import './Autherize.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../Services/allAPI';
import {  useNavigate } from 'react-router-dom'



function Autherize() {
    const [isRegister,setIsRegister]=useState(false)
    const [userdata,setUserdata]=useState({
      username:"",
      email:"",
      password:"",
      place:"",
      phone:""
    })

    const naviagate=useNavigate()

  const handleRegister=async (e)=>{
    e.preventDefault()
    const {username,email,password,place,phone}=userdata
    if(!username || !email || !password || !place || !phone){
      alert("Please fill the form completely")
    }
    else{
      const result=await registerAPI(userdata)
      if(result.status===200){
        alert(`${username} has registered successfully`)
        setUserdata({
          username:"",
      email:"",
      password:"",
      place:"",
      phone:""
        })
        setIsRegister(false)
      }
      else{
        alert(result.response.data)
        console.log(result);
      }
    }
  }
const handleLogin=async (e)=>{
  e.preventDefault()
  const {email,password}=userdata
  if(!email || !password){
    alert("Please fill the form completely")
  }
  else{
    const result=await loginAPI(userdata)
    if(result.status===200){
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      setUserdata({
        email:"",
        password:""
      })
      naviagate('/landing')
    }
    else{
      alert(result.response.data)
      console.log(result);
    }
  }

}


  return (
    <div className='auth'> 
<h3 className='text-black text-center'>Please {isRegister?"Register":"Login"}</h3>
<Form>
  {  isRegister&&
<Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control value={userdata.username} onChange={(e)=>setUserdata({...userdata,username:e.target.value})} type="text" placeholder="Enter Username" />
        
      </Form.Group>}
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email"
        onChange={(e)=>setUserdata({...userdata,email:e.target.value})} value={userdata.email}   />
        
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" 
        onChange={(e)=>setUserdata({...userdata,password:e.target.value})} 
        value={userdata.password} 
        />
      </Form.Group>
      {  isRegister&&
<>
  
  <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control type="number" placeholder="Phone" 
          onChange={(e)=>setUserdata({...userdata,phone:e.target.value})} 
          value={userdata.phone} 
          />
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control type="text" placeholder="Place"
        onChange={(e)=>setUserdata({...userdata,place:e.target.value})} 
        value={userdata.place} 
        />
        
      </Form.Group>
</>
    
    }
      
      <p className='text-center'>

{isRegister?
          <Button onClick={handleRegister} variant="primary" type="submit">
            Register
          </Button>:
           <Button onClick={handleLogin} variant="primary" type="submit">
           Login
         </Button>
          }



      </p>
    </Form>
{
isRegister?
<h5 > Already have an accound ? <a onClick={()=>setIsRegister(false)} className='' style={{cursor:"pointer"}} >Login</a> </h5>

:
    <h5 > Don't have an accound ? <a onClick={()=>setIsRegister(true)} className='' style={{cursor:"pointer"}} >Register</a> </h5>

}
    </div>
  )
}

export default Autherize
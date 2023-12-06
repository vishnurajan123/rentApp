import React, { useState } from 'react'
import './Autherize.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../Services/allAPI';
import {  Link, useNavigate } from 'react-router-dom'
import ducati from '../assets/carr.jpg'
import flat from '../assets/flat.jpg'
import ferrari from '../assets/ferrari.jpg'







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


<>
<div className=''>
  
      <div className='main'>

            <div className='main-text '>

                      <h1 className='cr-head'>
                  Rent the <br /> <span >Best Products</span> <br /> Around You
                    </h1>
                    <a href='#log'><button className='' >Get Started</button></a>
            </div>

            <div className='main-img'>
              <img width={"100%"} src={ducati} alt="" />
            </div>


       </div>


      

      

       
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
    
    
    <div id='log' className='d-flex justify-content-center align-items-center  pb-5 pt-5 position-sticky bg-white z-3'>
      
           <div className='log'>
        
            <div  className='auth'> 
        <h3 className='text-black text-center'> <span>{isRegister?"Register":"Login"} </span>Here</h3>
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
                  <button onClick={handleRegister} variant="primary" type="submit">
                    Register
                  </button>:
                   <button onClick={handleLogin} variant="primary" type="submit">
                   Login
                 </button>
                  }
        
        
        
              </p>
            </Form>
        {
        isRegister?
        <h5 className='text-center'> Already have an accound ? <a onClick={()=>setIsRegister(false)} className='' style={{cursor:"pointer",textDecoration:"none"}} ><span>Login</span></a> </h5>
        
        :
            <h5 className='text-center' > Don't have an accound ? <a onClick={()=>setIsRegister(true)} className='' style={{cursor:"pointer",textDecoration:"none"}} ><span>Register</span></a> </h5>
        
        }
            </div>
  
    
           </div>
    </div>
</div>
  


<div className='d-flex justify-content-center align-items-center flex-column mt-2 shadow w-100 bg-black'>
            <div className='footer-content justify-content-evenly flex-wrap w-100 mt-5' style={{ display: 'flex' }}>
                <div className='website d-flex flex-column' style={{paddingLeft:'50px'}}>
                    <div style={{ fontWeight: 'bold',color:"white" }}>{' '}Rent-App</div>
                    <div className='content text-light'>
                        Designed and built with all the love .</div>
                    <div className='text-light'>Code licensed Media, docs CC BY 3.0.</div>
                    <div className='text-light'>Currently v1.0.0.</div>
                </div>
                
                <div className='guides d-flex flex-column'  style={{paddingLeft:'50px'}}>
                    <div style={{ fontWeight: 'bold',color:"white" }}>Guides</div>
                    <div className='d-flex flex-column'>
                        <Link to={'https://react.dev/'} style={{ textDecoration: 'none', color: 'white' }}>React</Link>
                        <Link to={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</Link>
                        <Link to={'https://reactrouter.com/en/main'} style={{ textDecoration: 'none', color: 'white' }}>Routing</Link>

                    </div>

                </div>
                <div className='contact d-flex flex-column ' style={{paddingLeft:'50px' ,paddingRight:'50px'}}>
                    <div style={{ fontWeight: 'bold',color:"white" }}>Contact Us</div>
                    <div className='d-flex'>
                        <input type="text" className='rounded'/>
                        <button type="button" class="btn btn-primary rounded ms-2">Search</button>
                    </div>
                    <div>
                        <Link to={'/'} className='mx-2' style={{ textDecoration: 'none', color:'white' }}><i class="fa-brands fa-linkedin" style={{ color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-twitter" style={{ textDecoration: 'none', color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-facebook-f" style={{ textDecoration: 'none', color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-2' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-regular fa-envelope" style={{ textDecoration: 'none', color: 'black' }}></i></Link>

                    </div>
                </div>

            </div>
            <p className='mt-5'>Copyright © 2023 Media Player. Built with React.</p>
        </div>
  
</>

  )
}

export default Autherize
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css'
import { useContext, useState } from 'react';
import { tokenAutherizationContext } from '../Contexts/TokenAuth';

function Header({insideDashboard}) {
  const {isAutherized,setIsAutherized}=useContext(tokenAutherizationContext)
  
  const navigate=useNavigate()

  var admin=false
  const handleLogout=()=>{
    // remove all existing user details from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAutherized(false)
    admin=false
    // naviagte to landing page
    navigate('/')

    
    

  }

  const user=JSON.parse(sessionStorage.getItem("existingUser"))
    if(user.role=="admin"){
      admin=true
    }

    console.log(admin);
  return (
    <div className='nnn'>
      
      <nav class="navbar navbar-expand-lg bg-black w-100">
      <div class="container-fluid ">
        <Link to={'/landing'} class="navbar-brand text-light rentblitz" >RentBlitz</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to={'/landing'} class="nav-link active  me-4 nav-txt" style={{color:"rgb(255, 153, 0)",fontWeight:"600"}}  aria-current="page" >Home</Link>
            </li>
            
           { 

           admin?
<>
  
             <li class="nav-item me-4">
             <Link style={{color:"rgb(255, 153, 0)",fontWeight:"600"}} to={'/viewuploadrequest'}  class="nav-link active " >View Upload Requests</Link>
           </li>
  
          
           
</>
         :


           <>
               
             <li class="nav-item dropdown me-4">
                <a style={{color:"rgb(255, 153, 0)",fontWeight:"600"}} class="nav-link active dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Requests
                </a>
                <ul class="dropdown-menu">
                  <li><Link to={'/sendrequests'} class="dropdown-item text-black"   >Sent</Link></li>
                  <li><Link to={'/recieverequest'} class="dropdown-item text-black" >Recieved</Link></li>
                  
                </ul>
              </li>
              
              <li class="nav-item me-4">
                <Link style={{color:"rgb(255, 153, 0)",fontWeight:"600"}} to={'/wishlist'}  class="nav-link active " >Wishlist</Link>
              </li>
    
              <li class="nav-item me-4">
                <Link to={'/dashboard'} class="nav-link active " ><i class="fa-solid fa-user fa-2x user"></i></Link>
              </li>
            </>
            
           }
          </ul>
          <button onClick={handleLogout} className='logout'>Logout</button>
          
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Header;
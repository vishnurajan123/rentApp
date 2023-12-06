import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css'

function Header({insideDashboard}) {
  return (
    <nav class="navbar navbar-expand-lg bg-black">
    <div class="container-fluid">
      <Link to={'/landing'} class="navbar-brand text-light rentblitz" >RentBlitz</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link to={'/landing'} class="nav-link active text-light me-4" aria-current="page" >Home</Link>
          </li>
          
          <li class="nav-item dropdown me-4">
            <a class="nav-link active dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Requests
            </a>
            <ul class="dropdown-menu">
              <li><Link to={'/sendrequests'} class="dropdown-item text-black"  >Sent</Link></li>
              <li><Link to={'/recieverequest'} class="dropdown-item text-black" >Recieved</Link></li>
              
            </ul>
          </li>
          
          <li class="nav-item me-4">
            <Link to={'/wishlist'}  class="nav-link active text-light" >Wishlist</Link>
          </li>

          <li class="nav-item me-4">
            <Link to={'/dashboard'} class="nav-link active " ><i class="fa-solid fa-user fa-2x user"></i></Link>
          </li>
          
         
        </ul>
        <button className='btn btn-light'>Logout</button>
        
      </div>
    </div>
  </nav>
  );
}

export default Header;
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';


function Header({insideDashboard}) {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Rent-App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Complaints</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Requests
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Sent</a></li>
              <li><a class="dropdown-item" href="#">Recieved</a></li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#"><i class="fa-solid fa-heart"></i>Wishlist</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Dashboard</a>
          </li>
         
        </ul>
        <button className='btn btn-dark'>Logout</button>
        
      </div>
    </div>
  </nav>
  );
}

export default Header;
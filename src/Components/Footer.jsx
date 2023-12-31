import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    var admin=false
const user=JSON.parse(sessionStorage.getItem("existingUser"))
    if(user.role=="admin"){
      admin=true
    }
  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-2 shadow w-100 bg-black  '>
            <div className='footer-content justify-content-evenly w-100 mt-5 flex-wrap container' style={{ display: 'flex' }}>
                <div className='website d-flex flex-column' >
                    <div style={{ fontWeight: 'bold',color:"orange" }}>{' '}RentBlitz</div>
                    <div className='content text-light'>
                        Designed and built with all the love in the world by the RentBlitz team with the help of our contributors.</div>
                    <div className='text-light'>Code licensed RentBlitz, docs CC BY 1.0.</div>
                    <div className='text-light'>Currently v1.0.0.</div>
                </div>
                <div className='links d-flex flex-column '  >
                    <div style={{ fontWeight: 'bold',color:"orange" }}>Links</div>
                    <div className='d-flex flex-column'>
                        <Link to={'/landing'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
{!admin&&
                        <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link>
                        }
                        <Link to={'/landing'} style={{ textDecoration: 'none', color: 'white' }}>Products</Link>

                    </div>
                </div>
                <div className='guides d-flex flex-column'  >
                    <div style={{ fontWeight: 'bold',color:"orange" }}>Guides</div>
                    <div className='d-flex flex-column'>
                        <Link to={'https://react.dev/'} style={{ textDecoration: 'none', color: 'white' }}>React</Link>
                        <Link to={'https://react-bootstrap.github.io/'} style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</Link>
                        <Link to={'https://reactrouter.com/en/main'} style={{ textDecoration: 'none', color: 'white' }}>Routing</Link>

                    </div>

                </div>
                <div className='contact d-flex flex-column ' >
                    <div style={{ fontWeight: 'bold',color:"orange" }}>Contact Us</div>
                    <div className='d-flex'>
                        <input type="text" className='rounded'/>
                        <button type="button" class="btn btn-warning rounded ms-2">Subscribe</button>
                    </div>
                    <div>
                        <Link to={'/'} className='mx-2' style={{ textDecoration: 'none', color:'white' }}><i class="fa-brands fa-linkedin" style={{ color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-twitter" style={{ textDecoration: 'none', color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-3' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-facebook-f" style={{ textDecoration: 'none', color: 'black' }}></i></Link>
                        <Link to={'/'} className='mx-2' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-regular fa-envelope" style={{ textDecoration: 'none', color: 'black' }}></i></Link>

                    </div>
                </div>

            </div>
            <p className='mt-5 text-light'>Copyright © 2023 RentBlitz. Built with React.</p>
        </div>
  )
}

export default Footer

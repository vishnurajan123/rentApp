import React from 'react'
import './Dashboard.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Profile from '../Components/Profile'
import MyProducts from '../Components/MyProducts'

function Dashboard() {
  return (
    <>
    <Header/>
    <h1 className='exp'> <span style={{color:"orange"}}>|</span> My profile</h1>

    <Profile/>
    <MyProducts/>

    <Footer/>
    </>
  )
}

export default Dashboard
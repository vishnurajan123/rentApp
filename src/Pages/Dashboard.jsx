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

    <Profile/>
    <MyProducts/>

    <Footer/>
    </>
  )
}

export default Dashboard
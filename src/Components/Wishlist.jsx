import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getWishlistAPI } from '../Services/allAPI'
import WishlistCard from './WishlistCard'
import { addWishlistResponseContext, deleteWishlistResponseContext } from '../Contexts/ContextShare'

function Wishlist() {
    const {addWishlistResponse,setAddwishlistResponse}=useContext(addWishlistResponseContext)


const [wishlist,setWishlist]=useState([])

const getWishlist=async()=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

    const result = await getWishlistAPI(reqHeader)
    if(result.status==200){
        setWishlist(result.data)
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}
useEffect(()=>{
    getWishlist()
},[addWishlistResponse])


  return (
    <>
    <Header/>
    <h1 className='exp'> <span style={{color:"orange"}}>|</span> Wishlist</h1>

    <div className='d-flex justify-content-evenly  pt-5 flex-wrap conatiner'>


        {

            wishlist?.length>0?wishlist.map(product=>(


                <WishlistCard product={product} />

            )): <p>No items</p>
        }





    </div>

    <Footer/>
    
    
    </>
  )
}

export default Wishlist
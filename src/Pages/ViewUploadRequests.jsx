import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { allProductsAPI } from '../Services/allAPI'
import UploadRequestCard from '../Components/UploadRequestCard'
import { addProductResponseContext, editProductResponseContext } from '../Contexts/ContextShare'


function ViewUploadRequests() {
    const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)
    const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)



    const [allproducts,setAllProducts]=useState([])
const [searchKey,setSearchKey]=useState("")
const [searchLoc,setSearchLoc]=useState("")
// api calling
const getAllProducts=async()=>{
    const result=await allProductsAPI(searchKey,searchLoc)
    if(result.status===200){
        setAllProducts(result.data.filter(item=>item.status=="pending"))
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}

useEffect(()=>{
    // api call
    getAllProducts()
},[editProductResponse,addProductResponse])

  return (
    <>

    <Header/>
    <h1 className='exp '> <span style={{color:"orange"}}>|</span> Upload requests</h1>


<div className='d-flex justify-content-evenly flex-wrap mt-5 pt-5 mb-5'>
    {
        allproducts.length>0?allproducts.map(product=>(

            <UploadRequestCard product={product} />
        ))
        : <img width={"200px"} src="https://static.thenounproject.com/png/4532229-200.png" alt="" />
    }

</div>
    <Footer/>
    
    
    </>
  )
}

export default ViewUploadRequests
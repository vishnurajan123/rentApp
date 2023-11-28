import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import './ViewItems.css'
import ItemCard from '../Components/ItemCard'
import { allProductsAPI } from '../Services/allAPI'
import { addProductResponseContext, editProductResponseContext } from '../Contexts/ContextShare'

function ViewItems() {
    const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)
    const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)
const [allproducts,setAllProducts]=useState([])
const [searchKey,setSearchKey]=useState("")
const [searchLoc,setSearchLoc]=useState("")
// api calling
const getAllProducts=async()=>{
    const result=await allProductsAPI(searchKey,searchLoc)
    if(result.status===200){
        setAllProducts(result.data)
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}

useEffect(()=>{
    // api call
    getAllProducts()
},[searchKey,searchLoc,addProductResponse,editProductResponse])

console.log(searchKey);
console.log(searchLoc);

  return (
    <>
<Header/>

<div className='viewItems'>
    <div className='p-5'>
        
        <div className='d-flex justify-content-center align-items-center '>
            <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} className='search' type="text"  />
            <input value={searchLoc} onChange={(e)=>setSearchLoc(e.target.value)} className='loc' type="text"  />
        </div>
       <p className='text-center mt-3'> <button className='btn btn-dark'>Search</button></p>
    </div>


    <div className='d-flex justify-content-evenly mt-5 pt-5 flex-wrap '>

{
 allproducts?.length>0?allproducts.map(product=>(

<ItemCard product={product} />

 )): <p>Nothing to display</p>

}


        
       


    </div>
    

</div>
        <Footer/>
    </>
  )
}

export default ViewItems
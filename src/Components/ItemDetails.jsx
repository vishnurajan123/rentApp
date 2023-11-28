import React, { useContext, useEffect } from 'react'
import { itemDetailResponsesContext } from '../Contexts/ItemDetailsContext';
import { BASE_URL } from '../Services/baseURL';
import './ItemDetails.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { allProductsAPI } from '../Services/allAPI';
import Header from './Header'
import Footer from './Footer';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ItemDetails() {
    const {id}=useParams()
    const [value, setValue] = React.useState();

    const [allproducts,setAllProducts]=useState({})
    const searchKey=""
    const searchLoc=""

    const getAllProducts=async()=>{
        const result=await allProductsAPI(searchKey,searchLoc)
        if(result.status===200){
            setAllProducts(result.data.find(item=>item._id==id))
        }
        else{
            console.log(result);
            console.log(result.response.data);
        }
    }
    useEffect(()=>{
        getAllProducts()
    },[])




    console.log(id);
    console.log(allproducts);
  return (

    <>
    <Header/>
        
        <div className='d-flex justify-content-center align-items-center flex-column p-5'>
    <img className='itemimg' src={`${BASE_URL}/uploads/${allproducts?.productImage}`} alt="image" />
    <table>
    
    
        <tr>
            <th>Name</th>
            <td>{allproducts?.title}</td>
        </tr>
        <tr>
            <th>Category:</th>
            <td>{allproducts?.category}</td>
        </tr>
        <tr>
            <th>Overview:</th>
            <td>{allproducts?.overview}</td>
        </tr>
        <tr>
            <th>Rent:</th>
            <td>{allproducts?.rent}</td>
        </tr>
        <tr>
            <th>Place:</th>
            <td>{allproducts?.place}</td>
        </tr>
        <tr>
            <th>Contact:</th>
            <td>{allproducts?.contact}</td>
        </tr>
        <tr>
            <th>Location link:</th>
            <td>{allproducts?.loc}</td>
        </tr>
    </table>
    
    
        </div>


        <div className='d-flex justify-content-center align-items-center flex-column p-5'>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
                  <textarea name="" id="" cols="60" rows="5"></textarea>
                  <button className='btn btn-dark'>Post</button>


        </div>
        <Footer/>
    </>
  )
}

export default ItemDetails
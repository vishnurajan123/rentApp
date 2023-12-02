import React, { useContext, useEffect } from 'react'
import { itemDetailResponsesContext } from '../Contexts/ItemDetailsContext';
import { BASE_URL } from '../Services/baseURL';
import './ItemDetails.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { addRequestAPI, addReview, allProductsAPI, getReviews } from '../Services/allAPI';
import Header from './Header'
import Footer from './Footer';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { addREquestResponseContext } from '../Contexts/ContextShare';

function ItemDetails() {
    const {id}=useParams()
    const {addRequestResponse,setAddRequestREsponse}=useContext(addREquestResponseContext)
    const [value, setValue] = React.useState();
    const [added,setAdded]=useState(false)

    const [ratingDeails,setRatingDetails]=useState({
        productId:id,rating:"",review:"",username:""
      })
      const [reviews,setReviews]=useState()

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

  const handleAdd=async(e)=>{
    e.preventDefault()
    const {productId,rating,review}=ratingDeails
    const user=JSON.parse(sessionStorage.getItem("existingUser"))

    if(!rating || !review){
        alert("Please fill the form completely")
    }
    else{
        const reqBody=new FormData()
        reqBody.append("productId",productId)
        reqBody.append("rating",rating)
        reqBody.append("review",review)
        reqBody.append("username",user.username)



        const token=sessionStorage.getItem("token")

        if(token){
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }

              const result=await addReview(reqBody,reqHeader)
              if(result.status===200){
                alert("Review posted successfully")
                setAdded(true)
              }else{
                console.log(result);
                console.log(result.response.data);
              }
              
        }
    }
    
  }

  const addRequest=async()=>{
    const user=JSON.parse(sessionStorage.getItem("existingUser"))
    const userDetails=JSON.stringify(user)
    const senderId=user._id
    const recieverId=allproducts.userId
    const productId=allproducts._id
    const product=JSON.stringify(allproducts)

    const reqBody=new FormData()
        reqBody.append("senderId",senderId)
        reqBody.append("recieverId",recieverId)
        reqBody.append("productId",productId)
        reqBody.append("product",product)
        reqBody.append("userDetails",userDetails)



        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
          const result=await addRequestAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("Request sent successfully")
            setAddRequestREsponse(result.data)
          }
          else{
            console.log(result);
            console.log(result.response.data);
          }
          
          }

    
  }

  const getAllReviews=async()=>{
    const result=await getReviews()
    if(result.status===200){
        setReviews(result.data.filter(item=>item.productId==id))

    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
  }
  useEffect(()=>{
    setAdded(false)
    getAllReviews()
  },[added])

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
    <button onClick={addRequest} className='btn btn-dark mt-4'>Request</button>
    
    
        </div>


        <div className='d-flex justify-content-center align-items-center flex-column p-5'>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setRatingDetails({...ratingDeails,rating:newValue})
        }}
      />
                  <textarea onChange={e=>setRatingDetails({...ratingDeails,review:e.target.value})} name="" id="" cols="60" rows="5"></textarea>
                  <button onClick={handleAdd} className='btn btn-dark'>Post</button>


        </div>
        <div>

            <h1>Reviews</h1>
            {
                reviews?.length>0?reviews.map(review=>(
             
              <div>
                    <Rating
        name="simple-controlled"
        value={review.rating}
        readOnly
      />
      <p>{review.review}</p>
      <h6>{review.username}</h6>

              </div>

                )): <p>Nothing to display</p>
            }


        </div>
        <Footer/>
    </>
  )
}

export default ItemDetails
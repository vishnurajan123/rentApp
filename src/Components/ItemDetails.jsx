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
import AddWishlist from './AddWishlist';

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

          <h1>{allproducts?.title}, {allproducts?.place}</h1>
    <img className='itemimg' src={`${BASE_URL}/uploads/${allproducts?.productImage}`} alt="image" />
    <h2 className='mt-5'>Product Details</h2>

   <div className='d-flex justify-content-center align-items-center '>

      
      <table >
      
      
          <tr>
              <th><h3>Name</h3></th>
              <td><h3>{allproducts?.title}</h3></td>
          </tr>
          <tr>
              <th><h3>Category</h3></th>
              <td><h3>{allproducts?.category}</h3></td>
          </tr>
          <tr>
              <th><h3>Overview</h3></th>
              <td><h3>{allproducts?.overview}</h3></td>
          </tr>
          <tr>
              <th><h3>Rent</h3></th>
              <td><h3>{allproducts?.rent}</h3></td>
          </tr>
          <tr>
              <th><h3>Place</h3></th>
              <td><h3>{allproducts?.place}</h3></td>
          </tr>
          <tr>
              <th><h3>Contact</h3></th>
              <td><h3>{allproducts?.contact}</h3></td>
          </tr>
          <tr>
              <th><h3>Location link</h3></th>
              <td><h3><a href={allproducts?.loc} target='_blank'></a>Click here</h3></td>
          </tr>
      </table>
   </div>
    <button onClick={addRequest} className='rq mt-4 mb-3'>Request</button>
    <AddWishlist product={allproducts} />
    
    
        </div>


        <div className='d-flex justify-content-center align-items-center flex-column p-5'>
        <h1 className='exp'> <span style={{color:"orange"}}>|</span> Reviews</h1>
        <h3 className='mt-4 mb-3'>Drop your review</h3>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setRatingDetails({...ratingDeails,rating:newValue})
        }}
      />
                  <textarea className='mt-3' onChange={e=>setRatingDetails({...ratingDeails,review:e.target.value})} name="" id="" ></textarea>
                  <button onClick={handleAdd} className='rq mt-3'>Post</button>


        </div>
        <div className='container mb-5'>

            {
                reviews?.length>0?reviews.map((review,index)=>(
             
              <div>
                <p>{index+1}</p>
                    <Rating
        name="simple-controlled"
        value={review.rating}
        readOnly
      />
      <p>{review.review}</p>
      <h6> user: {review.username}</h6>

              </div>

                )): <p>Nothing to display</p>
            }


        </div>
        <Footer/>
    </>
  )
}

export default ItemDetails
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemDetails() {
    const {id}=useParams()
    const {addRequestResponse,setAddRequestREsponse}=useContext(addREquestResponseContext)
    const [value, setValue] = React.useState();
    const [added,setAdded]=useState(false)
    var avgrating=0
    const [ratingDeails,setRatingDetails]=useState({
        productId:id,rating:"",review:"",username:""
      })
      const [reviews,setReviews]=useState([])

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
        toast.info("Please fill the form completely")
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
                setRatingDetails({
                  productId:id,rating:"",review:"",username:""

                })
                setValue(0)
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
            toast.success("Request sent successfully")
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

 if(reviews.length>0){
  avgrating =reviews.map(item=>item.rating).reduce((item1,item2)=>item1+item2)/reviews.length
}  
var admin=false
const user=JSON.parse(sessionStorage.getItem("existingUser"))
    if(user.role=="admin"){
      admin=true
    }

  return (

    <>
    <Header/>
        
        <div className='d-flex justify-content-center align-items-center flex-column p-5 mt-5 '>
<div className='d-flex justify-content-evenly flex-wrap w-100 mt-5 pt-5 mb-5 pb-3'>
  
      <img className='itemimg' src={`${BASE_URL}/uploads/${allproducts?.productImage}`} alt="image" />
     <div className='d-flex justify-content-center  flex-column' >
        
        <h1 style={{fontWeight:"bold",color:"black"}} >{allproducts?.title}</h1>
        <h4>Location : {allproducts.place}</h4>
        <h3>Rent : <span className='text-danger'>{allproducts.rent}</span></h3>

        <Rating
        name="simple-controlled"
        value={avgrating}
        readOnly
      />
        {!admin&&
        <>
          
            <button onClick={addRequest} className='rq mt-4 mb-3'>Request</button>
      <AddWishlist product={allproducts} />
      
        </>
    }
     </div>

  
</div>



    <h2 className='mt-5 pt-5 exp'><span style={{color:"orange"}}>|</span>Product Details</h2>

   <div className='d-flex justify-content-center align-items-center '>

      
      <table >
      
      
          <tr>
              <th><h5>Name</h5></th>
              <td><h5>{allproducts?.title}</h5></td>
          </tr>
          <tr>
              <th><h5>Category</h5></th>
              <td><h5>{allproducts?.category}</h5></td>
          </tr>
          <tr>
              <th><h5>Overview</h5></th>
              <td><h5>{allproducts?.overview}</h5></td>
          </tr>
          <tr>
              <th><h5>Rent</h5></th>
              <td><h5>{allproducts?.rent}</h5></td>
          </tr>
          <tr>
              <th><h5>Place</h5></th>
              <td><h5>{allproducts?.place}</h5></td>
          </tr>
          <tr>
              <th><h5>Contact</h5></th>
              <td><h5>{allproducts?.contact}</h5></td>
          </tr>
          <tr>
              <th><h5>Location link</h5></th>
              <td><a className='text-primary' href={allproducts?.loc} target='_blank'><h5>Click here</h5></a></td>
          </tr>
      </table>
   </div>
    
    
    
        </div>
        <h1 className='exp'> <span style={{color:"orange"}}>|</span> Reviews</h1>

{!admin&&
        <div className='d-flex justify-content-center align-items-center flex-column p-5'>
        <h3 className='mt-4 mb-3'>Drop your review</h3>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setRatingDetails({...ratingDeails,rating:newValue})
        }}
      />
                  <textarea value={ratingDeails.review} className='mt-3' onChange={e=>setRatingDetails({...ratingDeails,review:e.target.value})} name="" id="" ></textarea>
                  <button onClick={handleAdd} className='rq mt-3'>Post</button>


        </div>}
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

                )): <p className='text-danger'>*No reviews added</p>
            }


        </div>
        <Footer/>
        < ToastContainer position='top-right' theme='colored'/>

    </>
  )
}

export default ItemDetails
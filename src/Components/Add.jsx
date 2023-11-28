import { useState,useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProductAPI } from '../Services/allAPI';
import { addProductResponseContext } from '../Contexts/ContextShare';

function Add() {
  const {addProductResponse,setAddproductResponse}=useContext(addProductResponseContext)
  const [token,setToken]=useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productDetails,setProductctDetails]=useState({
    title:"",category:"",overview:"",rent:"",place:"",contact:"",loc:"",productImage:""
  })
  const [preview ,setPreview]=useState("")

  useEffect(()=>{
    if(productDetails.productImage){
      setPreview(URL.createObjectURL(productDetails.productImage))
    }
  },[productDetails.productImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])

const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,category,overview,rent,place,contact,loc,productImage}=productDetails
    if(!title || !category || !overview || !rent || !place || !contact || !loc || !productImage){
        alert("Please fill the form completely")
    }
    else{
        const reqBody=new FormData()
        reqBody.append("title",title)
        reqBody.append("category",category)
        reqBody.append("overview",overview)
        reqBody.append("rent",rent)
        reqBody.append("place",place)
        reqBody.append("contact",contact)
        reqBody.append("loc",loc)
        reqBody.append("productImage",productImage)

        if(token){
            const reqHeader={
             "Content-Type":"multipart/form-data",
             "Authorization":`Bearer ${token}`
           }

           const result=await addProductAPI(reqBody,reqHeader)
           if(result.status===200){
            console.log(result.data);

            handleClose()
            setAddproductResponse(result.data)

            
           }
           else{
                console.log(result);
                alert(result.response.data)
           }
    }
}}
console.log(productDetails);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add new product
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
         <div className="row">
            <div className="col-lg-6 ">
               <div className='d-flex justify-content-center align-items-center h-100'>
                    <label htmlFor="project">
                        <input  onChange={(e)=>setProductctDetails({...productDetails,productImage:e.target.files[0]})}  id='project' type="file" style={{display:"none"}} />
                        <img height={"200px"} width={"300px"} src={preview?preview:"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"} alt="" />
    
                    </label>
               </div>

            </div>
            <div className="col-lg-6">

                <div className='mb-3'>
                    <input value={productDetails.title} onChange={(e)=>setProductctDetails({...productDetails,title:e.target.value})} className='form-control' type="text"  placeholder='Enter Title'/>
                </div>
                <div className='mb-3'>
                    <input  value={productDetails.category} onChange={(e)=>setProductctDetails({...productDetails,category:e.target.value})}   className='form-control' type="text"  placeholder='Enter category'/>
                </div>
                <div    className='mb-3'>
                    <input value={productDetails.overview} onChange={(e)=>setProductctDetails({...productDetails,overview:e.target.value})}  className='form-control' type="text"  placeholder='Enter overview'/>
                </div>
                <div    className='mb-3'>
                    <input value={productDetails.rent} onChange={(e)=>setProductctDetails({...productDetails,rent:e.target.value})}  className='form-control' type="text"  placeholder='Enter rent'/>
                </div>
                <div className='mb-3'>
                    <input  value={productDetails.place} onChange={(e)=>setProductctDetails({...productDetails,place:e.target.value})}  className='form-control' type="text"  placeholder='Enter place'/>
                </div>
                <div    className='mb-3'>
                    <input value={productDetails.contact} onChange={(e)=>setProductctDetails({...productDetails,contact:e.target.value})}  className='form-control' type="text"  placeholder='Enter contact number'/>
                </div>
                <div    className='mb-3'>
                    <input value={productDetails.loc} onChange={(e)=>setProductctDetails({...productDetails,loc:e.target.value})}  className='form-control' type="text"  placeholder='location link'/>
                </div>
                
                </div>
         </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="dark">Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
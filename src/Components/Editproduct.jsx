import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../Services/baseURL';
import { editProductAPI } from '../Services/allAPI';
import { editProductResponseContext } from '../Contexts/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editproduct({product}) {
    const {editProductResponse,setEditproductResponse}=useContext(editProductResponseContext)
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [productDetails,setProductDetails]=useState({
        id:product._id,title:product.title,category:product.category,overview:product.overview,rent:product.rent,place:product.place,contact:product.contact,loc:product.loc,productImage:"",userId:product.userId,status:product.status
    })

    const handleClose = () => {
        setShow(false);
        setProductDetails({
            id:product._id,title:product.title,category:product.category,overview:product.overview,rent:product.rent,place:product.place,contact:product.contact,loc:product.loc,productImage:"",userId:product.userId,status:product.status
            
        })
        setPreview("")
    
    }
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(productDetails.productImage){
            setPreview(URL.createObjectURL(productDetails.productImage))
        }
    },[productDetails.productImage])

    const handleUpdate= async()=>{
        const {id,title,category,overview,rent,place,contact,loc,productImage,userId,status}=productDetails

        if(!title || !category || !overview || !rent || !place || !contact || !loc){
            toast.info("Please fill the form completeley...")
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
            preview?reqBody.append("productImage",productImage):reqBody.append("productImage",product.productImage)
            reqBody.append("userId",userId)
            reqBody.append("status",status)




            const token=sessionStorage.getItem("token")
            if(preview){
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }

                //   api call
                const result=await editProductAPI(id,reqBody,reqHeader)
                if(result.status===200){
                    toast.info("Product updated successfully...")
                    handleClose()
                    // pass response to my products
                    setEditproductResponse(result.data)
                }
                else{
                    console.log(result);
                    alert(result.response.data)
                }

            }
            else{
                const reqHeader={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                //   api call
                
                const result=await editProductAPI(id,reqBody,reqHeader)
                if(result.status===200){
                    toast.info("Product updated successfully...")
                    handleClose()
                    // pass response to my products
                    setEditproductResponse(result.data)

                }
                else{
                    console.log(result);
                    alert(result.response.data)
                }

            }
        
        
        }
    }

  return (
    <>
    
    <button className='btn' variant="dark" onClick={handleShow}>
    <i class="fa-solid fa-pen-to-square fa-2x text-black"></i></button>

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
                        <input onChange={e=>setProductDetails({...productDetails,productImage:e.target.files[0]})}   id='project' type="file" style={{display:"none"}} />
                        <img height={"200px"} width={"300px"} src={preview?preview:`${BASE_URL}/uploads/${product.productImage}`} alt="" />
    
                    </label>
               </div>

            </div>
            <div className="col-lg-6">

                <div className='mb-3'>
                    <input value={productDetails.title} onChange={e=>setProductDetails({...productDetails,title:e.target.value})} className='form-control' type="text"  placeholder='Enter Title'/>
                </div>
                <div className='mb-3'>
                    <input  value={productDetails.category} onChange={e=>setProductDetails({...productDetails,category:e.target.value})}     className='form-control' type="text"  placeholder='Enter category'/>
                </div>
                <div    className='mb-3'>
                    <input value={productDetails.overview} onChange={e=>setProductDetails({...productDetails,overview:e.target.value})}   className='form-control' type="text"  placeholder='Enter overview'/>
                </div>
                <div    className='mb-3'>
                    <input  value={productDetails.rent} onChange={e=>setProductDetails({...productDetails,rent:e.target.value})}  className='form-control' type="text"  placeholder='Enter rent'/>
                </div>
                <div className='mb-3'>
                    <input  value={productDetails.place} onChange={e=>setProductDetails({...productDetails,place:e.target.value})}   className='form-control' type="text"  placeholder='Enter place'/>
                </div>
                <div    className='mb-3'>
                    <input  value={productDetails.contact} onChange={e=>setProductDetails({...productDetails,contact:e.target.value})}  className='form-control' type="text"  placeholder='Enter contact number'/>
                </div>
                <div    className='mb-3'>
                    <input   value={productDetails.loc} onChange={e=>setProductDetails({...productDetails,loc:e.target.value})} className='form-control' type="text"  placeholder='location link'/>
                </div>
                
                </div>
         </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdate}  variant="dark">Save</Button>
        </Modal.Footer>
      </Modal>
      < ToastContainer position='top-right' theme='colored'/>

    </>
  )
}

export default Editproduct
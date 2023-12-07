import React, { useEffect, useState } from 'react'
import './Profile.css'
import { BASE_URL } from '../Services/baseURL'
import { editUserAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

    const [userprofile,setUserprofile]=useState({
        username:"",email:"",password:"",place:"",phone:"",profile:""
      })
      const [existingImage,setExistingImage]=useState("")
      const [preview,setPreview]=useState("")



      useEffect(()=>{
        if(sessionStorage.getItem("existingUser")){
            const user=JSON.parse(sessionStorage.getItem("existingUser"))
            setUserprofile({...userprofile,username:user.username,email:user.email,password:user.password,place:user.place,phone:user.phone,profile:""})
            
            setExistingImage( user.profile )
console.log(user);

        }
      },[])

      useEffect(()=>{
        if(userprofile.profile){
            setPreview(URL.createObjectURL(userprofile.profile))

        }
        else{
            setPreview("")
          }
      },[userprofile.profile])


      const handleProfileUpdate=async(e)=>{
        e.preventDefault()
        const {username,email,password,place,phone,profile}=userprofile
        if(!username || !email || !place || !phone){
            alert("please fill the form completely")
        }
        else{
            const reqBody=new FormData()
          reqBody.append("username",username)
          reqBody.append("email",email)
          reqBody.append("password",password)
          reqBody.append("place",place)
          reqBody.append("phone",phone)
          preview?reqBody.append("profile",profile): reqBody.append("profile",existingImage)

          const token=sessionStorage.getItem("token")
          if(preview){
            const reqHeader={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
        // api call
        const result=await editUserAPI(reqBody,reqHeader)
        if(result.status==200){
            toast.success("Profile updated successfully")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
            console.log(result);
            console.log(result.response.data);

           }
        
        }
        else{
            const reqHeader={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
            // api call
        const result=await editUserAPI(reqBody,reqHeader)
        if(result.status==200){
            toast.success("Profile updated successfully")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
            console.log(result);
            console.log(result.response.data);

           }
        
        
        }



        }
      }


  return (
   <div className='d-flex justify-content-center align-items-center p-5 rounded-5'>
        <div className='profile d-flex justify-content-evenly flex-wrap'>

            <div className='d-flex justify-content-center align-items-center '>
                
            <label htmlFor="profile">
                        {/* upload picture */}

                        <input onChange={(e)=>setUserprofile({...userprofile,profile:e.target.files[0]})}  id='profile' type="file"  style={{display:"none"}}/>

                        {existingImage!==""?
                        <img style={{width:"180px",height:"180px"}} src={preview?preview: `${BASE_URL}/uploads/${existingImage}` }alt="" />:
                        <img style={{width:"180px",height:"180px"}} src={preview?preview: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }alt="" />
        }
        
                    </label>
             
             
             </div>



            <div className='d-flex justify-content-center align-items-center ttt' >
                <div className='w-100'>
                <input 
                         value={userprofile.username} 
                         onChange={(e)=>setUserprofile({...userprofile,username:e.target.value})}  className='form-control ' type="text" placeholder='Enter username' />

                    <input 
                         value={userprofile.email} 
                         onChange={(e)=>setUserprofile({...userprofile,email:e.target.value})}  className='form-control mt-3' type="email" placeholder='Enter username' />

                     <input 
                         value={userprofile.place} 
                         onChange={(e)=>setUserprofile({...userprofile,place:e.target.value})}  className='form-control mt-3' type="text" placeholder='Enter username' />

                     <input 
                         value={userprofile.phone} 
                         onChange={(e)=>setUserprofile({...userprofile,phone:e.target.value})}  className='form-control mt-3' type="text" placeholder='Enter username' />
                    
                    <div>
<p className='text-center'>
                            <button onClick={handleProfileUpdate} className='rq mt-3'>Edit Details</button>
    
</p>                        

                    </div>


                </div>




                <h3></h3>


            </div>


    
    
        </div>
        < ToastContainer position='top-right' theme='colored'/>

   </div>
  )
}

export default Profile
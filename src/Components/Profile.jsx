import React from 'react'
import './Profile.css'
function Profile() {
  return (
   <div className='d-flex justify-content-center align-items-center p-5 rounded-5'>
        <div className='profile d-flex justify-content-evenly'>

            <div className='d-flex justify-content-center align-items-center'><img width={"200px"} 
             height={"200px"}   src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" /></div>
            <div className='d-flex justify-content-center align-items-center' >
                <div>
                    <h3>Name : Vishnu Rajan</h3>
                    <h3>Email : vishnurajan135531@gmail.com</h3>
                    <h3>Phone : 9447137801</h3>
                    <h3>Place : Kochi</h3>
                    <h3>PIN : 670593</h3>
                    <h3>POST : Kochi</h3>
                    <div>
                        <button className='btn btn-primary'>Edit</button>

                    </div>


                </div>




                <h3></h3>


            </div>


    
    
        </div>
   </div>
  )
}

export default Profile
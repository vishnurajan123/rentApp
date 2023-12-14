import { Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ViewItems from './Pages/ViewItems';
import Dashboard from './Pages/Dashboard';
import ItemDetails from './Components/ItemDetails';
import SentRequest from './Components/SentRequest';
import RecieveRequest from './Components/ReciveRequest';
import Chat from './Components/Chat';
import Wishlist from './Components/Wishlist';
import { tokenAutherizationContext } from './Contexts/TokenAuth';
import { useContext } from 'react';
import ViewUploadRequests from './Pages/ViewUploadRequests';
import ViewComplaints from './Pages/ViewComplaints';
import Pending from './Pages/Pending';

function App() {
  const {isAutherized,setIsAutherized}=useContext(tokenAutherizationContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/landing' element={isAutherized?  <ViewItems/> :<Home/> }></Route>
      <Route path='/dashboard' element={ isAutherized? <Dashboard/> : <Home/> }></Route>
      <Route path='/details/:id' element={ isAutherized? <ItemDetails/> :<Home/> }></Route>
      <Route path='/sendrequests' element={ isAutherized? <SentRequest/> :<Home/> }></Route>
      <Route path='/recieverequest' element={ isAutherized? <RecieveRequest/>:<Home/> }/>
      <Route path='/chat/:id' element={isAutherized? <Chat/>:<Home/> }/>
      <Route path='/wishlist' element={ isAutherized? <Wishlist/> : <Home/>}/>
      <Route path='/viewuploadrequest' element={ isAutherized? <ViewUploadRequests/> : <Home/>}/>
      <Route path='/viewcomplaints' element={ isAutherized? <ViewComplaints/> : <Home/>}/>
      <Route path='/pending' element={ isAutherized? <Pending/> : <Home/>}/>



      <Route path='/*' element ={<Navigate to={'/'}/>}/>







    </Routes>
      
    </>
  );
}

export default App;

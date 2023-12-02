import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ViewItems from './Pages/ViewItems';
import Dashboard from './Pages/Dashboard';
import ItemDetails from './Components/ItemDetails';
import SentRequest from './Components/SentRequest';
import RecieveRequest from './Components/ReciveRequest';
import Chat from './Components/Chat';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/landing' element={<ViewItems/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/details/:id' element={<ItemDetails/>}></Route>
      <Route path='/sendrequests' element={<SentRequest/>}></Route>
      <Route path='/recieverequest' element={<RecieveRequest/>}/>
      <Route path='/chat/:id' element={<Chat/>}/>






    </Routes>
      
    </>
  );
}

export default App;

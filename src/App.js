import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ViewItems from './Pages/ViewItems';
import Dashboard from './Pages/Dashboard';
import ItemDetails from './Components/ItemDetails';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/landing' element={<ViewItems/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/details/:id' element={<ItemDetails/>}></Route>





    </Routes>
      
    </>
  );
}

export default App;

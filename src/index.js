import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './Contexts/ContextShare';
import ItemDetailsContext from './Contexts/ItemDetailsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<ContextShare>
  <ItemDetailsContext>
    
    <BrowserRouter>
      
          <App />
          
    </BrowserRouter>
  </ItemDetailsContext>
</ContextShare>

  </React.StrictMode>
);



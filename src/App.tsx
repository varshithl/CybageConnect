import './App.css';
import React from 'react';
import{BrowserRouter,Routes,Route,} from "react-router-dom";

import { useState } from 'react';

const App:React.FC=()=> {
  const [Username,setUsername] = useState('');
  function handleusername(value:string){
      setUsername(value)
      localStorage.setItem('name', value)
  }
  return (
    <BrowserRouter>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;


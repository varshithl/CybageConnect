import './App.css';
import Login from './Components/Login';
import Registration from './Components/Registration';
import{BrowserRouter,Routes,Route,} from "react-router-dom";
import Welcome from './Components/Welcome';
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
        <Route path='/' element={<Login setUsername={handleusername} />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/welcome' element={<Welcome username={localStorage.getItem('name') } />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';

import './App.css';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Button variant="contained">Mui Installed</Button>} />
        <Route path="/signup/" element={<SignUp/>} />
        <Route path="/login/" element={<SignIn/>} />
        <Route path="/*" element={<h1>error 404 the page is not found</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

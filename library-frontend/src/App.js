import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import BookDetail from './components/BookDetail';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/signup/" element={<SignUp/>} />
        <Route path="/login/" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/mybooks" element={<MyBooks/>} />
        <Route path="/*" element={<h1>error 404 the page is not found</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

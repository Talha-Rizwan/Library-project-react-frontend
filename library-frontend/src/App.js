import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/user/Home";
import BookDetail from "./components/user/BookDetail";
import MyBooks from "./pages/user/MyBooks";
import NavBar from "./components/NavBar";
import UpdateProfile from "./pages/UpdateProfile";
import LibrarianBooks from "./pages/Librarian/LibrarianBooks";
import UserBookRequests from "./pages/Librarian/Requests";
import Dashboard from "./pages/Librarian/Dashboard";

const App = () => (
  <div>
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/update/" element={<UpdateProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/librarian/" element={<Dashboard />} />
        <Route path="/librarian/requests" element={<UserBookRequests />} />
        <Route path="/librarian/books/" element={<LibrarianBooks />} />
        <Route path="librarian/book/:id" element={<BookDetail />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/login/" element={<SignIn />} />
        <Route path="/*" element={<h1>error 404 the page is not found</h1>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/user/Home";
import BookDetail from "./components/user/BookDetail";
import MyBooks from "./pages/user/MyBooks";
import NavBar from "./components/NavBar";
import UpdateProfile from "./pages/UpdateProfile";
import { isTokenVaild } from "./utils/authUtils";
import LibrarianHome from "./pages/Librarian/LibrarianHome";
import LibrarianBooks from "./pages/Librarian/LibrarianBooks";
function App() {
  return (
    <div>
      {isTokenVaild() ? (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/update/" element={<UpdateProfile />} />
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/mybooks" element={<MyBooks />} />
            {/* librarian routes */}
            <Route path="/librarian/" element={<LibrarianHome />} />
            <Route path="/librarian/books/" element={<LibrarianBooks />} />
            <Route path="librarian/book/:id" element={<BookDetail />} />

            <Route
              path="/*"
              element={<h1>error 404 the page is not found</h1>}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/signup/" element={<SignUp />} />
            <Route path="/login/" element={<SignIn />} />
            <Route
              path="/*"
              element={<h1>error 404 the page is not found</h1>}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

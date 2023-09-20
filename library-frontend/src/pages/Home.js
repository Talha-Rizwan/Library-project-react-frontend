import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";
import Books from "../components/Books";
import { getAccessToken, isTokenVaild } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();
  const [userBooks, setUserBooks] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/home/book-view-set/?name=${searchValue}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("Error getting data!");
        console.error("Error data: ", error);
      });
  }, [searchValue]);

  useEffect(() => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`http://127.0.0.1:8000/api/home/request-set/`, {
          headers: headers,
        })
        .then((response) => {
          setUserBooks(response.data);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  console.log("the books are : ", userBooks);

  return (
    <div>
      <Header setSearchValue={setSearchValue} />
      <Books books={books} userBooks={userBooks} />
    </div>
  );
};

export default Home;

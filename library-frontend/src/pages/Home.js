import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";
import Books from "../components/Books";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();
  console.log(searchValue)
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

  return (
    <div>
      <Header setSearchValue={setSearchValue}/>
      <Books books={books} />
    </div>
  );
};

export default Home;

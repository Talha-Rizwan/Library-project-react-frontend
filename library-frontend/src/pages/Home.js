import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";
import Books from "../components/Books";

const Home = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/home/book-view-set/")
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log("Error getting data!");
        console.error("Error data: ", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Books books={books} />
    </div>
  );
};

export default Home;

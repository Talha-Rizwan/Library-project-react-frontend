import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import Header from "../../components/common/Header";
import {
  getAccessToken,
  isTokenVaild,
  isLibrarian,
} from "../../utils/authUtils";
import BookCard from "../../components/user/BookCard";
import { URL } from "../../constants";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();
  const [userBooks, setUserBooks] = useState();
  const [rerender, setRerender] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/home/book-view-set/?name=${searchValue}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("Error getting data!");
        console.error("Error data: ", error);
      });
  }, [searchValue]);

  useEffect(() => {
    if (isTokenVaild() && isLibrarian() === "false") {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`${URL}/api/home/request-set/`, {
          headers: headers,
        })
        .then((response) => {
          setUserBooks(response.data);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else if (isLibrarian() === "true") {
      navigate("/librarian/");
    } else {
      navigate("/login");
    }
  }, [rerender]);

  return (
    <div>
      {isTokenVaild() && (
        <div>
          <Header setSearchValue={setSearchValue} />
          <Stack
            useFlexGap
            flexWrap="wrap"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            {books?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                userBooks={userBooks}
                setRerender={setRerender}
              />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Home;

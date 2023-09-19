import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken, isTokenVaild } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`http://127.0.0.1:8000/api/home/user-request/`, {
          headers: headers,
        })
        .then((response) => {
          console.log("the books are : ", response.data);
          setBooks(response.data.books);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  console.log("the token is : ", getAccessToken());

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} direction="column" alignItems="center">
          <Item>
            <h1>My Books</h1>
          </Item>
          <Item>
            <h3>Issued Books</h3>
            {!books?.issued_books.length ? (
              <p>No Requested books</p>
            ) : (
              <BookList books={books?.issued_books} />
            )}
          </Item>
          <Item>
            <h3>Requested Books</h3>
            {!books?.requested_books.length ? (
              <p>No Requested books</p>
            ) : (
              <BookList books={books?.requested_books} />
            )}
          </Item>
          <Item>
            <h3>Returned Books</h3>
            {!books?.returned_books.length ? (
              <p>No Requested books</p>
            ) : (
              <BookList books={books?.returned_books} />
            )}
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default MyBooks;

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
        .get(`http://127.0.0.1:8000/api/home/request-set/`, {
          headers: headers,
        })
        .then((response) => {
          setBooks(response.data);
          console.log("the books are : ", books);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} direction="column" alignItems="center">
          <Item>
            <h1>My Books</h1>
          </Item>
          <Item>
            <h3>Issued Books</h3>
            <BookList books={books?.filter((book) => book.status === "A")} />
          </Item>
          <Item>
            <h3>Requested Books</h3>
            <BookList books={books?.filter((book) => book.status === "P")} />
          </Item>
          <Item>
            <h3>Return Processing Books</h3>
            <BookList books={books?.filter((book) => book.status === "B")} />
          </Item>
          <Item>
            <h3>Returned Books</h3>
            <BookList books={books?.filter((book) => book.status === "C")} />
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default MyBooks;

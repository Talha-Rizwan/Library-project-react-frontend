import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";

import Header from "../../components/Header";
import { isTokenVaild } from "../../utils/authUtils";
import LibrarianBookCard from "../../components/librarian/LibrarianBookCard";

const LibrarianBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();

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
              <LibrarianBookCard key={book.id} book={book} />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default LibrarianBooks;

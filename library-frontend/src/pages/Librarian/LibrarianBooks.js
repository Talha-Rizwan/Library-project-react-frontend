import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";

import Header from "../../components/Header";
import { isTokenVaild } from "../../utils/authUtils";
import LibrarianBookCard from "../../components/librarian/LibrarianBookCard";
import FormModal from "../../components/librarian/Modal";

const LibrarianBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();
  const [reRender, setReRender] = useState(false);

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
  }, [searchValue, reRender]);

  return (
    <div>
      {isTokenVaild() && (
        <div>
          <Header setSearchValue={setSearchValue} />
          <FormModal setReRender={setReRender} name="Add Book" />
          <Stack
            useFlexGap
            flexWrap="wrap"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            {books?.map((book) => (
              <LibrarianBookCard
                key={book.id}
                book={book}
                setReRender={setReRender}
              />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default LibrarianBooks;

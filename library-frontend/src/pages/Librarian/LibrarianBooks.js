import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";

import Header from "../../components/common/Header";
import { isLibrarian, isTokenVaild } from "../../utils/authUtils";
import LibrarianBookCard from "../../components/librarian/LibrarianBookCard";
import FormModal from "../../components/common/Modal";
import { ADD_BOOK, URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const LibrarianBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState();
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVaild() === false) {
      navigate("/login/");
    } else if (isLibrarian() === "false") {
      navigate("/");
    }
    axios
      .get(`${URL}/api/home/book-view-set/?name=${searchValue}`)
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
          <FormModal setReRender={setReRender} name={ADD_BOOK} />
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

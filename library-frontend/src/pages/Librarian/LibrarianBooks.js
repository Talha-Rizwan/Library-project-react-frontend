import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { CustomStack } from "../../emotionStyle";
import Header from "../../components/common/Header";
import { isLibrarian, isTokenVaild } from "../../utils/authUtils";
import LibrarianBookCard from "../../components/librarian/LibrarianBookCard";
import FormModal from "../../components/common/Modal";
import { ADD_BOOK, URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { getBookAction } from "../../actions/BookActions";

const LibrarianBooks = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.searchValue);
  const LibraryBooks = useSelector((state) => state.books);

  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();

  const getLibraryBooks = (items) => {
    dispatch(getBookAction(items));
  };

  useEffect(() => {
    if (!isTokenVaild()) {
      navigate("/login/");
    } else if (isLibrarian() === "false") {
      navigate("/");
    }
    axios
      .get(`${URL}/api/home/book-view-set/?name=${searchValue}`)
      .then((response) => {
        getLibraryBooks(response.data);
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
          <Header />
          <FormModal setReRender={setReRender} name={ADD_BOOK} />
          <CustomStack
            useFlexGap
            spacing={{ xs: 1, sm: 2, md: 4 }}
            flexWrap="wrap"
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            {LibraryBooks?.map((book) => (
              <LibrarianBookCard
                key={book.id}
                book={book}
                setReRender={setReRender}
              />
            ))}
          </CustomStack>
        </div>
      )}
    </div>
  );
};

export default LibrarianBooks;

import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";

import BookCard from "./BookCard";

const Books = ({ books, userBooks, setRerender }) => (
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
);

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  userBooks: PropTypes.array.isRequired,
  setRerender: PropTypes.func.isRequired,
};

export default Books;

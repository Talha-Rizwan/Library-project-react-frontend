import React from "react";
import PropTypes from "prop-types";

import { CustomStack } from "../../emotionStyle";
import BookCard from "./BookCard";

const Books = ({ books, setRerender }) => (
  <CustomStack
    useFlexGap
    spacing={{ xs: 1, sm: 2, md: 4 }}
    flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
    justifyContent="center"
    alignItems="center"
  >
    {books?.map((book) => (
      <BookCard key={book.id} book={book} setRerender={setRerender} />
    ))}
  </CustomStack>
);

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  setRerender: PropTypes.func.isRequired,
};

export default Books;

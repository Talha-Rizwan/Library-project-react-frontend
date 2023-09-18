import * as React from "react";
import Stack from "@mui/material/Stack";
import BookCard from "./BookCard";

const Books = ({ books }) => (
  <Stack
    useFlexGap
    flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    justifyContent="center"
    alignItems="center"
  >
    {books?.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </Stack>
);

export default Books;

import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BookCard from "./BookCard";
import { Stack } from "@mui/material";

const BookList = ({ books }) => {
  return (
    <Stack
      useFlexGap
      flexWrap="wrap"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      alignItems="center"
    >
      {books?.map((book) => {
        return (
          <BookCard key={book?.requested_book.id} book={book?.requested_book} />
        );
      })}
      {!books?.length && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AcUnitIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="No books to show" />
        </ListItem>
      )}
    </Stack>
  );
};

export default BookList;

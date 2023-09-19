import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useNavigate } from "react-router-dom";

const BookList = ({ books }) => {
  const navigate = useNavigate();

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        textAlign: "center",
      }}
    >
      {books?.map((book) => {
        return (
          <ListItem
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/book/${book?.requested_book.id}`);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <AutoStoriesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={book.requested_book.name} />
          </ListItem>
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
    </List>
  );
};

export default BookList;

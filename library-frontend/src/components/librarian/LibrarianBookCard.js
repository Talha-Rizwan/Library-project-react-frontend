import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DeleteModal from "./DeleteModal";
import FormModal from "../common/Modal";
import { UPDATE_BOOK } from "../../constants";

const LibrarianBookCard = ({ book, setReRender }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="/book.jpeg" alt="book" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name : {book.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book.author_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            navigate(`/librarian/book/${book?.id}`);
          }}
        >
          Detail
        </Button>
        <FormModal object={book} setReRender={setReRender} name={UPDATE_BOOK} />

        <DeleteModal id={book?.id} setReRender={setReRender} />
      </CardActions>
    </Card>
  );
};

LibrarianBookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    author_name: PropTypes.string,
    publisher_name: PropTypes.string,
    number_of_books: PropTypes.string,
  }),
  setReRender: PropTypes.func.isRequired,
};

export default LibrarianBookCard;

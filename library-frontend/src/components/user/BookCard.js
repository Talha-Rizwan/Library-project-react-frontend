import React from "react";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { REQUEST_STATUS, URL } from "../../constants";
import { getAccessToken, isTokenVaild } from "../../utils/authUtils";
import { StyledButton, CustomWideCard } from "../../emotionStyle";

const BookCard = ({ book, BookStatus, setRerender }) => {
  const navigate = useNavigate();
  let status = BookStatus;

  const LibraryBooks = useSelector((state) => state.books);

  const myBook = LibraryBooks?.filter(
    (userbook) => userbook.requested_book.id === book.id
  );

  myBook?.forEach((element) => {
    if (element.requested_book.id === book.id) {
      status = element.status;
    }
  });

  const return_id = (BookId) => {
    const req = LibraryBooks.filter(
      (request) => request.requested_book.id === BookId
    );
    return req[0]?.id;
  };

  const handleBookRequest = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        requested_book: book.id,
        status: REQUEST_STATUS.PENDING_STATUS,
      };

      axios
        .post(`${URL}/api/home/user-request/`, requestBody, {
          headers: headers,
        })
        .then((response) => {
          console.log("Request Book successful:", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error requesting book:", error);
        });
    }
  };

  const handleBookReturnRequest = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        status: REQUEST_STATUS.RETURN_REQUEST_STATUS,
      };

      return_id(book.id);
      axios
        .put(
          `${URL}/api/home/return-request/${return_id(book.id)}/`,
          requestBody,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log("Return Book request successful:", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error returning book:", error);
        });
    }
  };

  const handleBookRequestAgain = () => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      const requestBody = {
        status: "B",
      };

      return_id(book.id);
      axios
        .put(`${URL}/api/home/re-request/${return_id(book.id)}/`, requestBody, {
          headers: headers,
        })
        .then((response) => {
          console.log("Request Book successful:", response.data);
          setRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error re-requesting book:", error);
        });
    }
  };

  return (
    <CustomWideCard width="345">
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
        <StyledButton
          size="small"
          buttonColor="blue"
          onClick={() => {
            navigate(`/book/${book?.id}`);
          }}
        >
          Detail
        </StyledButton>

        {!status && book.number_of_books && (
          <StyledButton
            size="small"
            buttonColor="green"
            onClick={handleBookRequest}
          >
            Request Book
          </StyledButton>
        )}

        {status === "A" && (
          <StyledButton
            size="small"
            buttonColor="orange"
            onClick={handleBookReturnRequest}
          >
            Return Book
          </StyledButton>
        )}
        {status === REQUEST_STATUS.CLOSED_STATUS && <p>Already Read...</p> && (
          <StyledButton
            size="small"
            buttonColor="red"
            onClick={handleBookRequestAgain}
          >
            Request Again
          </StyledButton>
        )}
        {status === REQUEST_STATUS.RETURN_REQUEST_STATUS && (
          <p>Return Pending...</p>
        )}
        {status === REQUEST_STATUS.PENDING_STATUS && (
          <p>Book Request Pending...</p>
        )}
      </CardActions>
    </CustomWideCard>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    number_of_books: PropTypes.string,
  }),
  BookStatus: PropTypes.string,
  setRerender: PropTypes.func.isRequired,
};

export default BookCard;

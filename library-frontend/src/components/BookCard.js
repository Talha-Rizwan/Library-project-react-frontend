import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getAccessToken, isTokenVaild } from "../utils/authUtils";

const BookCard = ({ book, userBooks, BookStatus, setRerender }) => {
  const navigate = useNavigate();
  let status = BookStatus;
  let myBook = userBooks?.filter(
    (userbook) => userbook.requested_book.id === book.id
  );

  myBook?.forEach((element) => {
    if (element.requested_book.id === book.id) {
      status = element.status;
    }
  });

  const return_id = (BookId) => {
    let req = userBooks.filter(
      (request) => request.requested_book.id === BookId
    );
    return req[0]?.id;
  };

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
            navigate(`/book/${book?.id}`);
          }}
        >
          Detail
        </Button>

        {!status && book.number_of_books && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              if (isTokenVaild()) {
                const headers = {
                  Authorization: `Bearer ${getAccessToken()}`,
                };
                const requestBody = {
                  requested_book: book.id,
                  status: "P",
                };

                axios
                  .post(
                    "http://127.0.0.1:8000/api/home/user-request/",
                    requestBody,
                    {
                      headers: headers,
                    }
                  )
                  .then((response) => {
                    console.log("Request Book successful:", response.data);
                    setRerender((prev) => !prev);
                  })
                  .catch((error) => {
                    console.error("Error requesting book:", error);
                  });
              }
            }}
          >
            Request Book
          </Button>
        )}

        {status === "A" && (
          <Button
            size="small"
            sx={{ color: "green" }}
            onClick={() => {
              if (isTokenVaild()) {
                const headers = {
                  Authorization: `Bearer ${getAccessToken()}`,
                };
                const requestBody = {
                  status: "B",
                };

                return_id(book.id);
                axios
                  .put(
                    `http://127.0.0.1:8000/api/home/return-request/${return_id(
                      book.id
                    )}/`,
                    requestBody,
                    {
                      headers: headers,
                    }
                  )
                  .then((response) => {
                    console.log(
                      "Return Book request successful:",
                      response.data
                    );
                    setRerender((prev) => !prev);
                  })
                  .catch((error) => {
                    console.error("Error returning book:", error);
                  });
              }
            }}
          >
            Return Book
          </Button>
        )}
        {status === "C" && <p sx={{ color: "red" }}>Already Read...</p> && (
          <Button
            size="small"
            sx={{ color: "orange" }}
            onClick={() => {
              if (isTokenVaild()) {
                const headers = {
                  Authorization: `Bearer ${getAccessToken()}`,
                };
                const requestBody = {
                  status: "B",
                };

                return_id(book.id);
                axios
                  .put(
                    `http://127.0.0.1:8000/api/home/re-request/${return_id(
                      book.id
                    )}/`,
                    requestBody,
                    {
                      headers: headers,
                    }
                  )
                  .then((response) => {
                    console.log("Request Book successful:", response.data);
                    setRerender((prev) => !prev);
                  })
                  .catch((error) => {
                    console.error("Error re-requesting book:", error);
                  });
              }
            }}
          >
            Request Again
          </Button>
        )}
        {status === "B" && <p>Return Pending...</p>}
        {status === "P" && <p>Book Request Pending...</p>}
      </CardActions>
    </Card>
  );
};

export default BookCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { isTokenVaild } from "../../utils/authUtils";
import { URL } from "../../constants";

const BookDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVaild() === false) {
      navigate("/login/");
    }
    axios
      .get(`${URL}/api/home/book-view-set/${id}/`)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => {
        console.log("Error getting data!");
        console.error("Error data: ", error);
      });
  }, []);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: "50%", margin: "50px" }}>
        <CardMedia sx={{ height: 140 }} image="/book.jpeg" title="book" />
        {detail.id ? (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Name : {detail?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID : {detail?.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author : {detail?.author_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publisher : {detail?.publisher_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available Copies : {detail?.number_of_books}
            </Typography>
          </CardContent>
        ) : (
          <h3>Sorry the book is not found</h3>
        )}
      </Card>
    </Stack>
  );
};

export default BookDetail;

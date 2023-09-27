import React, { useEffect, useState } from "react";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { isTokenVaild } from "../../utils/authUtils";
import { URL } from "../../constants";
import { DetailCard, CustomStack } from "../../emotionStyle";

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
  });

  return (
    <CustomStack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <DetailCard sx={{ width: "50%", margin: "50px" }}>
        <CardMedia sx={{ height: 140 }} image="/book.jpeg" title="book" />
        {detail.id ? (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Name : {detail?.name}
            </Typography>
            <Typography variant="body2">ID : {detail?.id}</Typography>
            <Typography variant="body2">
              Author : {detail?.author_name}
            </Typography>
            <Typography variant="body2">
              Publisher : {detail?.publisher_name}
            </Typography>
            <Typography variant="body2">
              Available Copies : {detail?.number_of_books}
            </Typography>
          </CardContent>
        ) : (
          <h3>Sorry the book is not found</h3>
        )}
      </DetailCard>
    </CustomStack>
  );
};

export default BookDetail;

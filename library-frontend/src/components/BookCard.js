import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
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
        <Button size="small" color="primary" onClick={()=>{
          navigate(`/book/${book?.id}`)
        }}>
          Detail
        </Button>
        {book.number_of_books ? (
          <Button size="small" color="primary">
            Get
          </Button>
        ): null}
      </CardActions>
    </Card>
  );
};

export default BookCard;

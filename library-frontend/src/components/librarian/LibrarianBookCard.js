import React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

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
        <EditModal book={book} setReRender={setReRender}/>
        
        <DeleteModal id={book?.id} setReRender={setReRender}/>
      </CardActions>
    </Card>
  );
};

export default LibrarianBookCard;

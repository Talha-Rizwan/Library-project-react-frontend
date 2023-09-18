import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const BookCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/book.jpeg"
          alt="book"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name : Book Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: Author Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher : Publisher
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Copies Available : 10
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Get
        </Button>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
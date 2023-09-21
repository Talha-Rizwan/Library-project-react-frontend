import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const RequestCard = ({ request }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Request id: {request?.id}
        </Typography>
        <Typography variant="h5" component="div">
          Book Name : {request?.requested_book}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          User : {request?.request_user}
        </Typography>
        <Typography variant="body2">
          Date : {request?.created.slice(0, 10)}
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Status : {request?.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;

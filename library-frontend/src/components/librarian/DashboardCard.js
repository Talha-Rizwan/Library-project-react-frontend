import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ name, url, description }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minWidth: 275, border: "1px solid black" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/librarian/${url}`);
          }}
        >
          Go To {name}
        </Button>
      </CardActions>
    </Box>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
};

export default DashboardCard;

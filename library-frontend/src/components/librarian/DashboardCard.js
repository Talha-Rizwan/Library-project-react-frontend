import React from "react";
import PropTypes from "prop-types";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { BoxStyles } from "../../emotionStyle";

const DashboardCard = ({ name, url, description }) => {
  const navigate = useNavigate();
  return (
    <BoxStyles>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography>{description}</Typography>
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
    </BoxStyles>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
};

export default DashboardCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken, isTokenVaild } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import RequestList from "../../components/librarian/RequestList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LibrarianHome = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState();

  useEffect(() => {
    if (isTokenVaild()) {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`http://127.0.0.1:8000/api/home/request/`, {
          headers: headers,
        })
        .then((response) => {
          setRequests(response.data);
          console.log("the requests are : ", requests);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Box>
        <Stack spacing={10} direction="column" alignItems="center">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: "blue", textDecoration: "underline" }}
          >
            All Requests
          </Typography>
          <Item>
            <Typography variant="h3" gutterBottom>
              Pending Requests
            </Typography>
            <RequestList
              requests={requests?.filter((request) => request?.status === "P")}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Approved Requests
            </Typography>
            <RequestList
              requests={requests?.filter((request) => request?.status === "A")}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Return Requests
            </Typography>
            <RequestList
              requests={requests?.filter((request) => request?.status === "B")}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Closed Requests
            </Typography>
            <RequestList
              requests={requests?.filter((request) => request?.status === "C")}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Rejected Requests
            </Typography>
            <RequestList
              requests={requests?.filter((request) => request?.status === "R")}
            />
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default LibrarianHome;

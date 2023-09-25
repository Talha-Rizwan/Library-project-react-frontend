import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { TICKET_STATUS, URL } from "../../constants";
import {
  getAccessToken,
  isLibrarian,
  isTokenVaild,
} from "../../utils/authUtils";
import TicketList from "../../components/librarian/TicketList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTicket] = useState();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (isTokenVaild() && isLibrarian() === "true") {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`${URL}/api/home/ticket/`, {
          headers: headers,
        })
        .then((response) => {
          setTicket(response.data);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else {
      navigate("/");
    }
  }, [rerender]);

  return (
    <div>
      <Box>
        <Stack spacing={10} direction="column" alignItems="center">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: "blue", textDecoration: "underline" }}
          >
            All Tickets
          </Typography>
          <Item>
            <Typography variant="h3" gutterBottom>
              Pending Tickets
            </Typography>
            <TicketList
              tickets={tickets?.filter(
                (tickets) => tickets?.status === TICKET_STATUS.PENDING_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Approved Tickets
            </Typography>
            <TicketList
              tickets={tickets?.filter(
                (tickets) => tickets?.status === TICKET_STATUS.APPROVED_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Rejected Tickets
            </Typography>
            <TicketList
              tickets={tickets?.filter(
                (tickets) => tickets?.status === TICKET_STATUS.REJECTED_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default Tickets;

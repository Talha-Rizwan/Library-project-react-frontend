import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import { REQUEST_STATUS, URL } from "../../constants";
import {
  getAccessToken,
  isTokenVaild,
  isLibrarian,
} from "../../utils/authUtils";
import BookList from "../../components/user/BookList";
import { CustomHeading, CustomStack } from "../../emotionStyle";
import { getBookAction } from "../../actions/BookActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyBooks = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const LibraryBooks = useSelector((state) => state.books);

  const getLibraryBooks = (items) => {
    dispatch(getBookAction(items));
  };

  useEffect(() => {
    if (isTokenVaild() && isLibrarian() === "false") {
      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };
      axios
        .get(`${URL}/api/home/request-set/`, {
          headers: headers,
        })
        .then((response) => {
          getLibraryBooks(response.data);
        })
        .catch((error) => {
          console.log("Error getting data!");
          console.error("Error data: ", error);
        });
    } else if (isLibrarian() === "true") {
      navigate("/librarian/");
    } else {
      navigate("/login");
    }
  }, [rerender]);

  return (
    <div>
      <Box>
        <CustomStack
          spacing={{ xs: 10, sm: 10, md: 10 }}
          direction={{ xs: "column", sm: "column" }}
          justifyContent="center"
          alignItems="center"
        >
          <CustomHeading variant="h3" gutterBottom>
            My Books
          </CustomHeading>
          <Item>
            <Typography variant="h3" gutterBottom>
              Issued Books
            </Typography>
            <BookList
              books={LibraryBooks?.filter(
                (book) => book.status === REQUEST_STATUS.APPROVED_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Requested Books
            </Typography>
            <BookList
              books={LibraryBooks?.filter(
                (book) => book.status === REQUEST_STATUS.PENDING_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Return Pending Books
            </Typography>
            <BookList
              books={LibraryBooks?.filter(
                (book) => book.status === REQUEST_STATUS.RETURN_REQUEST_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
          <Item>
            <Typography variant="h3" gutterBottom>
              Returned Books
            </Typography>
            <BookList
              books={LibraryBooks?.filter(
                (book) => book.status === REQUEST_STATUS.CLOSED_STATUS
              )}
              setRerender={setRerender}
            />
          </Item>
        </CustomStack>
      </Box>
    </div>
  );
};

export default MyBooks;

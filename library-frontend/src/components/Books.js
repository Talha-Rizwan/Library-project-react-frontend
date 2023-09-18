import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import BookCard from "./BookCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Books = () => (
  <Stack
    useFlexGap flexWrap="wrap"
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    justifyContent="center"
    alignItems="center"
  >
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
    <Item><BookCard /></Item>
  </Stack>
);

export default Books;

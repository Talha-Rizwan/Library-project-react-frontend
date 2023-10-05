import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "./types";

export function getBookAction(items) {
  return {
    type: GET_BOOKS,
    data: items,
  };
}

export function addBookAction(items) {
  return {
    type: ADD_BOOK,
    data: items,
  };
}

export function updateBookAction(items) {
  return {
    type: UPDATE_BOOK,
    data: items,
  };
}

export function deleteBookAction(items) {
  return {
    type: DELETE_BOOK,
    data: items,
  };
}

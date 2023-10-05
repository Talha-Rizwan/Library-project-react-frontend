import {
  GET_BOOKS,
  GET_SEARCH_VALUE,
  UPDATE_SEARCH_VALUE,
} from "../actions/types";

const productReducer = (state = { searchValue: "", books: [] }, action) => {
  if (action.type === GET_SEARCH_VALUE) {
    return {
      searchValue: action.data,
      books: state.books,
    };
  }

  if (action.type === UPDATE_SEARCH_VALUE) {
    return {
      searchValue: action.data,
      books: state.books,
    };
  }

  if (action.type === GET_BOOKS) {
    return {
      searchValue: state.searchValue,
      books: action.data,
    };
  }

  return state;
};

export default productReducer;

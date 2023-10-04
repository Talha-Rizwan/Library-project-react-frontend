import { GET_SEARCH_VALUE, UPDATE_SEARCH_VALUE } from "../actions/types";

const productReducer = (state = { searchValue: [] }, action) => {
  if (action.type === GET_SEARCH_VALUE) {
    return {
      searchValue: action.data,
    };
  }

  if (action.type === UPDATE_SEARCH_VALUE) {
    return {
      searchValue: action.data,
    };
  }

  return state;
};

export default productReducer;

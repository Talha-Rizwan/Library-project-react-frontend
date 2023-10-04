import { GET_SEARCH_VALUE, UPDATE_SEARCH_VALUE } from "./types";

export function getSearchAction(items) {
  return {
    type: GET_SEARCH_VALUE,
    data: items,
  };
}

export function updateSearchAction(items) {
  return {
    type: UPDATE_SEARCH_VALUE,
    data: items,
  };
}

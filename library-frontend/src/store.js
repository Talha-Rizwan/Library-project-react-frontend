import { createStore } from "redux";

import productReducer from "./reducers/SearchReducers";

const store = createStore(productReducer);

export default store;

import { createStore } from "redux";

import productReducer from "./reducers/index";

const store = createStore(productReducer);

export default store;

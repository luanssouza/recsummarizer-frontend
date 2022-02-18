import { createStore, combineReducers } from "redux";

import recommendationsReducer from "./reducers/recommendation/recommendation";
import itemsReducer from "./reducers/items/items";
import userReducer from "./reducers/user/user";

const reducers = combineReducers({
  recommendations: recommendationsReducer,
  items: itemsReducer,
  user: userReducer
});

export const store = createStore(reducers);

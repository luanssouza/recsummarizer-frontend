import { createStore, combineReducers } from "redux";

import recommendationsReducer from "./reducers/recommendation/recommendation";
import explanationReducer from "./reducers/explanation/explanation";
import itemsReducer from "./reducers/items/items";
import userReducer from "./reducers/user/user";

const reducers = combineReducers({
  recommendations: recommendationsReducer,
  explanation: explanationReducer,
  items: itemsReducer,
  user: userReducer
});

export const store = createStore(reducers);

import { createStore, combineReducers } from "redux";

import recommendationsReducer from "./reducers/recommendation/recommendation";

const reducers = combineReducers({
  recommendations: recommendationsReducer,
});

export const store = createStore(reducers);

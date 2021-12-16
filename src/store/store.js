import { createStore, combineReducers } from "redux";

import recommendationsReducer from "./reducers/recommendation/recommendation";
import itensReducer from "./reducers/itens/itens";
import userReducer from "./reducers/user/user";

const reducers = combineReducers({
  recommendations: recommendationsReducer,
  itens: itensReducer,
  user: userReducer
});

export const store = createStore(reducers);

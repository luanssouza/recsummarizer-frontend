import { createStore, combineReducers } from "redux";

import recommendationsReducer from "./reducers/recommendation/recommendation";
import itensReducer from "./reducers/itens/itens";

const reducers = combineReducers({
  recommendations: recommendationsReducer,
  itens: itensReducer,
});

export const store = createStore(reducers);

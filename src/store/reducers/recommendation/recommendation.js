import { ADD_RECOMMENDATION } from "../../actions/actionsConst";

const recommendationReducer =  (state = {}, action) => {
  switch (action.type) {
    case ADD_RECOMMENDATION:
      return {
        ...state,
        recommendations: action.payload,
      };
    default:
      return state;
  }
};

export default recommendationReducer;
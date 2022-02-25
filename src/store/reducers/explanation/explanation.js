import { ADD_EXPLANATION } from '../../actions/actionsConst';

const explanationReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_EXPLANATION:
            return {
                ...state,
                explanation: action.payload
            };
        default:
            return state;
    }
}

export default explanationReducer;
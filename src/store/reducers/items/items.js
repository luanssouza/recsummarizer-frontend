import { ADD_ITEMS } from '../../actions/actionsConst';

const itemsReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}

export default itemsReducer;
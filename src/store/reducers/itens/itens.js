import { ADD_ITENS } from '../../actions/actionsConst';

const itensReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_ITENS:
            return {
                ...state,
                itens: action.payload
            };
        default:
            return state;
    }
}

export default itensReducer;
import * as actions from "../actions/actionTypes";
import data from "../../constants/Data.json";

const initialState = data;

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.UPDATE_BOOKING:
            const idx = state.findIndex((user => user.id === action.payload.id));
            const updatedUser = { ...action.payload, status: action.payload.status }
            const newState = [
                ...state.slice(0, idx),
                updatedUser,
                ...state.slice(idx + 1)
            ];
            return newState;
        case actions.ADD_BOOKING:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reducer;
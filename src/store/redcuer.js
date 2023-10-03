import { ADD_TEAM_MEMBER } from '../constants/constant';

const initialState = {
    team: [],
};
export const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM_MEMBER:
            return {
                ...state,
                team: action.payload,
            };
        default:
            return state;
    }
};

import { ADD_TEAM_MEMBER } from '../constants/constant';

export const addTeamMember = (data) => {
    return {
        type: ADD_TEAM_MEMBER,
        payload: data,
    };
};

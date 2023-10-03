import React, { useEffect, useState, useCallback, FlatList } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import UserCard from '../components/UserCard';

const TeamScreen = (props) => {
    // const teamMembers = useSelector((state) => {
    //     console.log(state.teamReducer.team);
    //     return state.teamReducer.team;
    // });
    // useEffect(() => setTeam(teamMembers), [teamMembers]);
    console.log(props);
    const teamMembers = props.route.params.teamMembers;
    return (
        <View style={{ marginTop: 50 }}>
            {teamMembers.length > 0 ? (
                teamMembers.map((teamMember) => (
                    <UserCard user={teamMember} add={false} />
                ))
            ) : (
                <></>
            )}
        </View>
    );
};

export default TeamScreen;

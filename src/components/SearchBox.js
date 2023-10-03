import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Searchbar, Title } from 'react-native-paper';

const SearchBox = ({ onSearch, searchTerm, handleSearchPress, reset }) => {
    return (
        <Searchbar
            style={styles.screen}
            placeholder='Search'
            onChangeText={onSearch}
            value={searchTerm}
            onIconPress={handleSearchPress}
            onClearIconPress={reset}
        />
    );
};

export default SearchBox;

const styles = StyleSheet.create({
    screen: {
        width: '85%',
        // backgroundColor: '#fffc',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 2,
        // elevation: 5,
        // borderRadius: 50,
        // borderWidth: 1,
    },
});

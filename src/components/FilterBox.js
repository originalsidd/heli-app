import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Avatar } from 'react-native-paper';

const FilterBox = ({ onFilter, setModalVisible }) => {
    const [filters, setFilters] = useState({
        domain: '',
        gender: '',
        available: false,
    });

    const applyFilters = () => {
        setModalVisible(true);
        onFilter(filters);
    };

    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={applyFilters}>
                <Avatar.Icon size={50} icon='filter' />
            </TouchableOpacity>
        </View>
    );
};

export default FilterBox;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
});

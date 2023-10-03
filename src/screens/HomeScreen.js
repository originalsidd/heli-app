import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    FlatList,
    Button,
    StyleSheet,
    SafeAreaView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import UserCard from '../components/UserCard';
import SearchBox from '../components/SearchBox';
import FilterBox from '../components/FilterBox';
import TeamScreen from './TeamScreen';
import users from '../data/mockData.json';
import {
    Avatar,
    Modal,
    Portal,
    Text,
    TextInput,
    RadioButton,
} from 'react-native-paper';
import CheckBox from 'expo-checkbox';
import { useDispatch } from 'react-redux';
import { addTeamMember } from '../store/action';

const HomeScreen = (props) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [filters, setFilters] = useState({
        domain: '',
        gender: '',
        available: false,
    });
    const [newDom, setDom] = useState('');
    const [newGen, setGen] = useState('');
    const [newAv, setAv] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isTeamScreenVisible, setIsTeamScreenVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        applyFilters();
    }, [filters, users]);

    const applyFilters = () => {
        const filtered = users.filter((user) => {
            const domainMatch =
                !filters.domain ||
                user.domain.toUpperCase() === filters.domain.toUpperCase();
            const genderMatch =
                !filters.gender || user.gender === filters.gender;
            const availableMatch =
                !filters.available || user.available === filters.available;

            return domainMatch && genderMatch && availableMatch;
        });

        setFilteredUsers(filtered);
    };

    const handleSearchPress = () => {
        setSearchLoading(true);
        const filtered = users.filter((user) => {
            const name = user.first_name + user.last_name;
            const itemData = name ? name.toUpperCase() : ''.toUpperCase();
            const textData = searchTerm.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilteredUsers(filtered);
        setSearchLoading(false);
    };

    const handleAddToTeam = (user) => {
        const isUniqueDomain = teamMembers.every(
            (member) => member.domain !== user.domain
        );
        if (isUniqueDomain && user.available) {
            setTeamMembers([...teamMembers, user]);
        }
    };

    useEffect(() => {
        if (teamMembers != []) {
            dispatch(addTeamMember(teamMembers));
        }
        if (teamMembers.length == 2) {
            props.navigation.navigate('Team', { teamMembers: teamMembers });
        }
    }, [teamMembers]);

    const toggleTeamScreen = () => {
        setIsTeamScreenVisible(!isTeamScreenVisible);
    };

    const handleModal = () => {
        setModalVisible(!modalVisible);
        setFilters({
            ...filters,
            domain: newDom,
            gender: newGen,
            available: newAv,
        });
    };

    const handleModalClear = () => {
        setModalVisible(!modalVisible);
        setFilters({
            domain: '',
            gender: '',
            available: false,
        });
        setDom('');
        setGen('');
        setAv(false);
    };

    const _renderitem = useCallback(({ item }) => (
        <UserCard user={item} onAddToTeam={handleAddToTeam} add />
    ));

    const _renderloading = () => {
        if (filteredUsers.length === users.length)
            <ActivityIndicator size='large' color='#0000ff' />;
    };

    const resetSearch = () => {
        setFilteredUsers(users);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <SearchBox
                    onSearch={setSearchTerm}
                    searchTerm={searchTerm}
                    handleSearchPress={handleSearchPress}
                    reset={resetSearch}
                />
                <FilterBox
                    onFilter={setFilters}
                    setModalVisible={setModalVisible}
                />
            </View>
            {searchLoading && <Text>Loading</Text>}
            <Portal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onDismiss={handleModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text variant='titleLarge'>Set Filters</Text>
                            <View style={styles.rowModal}>
                                <Text>Domain:</Text>
                                <TextInput
                                    mode='outlined'
                                    style={styles.domain}
                                    value={newDom}
                                    onChangeText={setDom}
                                />
                            </View>
                            <View style={styles.rowModal}>
                                <Text>Gender:</Text>
                                <View>
                                    <View style={styles.rowGen}>
                                        <Text>Male</Text>
                                        <RadioButton
                                            value='Male'
                                            status={
                                                newGen === 'Male'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() =>
                                                newGen === 'Male'
                                                    ? setGen('')
                                                    : setGen('Male')
                                            }
                                        />
                                    </View>
                                    <View style={styles.rowGen}>
                                        <Text>Female</Text>
                                        <RadioButton
                                            value='Female'
                                            status={
                                                newGen === 'Female'
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            onPress={() =>
                                                newGen === 'Female'
                                                    ? setGen('')
                                                    : setGen('Female')
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rowModal}>
                                <Text>Available</Text>
                                <CheckBox
                                    disabled={false}
                                    value={newAv}
                                    onValueChange={(newValue) => {
                                        console.log(newValue);
                                        setAv(!newAv);
                                    }}
                                />
                            </View>
                            <Pressable
                                style={{
                                    ...styles.buttonClose,
                                }}
                                onPress={handleModal}
                            >
                                <Text style={styles.textStyle}>Apply</Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    ...styles.buttonClose,
                                }}
                                onPress={handleModalClear}
                            >
                                <Text style={styles.textStyle}>Clear</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Portal>
            {filteredUsers.length > 0 && (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={_renderitem}
                    onEndReachedThreshold={0.7}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    estimatedItemSize={50}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingBottom: 100,
                    }}
                    ListFooterComponent={_renderloading}
                />
            )}
            {filteredUsers.length === 0 && (
                <View>
                    <Text>No results found</Text>
                </View>
            )}
            {/* <Button title='Add To Team' onPress={toggleTeamScreen} /> */}
            {/* {isTeamScreenVisible && <TeamScreen teamMembers={teamMembers} />} */}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 5,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        marginTop: 20,
        marginBottom: 10,
        gap: 10,
    },
    centeredView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        zIndex: 100,
        height: 400,
        width: '80%',
        justifyContent: 'space-around',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    rowModal: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    rowGen: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        width: 100,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    domain: {
        height: 40,
        width: 150,
    },
});

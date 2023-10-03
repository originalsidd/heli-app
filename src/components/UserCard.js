import React, { memo } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    List,
    PaperProvider,
    Image,
    Avatar,
    Text,
} from 'react-native-paper';

const UserCard = ({ user, onAddToTeam, add }) => {
    const handleAddToTeam = () => {
        onAddToTeam(user);
    };

    return (
        <Card style={user.gender === 'Female' ? styles.card1 : styles.card2}>
            <Card.Content>
                <View style={styles.cardSplit}>
                    <View style={styles.cardLeft}>
                        <Text
                            variant='titleMedium'
                            style={{ fontWeight: 'bold' }}
                        >
                            {user.first_name} {user.last_name}
                        </Text>
                        <Text variant='labelMedium'>{user.domain}</Text>
                        {user.available && add ? (
                            <View style={styles.add}>
                                <Text style={styles.addText}>Add To Team </Text>
                                <TouchableOpacity onPress={handleAddToTeam}>
                                    <Avatar.Icon size={40} icon='plus' />
                                </TouchableOpacity>
                            </View>
                        ) : add ? (
                            <Paragraph>Not Available</Paragraph>
                        ) : (
                            <></>
                        )}
                    </View>
                    <Avatar.Image
                        style={styles.cardAvatar}
                        size={60}
                        source={{ uri: user.avatar }}
                    />
                </View>
            </Card.Content>
        </Card>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    card1: {
        marginBottom: 20,
        borderColor: '#f4f7',
        borderWidth: 2,
    },
    card2: {
        marginBottom: 20,
        borderColor: '#55f7',
        borderWidth: 2,
    },
    cardSplit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    add: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addText: {
        fontStyle: 'italic',
    },
});

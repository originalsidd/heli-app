import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import TeamScreen from '../screens/TeamScreen';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name='home'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Team'
                component={TeamScreen}
                options={{
                    tabBarLabel: 'Team',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name='account-multiple'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;

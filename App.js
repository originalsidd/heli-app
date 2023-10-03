// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import AppNavigator from './src/navigation/AppNavigator';
import { configureStore } from './src/store/configureStore';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Provider } from 'react-redux';

const store = configureStore();

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={MD3LightTheme}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => App);

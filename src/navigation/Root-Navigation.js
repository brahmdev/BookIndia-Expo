import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import NavigationService from "./Navigation-Service";
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/signin';
import SplashScreen from '../screens/splash';
import ModalScreen from '../screens/modal';

const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
    }
);

const AppStackNavigation = createStackNavigator(
    {
        Main: HomeScreen,
    }, {
        mode: 'modal',
        headerMode: 'none'
    }
);

const FlowNavigator = createSwitchNavigator(
    {
        Splash: SplashScreen,
        App: AppStackNavigation,
        Auth: AuthStack
    }, {
        initialRouteName: 'Splash',
        mode: 'modal',
        headerMode: 'none'
    }
);

const TopLevelStack = createStackNavigator(
    {
        Modal: ModalScreen,
        Application: FlowNavigator,
    }, {
        initialRouteName: 'Application',
        mode: 'modal',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(TopLevelStack);

const handleNavigationChange = (prevState, newState, action) => {
};

const RootNavigation = () => <AppContainer
    onNavigationStateChange={handleNavigationChange}
    ref={NavigationService.setTopLevelNavigator} />;

export default RootNavigation;
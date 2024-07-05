import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingScreen';
import AboutScreen from './components/AboutScreen';
import VacationScreen from './components/VacationScreen';
import { ValueProvider } from './components/ValueContext'; // Import ValueProvider from your context file
import Tips from './components/Tips';
import SecondvScreen from './components/SecondvScreen';
import AmountScreen from './components/AmountScreen';
import GTPScreen from './components/GTPScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
AsyncStorage.setItem('initial_key', 'initial_value');

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFA500', // Darker orange color
        },
        headerTintColor: '#FFF', // White text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Vacation" component={VacationScreen} />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="SecondvScreen" component={SecondvScreen} />
      <Stack.Screen name="AmountScreen" component={AmountScreen} />
      <Stack.Screen name='GTPScreen' component={GTPScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const data = { username: '', password: '' };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#FF8C00', // Orange color
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#FFE5B4' }, // Light background color
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}


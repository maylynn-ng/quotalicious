import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from "./screens/Dashboard";
import FavoriteList from './screens/favoriteList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen 
          name="Dashboard"
          component={Dashboard} />
        <Stack.Screen
          name="FavoriteList"
          component={FavoriteList} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}
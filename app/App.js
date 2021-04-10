import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './src/screens/welcome';
import Signin from './src/screens/login';
import Signup from './src/screens/register';



const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
    >
      <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Signin" 
        component={Signin} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ headerShown: false}} 
      />
    
     
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
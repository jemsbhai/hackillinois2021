import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './src/screens/welcome';
import Signin from './src/screens/login';
import Signup from './src/screens/register';
import Home from './src/screens/home';
import Dine from './src/screens/dine';
import Explore from './src/screens/explore';
import Restaurant from './src/screens/restaurant';
import Checkin from './src/screens/checkin';
import QRCheckin from './src/screens/qrcheckin';
import Reservation from './src/screens/reservation';
import ReserveQr from './src/screens/reserveqr';



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
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Dine" 
        component={Dine} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Explore" 
        component={Explore} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Restaurant" 
        component={Restaurant} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Checkin" 
        component={Checkin} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="QRCheckin" 
        component={QRCheckin} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Reservation" 
        component={Reservation} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="ReserveQR" 
        component={ReserveQr} 
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
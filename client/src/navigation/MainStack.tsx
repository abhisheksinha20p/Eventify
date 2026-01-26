import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import EventDetailsScreen from '../screens/attendee/EventDetailsScreen';
import QRScannerScreen from '../screens/organizer/QRScannerScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
    <Stack.Screen name="Tabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen 
        name="EventDetails" 
        component={EventDetailsScreen} 
        options={{ 
            title: 'Event Details',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
            headerShadowVisible: false
        }} 
    />
    <Stack.Screen 
        name="QR Scanner" 
        component={QRScannerScreen} 
        options={{ 
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#fff'
        }} 
    />
  </Stack.Navigator>
);

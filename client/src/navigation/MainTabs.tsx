import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
// Placeholder Screens
import FeedScreen from '../screens/attendee/FeedScreen';
import MyTicketsScreen from '../screens/attendee/MyTicketsScreen';
import OrganizerDashboard from '../screens/organizer/DashboardScreen';
import CreateEventScreen from '../screens/organizer/CreateEventScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      {user?.role === 'ORGANIZER' ? (
        <>
          <Tab.Screen name="Dashboard" component={OrganizerDashboard} />
          <Tab.Screen name="Create Event" component={CreateEventScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Events" component={FeedScreen} />
          <Tab.Screen name="My Tickets" component={MyTicketsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

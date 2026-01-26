import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import api from '../../services/api';
import MetricCard from '../../components/MetricCard';
import EventCard from '../../components/EventCard';
import Button from '../../components/ui/Button';

const DashboardScreen = ({ navigation }: any) => {
  const [metrics, setMetrics] = useState({ totalEvents: 0, pendingApprovals: 0 });
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      // Assuming existing endpoints or placeholders
      // In a real app, we'd have a dashboard-specific endpoint
      const response = await api.get('/events/public'); // Using public for demo
      setMyEvents(response.data);
      setMetrics({
        totalEvents: response.data.length,
        pendingApprovals: 5 // Mock
      });
    } catch (error) {
      console.error('Fetch dashboard error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading && !refreshing) {
    return <View className="flex-1 bg-background items-center justify-center"><ActivityIndicator color="#6366f1"/></View>;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1 px-6"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
      >
        <View className="py-6 flex-row justify-between items-center">
          <View>
            <Text className="text-white text-3xl font-extrabold">Dashboard</Text>
            <Text className="text-slate-400 text-base">Overview of your events</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-surface rounded-full items-center justify-center border border-slate-700">
             <Text className="text-xl">👤</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-8 space-x-4">
          <MetricCard label="Total Events" value={metrics.totalEvents} icon="📅" className="mr-4" />
          <MetricCard label="Pending" value={metrics.pendingApprovals} icon="⏳" />
        </View>

        <View className="flex-row mb-8 space-x-4">
           <TouchableOpacity 
             onPress={() => navigation.navigate('Create Event')}
             className="flex-1 bg-primary/10 border border-primary/30 p-4 rounded-3xl items-center"
           >
              <Text className="text-2xl mb-1">➕</Text>
              <Text className="text-primary font-bold">New Event</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             onPress={() => navigation.navigate('QR Scanner')}
             className="flex-1 bg-secondary/10 border border-secondary/30 p-4 rounded-3xl items-center"
           >
              <Text className="text-2xl mb-1">🔍</Text>
              <Text className="text-secondary font-bold">Scan QR</Text>
           </TouchableOpacity>
        </View>

        <View className="mb-4 flex-row justify-between items-end">
           <Text className="text-white text-xl font-bold">My Events</Text>
           <TouchableOpacity><Text className="text-primary text-sm font-semibold">See all</Text></TouchableOpacity>
        </View>

        {myEvents.map((event: any) => (
          <EventCard 
            key={event._id}
            event={event}
            onPress={() => navigation.navigate('EventDetails', { eventId: event._id })}
          />
        ))}

        {myEvents.length === 0 && (
          <View className="bg-surface p-10 rounded-3xl border border-slate-700 items-center">
             <Text className="text-slate-500 mb-4 italic">No events created yet.</Text>
             <Button title="Create Your First Event" onPress={() => navigation.navigate('Create Event')} />
          </View>
        )}
        
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

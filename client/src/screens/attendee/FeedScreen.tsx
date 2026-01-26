import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, SafeAreaView } from 'react-native';
import api from '../../services/api';
import EventCard from '../../components/EventCard';

const FeedScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState('New York'); // Mock city for now, should come from user profile

  const fetchEvents = async () => {
    try {
      // PRD: Public events filtered by city
      const response = await api.get(`/events/public?city=${city}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Fetch events error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [city]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4">
        <Text className="text-white text-3xl font-extrabold mb-1">Explore</Text>
        <Text className="text-slate-400 text-base mb-4">Upcoming events in {city}</Text>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            onPress={() => navigation.navigate('EventDetails', { eventId: item._id })} 
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Text className="text-slate-500 text-lg">No events found in this city.</Text>
            <Text className="text-primary mt-2">Check back later!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default FeedScreen;

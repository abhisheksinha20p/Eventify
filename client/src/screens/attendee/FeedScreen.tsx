import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import EventCard from '../../components/EventCard';

const FeedScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState('New York');
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setError('');
    try {
      // PRD: Public events filtered by city
      const response = await api.get(`/events/public?city=${city}`);
      setEvents(response.data);
    } catch (err) {
      console.error('Fetch events error:', err);
      setError('Failed to load events. Please try again.');
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
        <View className="flex-row items-center bg-surface rounded-xl px-4 py-2 mb-4 border border-slate-700">
           <Text className="text-slate-400 mr-2">📍</Text>
           <TextInput
             className="flex-1 text-white font-semibold"
             value={city}
             onChangeText={setCity}
             placeholder="Enter City"
             placeholderTextColor="#64748b"
             onEndEditing={fetchEvents}
           />
        </View>
      </View>

      {error ? (
        <View className="items-center justify-center p-6">
           <Text className="text-red-500 text-center mb-4">{error}</Text>
           <TouchableOpacity onPress={fetchEvents} className="bg-surface px-4 py-2 rounded-lg">
             <Text className="text-white">Retry</Text>
           </TouchableOpacity>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import api from '../../services/api';
import Button from '../../components/ui/Button';

const EventDetailsScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Fetch event details error:', error);
      Alert.alert('Error', 'Failed to fetch event details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleJoin = async () => {
    setBookingLoading(true);
    try {
      // POST /bookings
      await api.post('/bookings', { 
        eventId, 
        slotId: event.slots[0]._id // Default to first slot for now
      });
      
      Alert.alert(
        'Success!', 
        'Your booking request has been submitted.',
        [{ text: 'View Tickets', onPress: () => navigation.navigate('My Tickets') }]
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Booking failed.';
      Alert.alert('Booking Error', message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
     return <View className="flex-1 bg-background items-center justify-center"><ActivityIndicator color="#6366f1"/></View>;
  }

  if (!event) {
     return <View className="flex-1 bg-background items-center justify-center"><Text className="text-white">Event not found.</Text></View>;
  }

  const isPaid = event.type === 'PAID';

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
         <View className="h-64 bg-slate-800">
            {event.imageUrl ? (
              <Image source={{ uri: event.imageUrl }} className="w-full h-full" />
            ) : (
                <View className="w-full h-full items-center justify-center"><Text className="text-6xl">🎉</Text></View>
            )}
         </View>

         <View className="p-6">
            <View className="flex-row justify-between items-center mb-4">
               <View className="bg-primary/20 px-3 py-1 rounded-full">
                  <Text className="text-primary font-bold text-xs">{event.type}</Text>
               </View>
               <Text className="text-slate-400 font-semibold">{event.city}</Text>
            </View>

            <Text className="text-white text-3xl font-bold mb-4">{event.title}</Text>
            
            <View className="mb-4">
                 <Text className="text-slate-400 text-xs uppercase tracking-wide">Location</Text>
                 <Text className="text-white text-base">{event.location?.address || 'Location TBD'}</Text>
            </View>

            <View className="flex-row items-center mb-6">
               <View className="bg-surface p-3 rounded-2xl mr-4 flex-1 border border-slate-700">
                  <Text className="text-slate-500 text-xs mb-1">Start Time</Text>
                  <Text className="text-white font-semibold">
                      {new Date(event.slots[0].startTime).toLocaleDateString()} {new Date(event.slots[0].startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
               </View>
               <View className="bg-surface p-3 rounded-2xl flex-1 border border-slate-700">
                  <Text className="text-slate-500 text-xs mb-1">Price</Text>
                  <Text className="text-accent font-bold">
                    {isPaid ? `$${(event.slots[0].price / 100).toFixed(2)}` : 'FREE'}
                  </Text>
               </View>
            </View>

            <Text className="text-slate-400 text-base leading-6 mb-8">
               {event.description || 'No description provided for this event. Join us for an amazing experience!'}
            </Text>

            <View className="bg-surface p-4 rounded-3xl border border-slate-700 mb-8">
               <Text className="text-white font-bold mb-2">Availability</Text>
               <View className="h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                  <View 
                    style={{ width: `${(event.slots[0].bookedCount / event.slots[0].capacity) * 100}%` }} 
                    className="h-full bg-primary" 
                  />
               </View>
               <Text className="text-slate-500 text-xs">
                  {event.slots[0].capacity - event.slots[0].bookedCount} of {event.slots[0].capacity} tickets remaining
               </Text>
            </View>
         </View>
      </ScrollView>

      <View className="p-6 bg-surface border-t border-slate-700">
         <Button 
           title={isPaid ? "Proceed to Payment" : "Join Event"} 
           onPress={handleJoin} 
           loading={bookingLoading}
         />
      </View>
    </View>
  );
};

export default EventDetailsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, SafeAreaView, Modal, Image, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import TicketCard from '../../components/TicketCard';
import Button from '../../components/ui/Button';

const MyTicketsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my');
      setBookings(response.data);
    } catch (error) {
      console.error('Fetch bookings error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const handleTicketPress = async (booking: any) => {
    if (booking.status !== 'APPROVED' && booking.status !== 'BOOKED') {
      return; // Only show QR for approved/booked tickets
    }

    setSelectedBooking(booking);
    setQrLoading(true);
    try {
      const response = await api.get(`/qr/${booking._id}`);
      setQrCode(response.data.code);
    } catch (error) {
       console.error('Fetch QR error:', error);
    } finally {
       setQrLoading(false);
    }
  };

  if (loading && !refreshing) {
    return <View className="flex-1 bg-background items-center justify-center"><ActivityIndicator color="#6366f1"/></View>;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4">
        <Text className="text-white text-3xl font-extrabold">My Tickets</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <TicketCard booking={item} onPress={() => handleTicketPress(item)} />
        )}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Text className="text-slate-500 text-lg">You haven't booked any events yet.</Text>
            <TouchableOpacity onPress={() => fetchBookings()} className="mt-4">
               <Text className="text-primary font-bold">Refresh</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* QR Code Modal */}
      <Modal
        visible={!!selectedBooking}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBooking(null)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-surface rounded-t-[40px] p-8 items-center border-t border-slate-700">
            <View className="w-12 h-1 bg-slate-700 rounded-full mb-8" />
            
            <Text className="text-white text-2xl font-bold mb-2">Your Entry Pass</Text>
            <Text className="text-slate-400 mb-8 text-center">{selectedBooking?.eventId?.title}</Text>
            
            <View className="bg-white p-6 rounded-3xl mb-8">
              {qrLoading ? (
                <View className="w-48 h-48 items-center justify-center">
                  <ActivityIndicator color="#6366f1" />
                </View>
              ) : (
                qrCode ? (
                  // In a real app, use a QR generator component. For this demo, we'll placeholder an image
                  <View className="w-48 h-48 items-center justify-center">
                     <Text className="text-black text-center text-xs mb-2">QR Payload:</Text>
                     <Text className="text-black text-center font-mono text-[8px]">{qrCode}</Text>
                     <View className="w-32 h-32 bg-slate-200 mt-2 items-center justify-center rounded-lg">
                        <Text className="text-3xl text-slate-800">🔳</Text>
                     </View>
                  </View>
                ) : (
                  <Text className="text-red-500">Failed to generate QR</Text>
                )
              )}
            </View>

            <Text className="text-slate-500 text-xs mb-8 text-center px-10">
              Present this code at the event entrance for verification. Do not share it with others.
            </Text>

            <Button title="Close" variant="outline" onPress={() => setSelectedBooking(null)} className="w-full" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyTicketsScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CreateEventScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('2025-12-20');
  const [time, setTime] = useState('19:00');
  const [type, setType] = useState<'PAID' | 'UNPAID'>('UNPAID');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('100');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !city || !address || !date || !time) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours default

      const payload = {
        title,
        description,
        imageUrl,
        city,
        location: {
            address,
            lat: 40.7128, // Mock
            lng: -74.0060
        },
        type,
        slots: [{
          startTime: startDateTime,
          endTime: endDateTime,
          capacity: parseInt(capacity),
          price: type === 'PAID' ? Math.round(parseFloat(price) * 100) : 0
        }]
      };

      await api.post('/events', payload);
      
      Alert.alert(
        'Success', 
        'Event created successfully!',
        [{ text: 'Great', onPress: () => navigation.navigate('Dashboard') }]
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create event.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1 p-6">
        <Text className="text-white text-3xl font-extrabold mb-8">New Event</Text>

        <View className="bg-surface p-6 rounded-3xl border border-slate-700 shadow-xl mb-6">
          <Input label="Event Title" placeholder="Music Festival 2025" value={title} onChangeText={setTitle} />
          <Input label="Description" placeholder="What's this event about?" value={description} onChangeText={setDescription} />
          <Input label="Image URL" placeholder="https://example.com/image.jpg" value={imageUrl} onChangeText={setImageUrl} />
          <Input label="City" placeholder="New York" value={city} onChangeText={setCity} />
          <Input label="Address" placeholder="123 Main St" value={address} onChangeText={setAddress} />
          
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
                 <Input label="Date (YYYY-MM-DD)" placeholder="2025-12-20" value={date} onChangeText={setDate} />
            </View>
            <View className="flex-1">
                 <Input label="Time (HH:MM)" placeholder="19:00" value={time} onChangeText={setTime} />
            </View>
          </View>

          <View className="flex-row mb-6 bg-slate-900 p-1 rounded-2xl">
            <TouchableOpacity 
              onPress={() => setType('UNPAID')}
              className={`flex-1 py-3 rounded-xl items-center ${type === 'UNPAID' ? 'bg-primary' : ''}`}
            >
              <Text className={`font-bold ${type === 'UNPAID' ? 'text-white' : 'text-slate-400'}`}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setType('PAID')}
              className={`flex-1 py-3 rounded-xl items-center ${type === 'PAID' ? 'bg-secondary' : ''}`}
            >
              <Text className={`font-bold ${type === 'PAID' ? 'text-white' : 'text-slate-400'}`}>Paid</Text>
            </TouchableOpacity>
          </View>

          {type === 'PAID' && (
            <Input label="Price ($)" placeholder="19.99" value={price} onChangeText={setPrice} keyboardType="numeric" />
          )}

          <Input label="Capacity" placeholder="100" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />

          <Button 
            title="Publish Event" 
            onPress={handleCreate} 
            loading={loading}
            variant={type === 'PAID' ? 'secondary' : 'primary'}
          />
        </View>
        
        <View className="h-20" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;

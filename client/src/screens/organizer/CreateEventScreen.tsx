import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CreateEventScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState<'PAID' | 'UNPAID'>('UNPAID');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('100');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !city) {
      Alert.alert('Error', 'Title and City are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        city,
        type,
        slots: [{
          startTime: new Date(), // Placeholder
          endTime: new Date(Date.now() + 3600000), // Placeholder
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
          <Input label="City" placeholder="New York" value={city} onChangeText={setCity} />
          
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

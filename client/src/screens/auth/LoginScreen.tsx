import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const LoginScreen = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleMockLogin = (role: 'ATTENDEE' | 'ORGANIZER') => {
    setAuth({ id: '1', email: 'test@demo.com', role }, 'mock-token');
  };

  return (
    <View className="flex-1 items-center justify-center bg-background p-6">
      <Text className="text-3xl font-bold text-white mb-8">Eventify</Text>
      
      <TouchableOpacity 
        className="w-full bg-primary p-4 rounded-xl mb-4 items-center"
        onPress={() => handleMockLogin('ATTENDEE')}
      >
        <Text className="text-white font-semibold">Login as Attendee (Mock)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="w-full bg-secondary p-4 rounded-xl items-center"
        onPress={() => handleMockLogin('ORGANIZER')}
      >
        <Text className="text-white font-semibold">Login as Organizer (Mock)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

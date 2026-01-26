import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const DashboardScreen = () => {
    const logout = useAuthStore(state => state.logout);
    
    return (
        <View className="flex-1 items-center justify-center bg-background p-6">
            <Text className="text-white text-xl mb-4">Organizer Dashboard</Text>
            <TouchableOpacity className="bg-red-500 p-3 rounded-lg" onPress={logout}>
                <Text className="text-white font-bold">Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardScreen;

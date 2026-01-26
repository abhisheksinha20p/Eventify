import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TicketCardProps {
  booking: any;
  onPress: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ booking, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': case 'BOOKED': return 'text-green-400';
      case 'PENDING_PAYMENT': return 'text-accent';
      case 'PENDING_APPROVAL': return 'text-primary';
      case 'REJECTED': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-surface border border-slate-700 rounded-3xl p-5 mb-4 shadow-md flex-row justify-between items-center"
    >
      <View className="flex-1">
        <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>
           {booking.eventId?.title || 'Event Title'}
        </Text>
        <Text className="text-slate-400 text-sm mb-3">Dec 20, 2025 • New York</Text>
        
        <View className="flex-row items-center">
           <View className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(booking.status).replace('text-', 'bg-')}`} />
           <Text className={`font-bold text-xs ${getStatusColor(booking.status)}`}>
             {booking.status.replace('_', ' ')}
           </Text>
        </View>
      </View>

      <View className="items-center justify-center bg-slate-800 w-16 h-16 rounded-2xl border border-slate-700">
         <Text className="text-white text-2xl">🎟️</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TicketCard;

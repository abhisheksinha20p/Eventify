import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    type: 'PAID' | 'UNPAID';
    city: string;
    slots: { price: number; capacity: number; bookedCount: number }[];
    imageUrl?: string;
  };
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const price = event.slots[0]?.price || 0;
  const isPaid = event.type === 'PAID';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-surface border border-slate-700 rounded-3xl mb-4 overflow-hidden shadow-lg"
    >
      <View className="h-48 bg-slate-800">
        {event.imageUrl ? (
          <Image source={{ uri: event.imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="text-slate-500 text-6xl">🎭</Text>
          </View>
        )}
        <View className="absolute top-4 right-4 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-600">
           <Text className={`font-bold ${isPaid ? 'text-accent' : 'text-green-400'}`}>
             {isPaid ? `$${(price / 100).toFixed(2)}` : 'FREE'}
           </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-2">
            <Text className="text-white text-xl font-bold" numberOfLines={1}>{event.title}</Text>
            <Text className="text-slate-400 text-sm">{event.city}</Text>
          </View>
        </View>

        <Text className="text-slate-500 text-sm mb-4" numberOfLines={2}>
          {event.description}
        </Text>

        <View className="flex-row justify-between items-center border-t border-slate-700 pt-3">
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-primary mr-2" />
            <Text className="text-slate-400 text-xs">
              {event.slots[0]?.capacity - event.slots[0]?.bookedCount} Slots left
            </Text>
          </View>
          <Text className="text-primary font-semibold text-xs text-right">View Details →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

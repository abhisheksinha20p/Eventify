import React from 'react';
import { View, Text } from 'react-native';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, className = "" }) => (
  <View className={`bg-surface border border-slate-700 p-4 rounded-3xl flex-1 ${className}`}>
    <Text className="text-2xl mb-2">{icon}</Text>
    <Text className="text-white text-2xl font-bold">{value}</Text>
    <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</Text>
  </View>
);

export default MetricCard;

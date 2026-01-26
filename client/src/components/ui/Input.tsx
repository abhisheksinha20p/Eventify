import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  className?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  className = "",
  keyboardType = 'default',
  autoCapitalize = 'sentences'
}) => {
  return (
    <View className={`w-full mb-4 ${className}`}>
      {label && <Text className="text-slate-400 text-sm mb-2 ml-1">{label}</Text>}
      <View className={`bg-surface border ${error ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-4 py-3`}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="text-white text-base"
        />
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};

export default Input;

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onPress, 
  title, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  className = ""
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': return 'bg-primary';
      case 'secondary': return 'bg-secondary';
      case 'outline': return 'border border-primary bg-transparent text-primary';
      case 'ghost': return 'bg-transparent';
      default: return 'bg-primary';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline': return 'text-primary';
      case 'ghost': return 'text-primary';
      default: return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`p-4 rounded-2xl items-center flex-row justify-center ${getVariantStyles()} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#6366f1' : 'white'} />
      ) : (
        <Text className={`font-bold text-base ${getTextStyles()}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

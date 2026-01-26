import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const setAuth = useAuthStore((state) => state.setAuth);

  const validate = () => {
    let newErrors: any = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      await setAuth(user, token);
      // RootNavigator handles switching to MainTabs based on token
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center">
          <View className="mb-10 items-center">
            <Text className="text-5xl font-extrabold text-white mb-2">Eventify</Text>
            <Text className="text-slate-400 text-lg">Your gateway to amazing events</Text>
          </View>

          <View className="bg-surface p-6 rounded-3xl border border-slate-700 shadow-xl">
            <Input 
              label="Email Address"
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input 
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <TouchableOpacity className="items-end mb-6">
              <Text className="text-primary font-semibold">Forgot Password?</Text>
            </TouchableOpacity>

            <Button 
              title="Log In" 
              onPress={handleLogin}
              loading={loading}
            />
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-400 text-base">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-secondary font-bold text-base">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

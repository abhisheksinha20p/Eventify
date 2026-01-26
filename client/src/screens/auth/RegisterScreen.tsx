import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ATTENDEE' | 'ORGANIZER'>('ATTENDEE');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post('/auth/register', { email, password, role });
      Alert.alert(
        'Success', 
        'Account created! Please log in.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed.';
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
          <View className="mb-8 p-1">
            <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
              <Text className="text-primary text-lg">← Back</Text>
            </TouchableOpacity>
            <Text className="text-4xl font-extrabold text-white mb-2">Create Account</Text>
            <Text className="text-slate-400 text-lg">Join the Eventify community</Text>
          </View>

          <View className="bg-surface p-6 rounded-3xl border border-slate-700 shadow-xl mb-6">
            <View className="flex-row mb-6 bg-slate-900 p-1 rounded-2xl">
              <TouchableOpacity 
                onPress={() => setRole('ATTENDEE')}
                className={`flex-1 py-3 rounded-xl items-center ${role === 'ATTENDEE' ? 'bg-primary' : ''}`}
              >
                <Text className={`font-bold ${role === 'ATTENDEE' ? 'text-white' : 'text-slate-400'}`}>Attendee</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setRole('ORGANIZER')}
                className={`flex-1 py-3 rounded-xl items-center ${role === 'ORGANIZER' ? 'bg-secondary' : ''}`}
              >
                <Text className={`font-bold ${role === 'ORGANIZER' ? 'text-white' : 'text-slate-400'}`}>Organizer</Text>
              </TouchableOpacity>
            </View>

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
              placeholder="Min 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <Button 
              title="Create Account" 
              onPress={handleRegister}
              loading={loading}
              variant={role === 'ORGANIZER' ? 'secondary' : 'primary'}
            />
          </View>

          <View className="flex-row justify-center mt-4">
            <Text className="text-slate-400 text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary font-bold text-base">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import api from '../../services/api';
import Button from '../../components/ui/Button';

const QRScannerScreen = ({ navigation }: any) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return <View className="flex-1 bg-background" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text className="text-white text-center text-lg mb-6">
          We need your permission to use the camera for scanning tickets.
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }: any) => {
    if (scanned || loading) return;
    
    setScanned(true);
    setLoading(true);

    try {
      // PRD: POST /qr/scan
      // Payload usually contains { code, bookingId }
      // Assuming data is a JSON string or specific ID
      let payload;
      try {
          payload = { code: data }; // Simplified: Assume QR code is the secret
      } catch (e) {
          payload = { code: data };
      }

      const response = await api.post('/qr/scan', payload);
      
      Alert.alert(
        'Access Granted!',
        `Booking ID: ${response.data.bookingId}`,
        [{ text: 'Next Scan', onPress: () => setScanned(false) }]
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid or Expired QR Code';
      Alert.alert(
        'Access Denied',
        message,
        [{ text: 'Try Again', onPress: () => setScanned(false) }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />
      
      <View className="flex-1 items-center justify-center">
         <View className="w-64 h-64 border-2 border-primary rounded-3xl" />
         <Text className="text-white mt-8 font-bold text-lg bg-black/50 px-4 py-2 rounded-full">
            Align QR Code inside the frame
         </Text>
      </View>

      <View className="absolute bottom-20 left-6 right-6">
         <Button title="Back to Dashboard" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default QRScannerScreen;

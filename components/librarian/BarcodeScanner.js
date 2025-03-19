import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScanner = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={({ data }) => onScan(data)}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default BarcodeScanner;

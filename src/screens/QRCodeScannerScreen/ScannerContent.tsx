import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinkButton } from '@elements';
import { goBack } from '@util/navigationService';
import BarCodeMask from './BarCodeMask';

export default function ScannerContent({
  hasCameraPermission,
  handleBarCodeScanned,
  modalContent,
  openSettings,
}) {
  if (hasCameraPermission === null) {
    return <Text>Requesting permission to access camera...</Text>;
  }

  if (hasCameraPermission === false) {
    return (
      <>
        <Text>No access to camera</Text>
        <Text>
          The app needs access to the camera to scan QR codes.
        </Text>
        <LinkButton
          text="Open Settings"
          onPress={openSettings}
        />
        <LinkButton
          text="Go Back"
          onPress={() => goBack()}
        />
      </>
    );
  }

  // assuming `hasCameraPermission` is true if the other two conditions failed
  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BarCodeMask />
      {modalContent}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Permissions from 'expo-permissions';

// TODO: install expo camera (as permissions is now deprecated)
// import { Camera } from 'expo-camera';

import useGlobalStore from '@state';
import { categoryImage } from '@util/donationCategory';
import openAppSettings from '@util/openAppSettings';
import { goBack } from '@util/navigationService';

import styles from './QRCodeScannerScreen.styles';
import ScannerContent from './ScannerContent';
import ScannerModal from './ScannerModal';

/*
  TODO: pretty sure this is a Donor Screen-- in the future we should probably
  break these out into respective folders.
  [e.g. `Donor/DonorDashboardScreen`, `Client/ClientClaimsScreen`, `Common/ContactScreen`] etc.
*/
export default function QRCodeScannerScreen(props) {
  const scanQrCode = useGlobalStore(state => state.scanQrCode);
  const jwt = useGlobalStore(state => state.jwt);
  const responseStatus = useGlobalStore(state => state.responseStatus);
  const claimedDonationsForClient = useGlobalStore(state => state.claimedDonationsForClient);
  const claimedDonation = useGlobalStore(state => state.claimedDonation);
  const setClaimedDonation = useGlobalStore(state => state.setClaimedDonation);

  const [ hasCameraPermission, setHasCameraPermission ] = useState<boolean | null>(null);
  const [ modalOn, setModalOn ] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const openSettings = () => openAppSettings().then(getPermissions);

  // TODO: implement
  // const [ scannerActive, setScannerActive ] = useState(true);
  const [ icon, setIcon ] = useState(() => categoryImage(''));

  const handleBarCodeScanned = async barcode => {
    if (claimedDonationsForClient) {
      const match = claimedDonationsForClient.filter(
        donation => (donation.status === 'claimed' && donation.claim.qr_code === barcode.data),
      );

      if (match[0] && jwt) {
        // TODO: setScannerActive(false);
        try {
          scanQrCode(jwt, barcode.data);
          if (responseStatus && responseStatus.code === 202) {
            setClaimedDonation(match[0]);
            setIcon(categoryImage(match[0].category));
            setModalOn(true);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setModalOn(true);
        console.log('No match found');
      }
    }
  };

  // Triggers when user clicks outside of modal.
  // Resets value of scanned, and sets modalOn to false.
  const handleDismiss = () => {
    setClaimedDonation(undefined);
    setModalOn(false);
    goBack();
  };

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ScannerContent
        hasCameraPermission={hasCameraPermission}
        handleBarCodeScanned={handleBarCodeScanned}
        modalContent={ScannerModal({
          claimedDonation, modalOn, handleDismiss, icon,
        })}
        navigation={navigation}
        openSettings={openSettings}
      />
    </View>
  );
}

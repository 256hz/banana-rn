import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';

import * as colors from '@util/colors';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import { Modal, TextButton, Icon, LinkButton } from '@elements';
import { ButtonStyle } from '@elements/Button';
import { categoryImage } from '@util/donationCategory';
import openAppSettings from '@util/openAppSettings';
import { IClaim, UseGlobalType } from '@state/index.types';
import { IDonation } from '../../../declarations';
import BarCodeMask from './BarCodeMask';
import styles from './QRCodeScannerScreen.styles';

function ScannerContent({ hasPermission, scanned, handleBarCodeScanned, goBack, getPermissions }) {
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return (
			<>
				<Text>No access to camera</Text>
				<Text>The app needs access to the camera to scan QR codes.</Text>
				<LinkButton text="Open Settings" onPress={() => openAppSettings().then(getPermissions)} />
				<LinkButton text="Go Back" onPress={() => goBack()} />
			</>
		);
	}

	return (
		<CameraView
			onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			style={StyleSheet.absoluteFillObject}
		>
			<BarCodeMask />
		</CameraView>
	);
}

function ModalContent({ modalOn, handleDismiss, claimedDonation, icon, getTime, getDate }) {
	if (!modalOn) return null;

	const buttonStyle: ButtonStyle = {
		default: {
			background: colors.NAVY_BLUE,
			foreground: colors.WHITE,
		},
	};

	return claimedDonation.food_name ? (
		<Modal title="ITEM DONATED" open={modalOn} onDismiss={handleDismiss} palette="secondary">
			<View style={styles.content}>
				<Image source={icon} style={styles.icon} />
				<Text style={styles.claimTitle}>{claimedDonation.food_name}</Text>
				<View style={{ ...styles.textContainer, marginBottom: -100 }}>
					<Icon name="user" color="blue" size={20} />
					<Text style={styles.textStyle}>{claimedDonation.claim.client_name}</Text>
				</View>
				<View
					style={{
						...styles.textContainer,
						marginTop: 'auto',
						marginBottom: -80,
					}}
				>
					<Icon name="time" color="blue" size={20} />
					<Text style={styles.textStyle}>
						{getTime()}
						{getDate()}
					</Text>
				</View>
				<TextButton text="OK" textStyle={styles.buttonTextStyle} buttonStyle={buttonStyle} onPress={handleDismiss} />
			</View>
		</Modal>
	) : (
		<Modal title="SOMETHING WENT WRONG" open={modalOn} onDismiss={handleDismiss} palette="secondary">
			<View style={styles.content}>
				<Image source={icon} style={styles.icon} />
				<Text style={{ ...styles.textStyle, fontWeight: 'bold' }}>PLEASE TRY AGAIN</Text>
				<View style={{ ...styles.errorContainer, marginVertical: 20 }}>
					<Text style={styles.errorStyle}>QR Code Scan was not successful.</Text>
					<Text style={styles.errorStyle}>If this issue is not resolved,</Text>
					<Text style={styles.errorStyle}>Please contact us.</Text>
				</View>
				<TextButton text="OK" textStyle={styles.buttonTextStyle} buttonStyle={buttonStyle} onPress={handleDismiss} />
			</View>
		</Modal>
	);
}

export default function QRCodeScannerScreen() {
	const { goBack } = useNavigation();
	const [state, actions] = useGlobal() as UseGlobalType;
	const { scan } = actions;
	const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
	const [modalOn, setModalOn] = useState(false);
	const [claimedDonation, setClaimedDonation] = useState({
		food_name: '',
		claim: { client_name: '' },
	});
	const [icon, setIcon] = useState(() => categoryImage(''));

	const getTime = () => {
		const date = new Date();
		const hh = date.getHours();
		const mm = date.getMinutes();
		const AMPM = hh > 12 ? 'PM' : 'AM';
		return `${hh > 12 ? hh % 12 : hh}:${mm < 10 ? '0'.concat(mm.toString()) : mm} ${AMPM} `;
	};

	const getDate = () => new Date().toDateString().slice(4).split(' ').join('/');

	const getPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		setHasCameraPermission(status === 'granted');
	};

	function isDonation(item: IDonation | IClaim): item is IDonation {
		return (item as IDonation).donor_id !== undefined;
	}

	const handleBarCodeScanned = ({ data }) => {
		// eslint-disable-next-line max-len
		const matches = state.donationsOrClaims?.filter(
			d => isDonation(d) && d.status === 'claimed' && d.claim?.qr_code === data && d.claim?.client_name !== undefined
		);
		if (matches && matches.length > 0) {
			const match = matches[0];
			scan(data).then(res => {
				if (res.code === 202) {
					// Ensure match is treated and structured as Donation
					const donation = match as IDonation;
					setClaimedDonation({
						food_name: donation.food_name,
						claim: {
							client_name: donation.claim?.client_name as unknown as string,
						},
					});
					setIcon(categoryImage(donation.category.toString()));
					setModalOn(true);
				}
			});
		} else {
			setModalOn(true);
			console.log('No match found');
		}
	};

	const handleDismiss = () => {
		setClaimedDonation({ food_name: '', claim: { client_name: '' } });
		setModalOn(false);
		goBack();
	};

	useEffect(() => {
		getPermissions();
	}, []);

	return (
		<View style={styles.container}>
			<ScannerContent
				hasPermission={hasCameraPermission}
				handleBarCodeScanned={handleBarCodeScanned}
				goBack={goBack}
				getPermissions={getPermissions}
				scanned={claimedDonation}
			/>
			<ModalContent
				modalOn={modalOn}
				handleDismiss={handleDismiss}
				claimedDonation={claimedDonation}
				icon={icon}
				getTime={getTime}
				getDate={getDate}
			/>
		</View>
	);
}

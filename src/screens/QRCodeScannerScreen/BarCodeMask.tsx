import React from 'react';
// import { useNavigation } from 'react-navigation-hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Icon } from '@elements';
import styles from './BarCodeMask.styles';

export default function () {
	const { goBack } = useNavigation();
	return (
		<>
			<View style={styles.reticleUL} />
			<View style={styles.reticleUR} />
			<View style={styles.reticleDL} />
			<View style={styles.reticleDR} />
			<View style={styles.background} />
			<View style={styles.xContainer}>
				<TouchableWithoutFeedback onPress={() => goBack()}>
					<Icon name="chevron-left" size={48} color="gray" />
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => goBack()}>
					<Icon name="close" size={48} color="gray" />
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Align QR code</Text>
				<Text style={styles.text}>within frame to scan</Text>
			</View>
		</>
	);
}

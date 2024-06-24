import React, { useState } from 'react';
import {
	// AppRegistry,
	View,
	TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import styles from './QRCodeScreen.styles';

export default function QRCodeScreen({ QRString }: { QRString?: string }) {
	const [text, setText] = useState(QRString || 'Food Donation');
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} onChangeText={setText} value={text} />
			<QRCode value={text} size={200} />
		</View>
	);
}

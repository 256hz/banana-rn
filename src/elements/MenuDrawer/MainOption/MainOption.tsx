import React from 'react';
import { Text, View } from 'react-native';

import { Icon } from '@elements';
import { IconName } from '@elements/Icon';
import * as colors from '@util/colors';

import styles from './MainOption.styles';

export function MainOption({ icon, text }) {
	let menuStyle = {};

	const DrawerIcon = (name: IconName) =>
		Icon({
			name,
			size: 24,
			color: colors.WHITE,
		});

	if (text === 'Log Out' || text === 'Scan QR Code') {
		menuStyle = {
			...styles.mainOption,
			...styles.logOut,
		};
	} else {
		menuStyle = styles.mainOption;
	}

	return (
		<View style={menuStyle}>
			<View>{DrawerIcon(icon)}</View>
			<View>
				<Text style={styles.optionText}>{text}</Text>
			</View>
		</View>
	);
}

export default MainOption;

import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from './ClaimingProgressBar.styles';

interface ClaimingProgressBarProps {
	/** width for ClaimingProgressBar, default set to 100%. */
	width?: number | string;
	/** number of donations has been picked up. */
	pickedUp: number;
	/** number of donations has been reserved. */
	reserved: number;
	/** number of donations remaining. */
	left: number;
	/** style of ClaimingProgressBar. */
	style?: StyleProp<ViewStyle>;
}

/**
 * ClaimingProgressBar, basic idea is using flex-grow attribute of element to stretch bars
 * to corresponding proportion.
 *
 * @param width width for ClaimingProgressBar, default set to 100%.
 * @param pickedUp number of donations has been picked up.
 * @param reserved number of donations has been reserved.
 * @param left number of donations remaining.
 * @param style style of ClaimingProgressBar.
 */
export default function ClaimingProgressBar({
	width = '100%',
	pickedUp,
	reserved,
	left,
	style,
}: ClaimingProgressBarProps) {
	const num2Str = (num: number, places: number) => String(num).padStart(places, '0');
	const total = pickedUp + reserved + left;
	return (
		<View style={[styles.claimProgressBar, { width } as ViewStyle, style]}>
			<View style={styles.barContainer}>
				{pickedUp !== 0 && <View style={[styles.pickUpBar, { flexGrow: pickedUp / total }]} />}
				{reserved !== 0 && <View style={[styles.reserveBar, { flexGrow: reserved / total }]} />}
				{left !== 0 && <View style={[styles.leftBar, { flexGrow: left / total }]} />}
			</View>

			<View style={styles.textBoxContainer}>
				{pickedUp !== 0 && (
					<View style={styles.textBox}>
						<Text style={styles.textBold}>{num2Str(pickedUp, 2)}</Text>
						<Text>PICKED-UP</Text>
					</View>
				)}

				{reserved !== 0 && (
					<View style={styles.textBox}>
						<Text style={styles.textBold}>{num2Str(reserved, 2)}</Text>
						<Text>RESERVED</Text>
					</View>
				)}

				{left !== 0 && (
					<View style={styles.textBox}>
						<Text style={styles.textBold}>{num2Str(left, 2)}</Text>
						<Text>LEFT</Text>
					</View>
				)}
			</View>
		</View>
	);
}

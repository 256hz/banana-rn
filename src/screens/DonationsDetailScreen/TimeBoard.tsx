import React, { useEffect, useState } from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';
import * as colors from '@util/colors';
import { setTSpan } from 'react-native-svg/lib/typescript/lib/extract/extractText';
import styles from './TimeBoard.styles';

interface TimeBoardProps {
	deadline: Date;
	style?: StyleProp<TextStyle>;
}
export default function ({ deadline, style }: TimeBoardProps) {
	const calcRemainingMin = (futureTime: Date) => Math.floor((futureTime.getTime() - Date.now()) / 60000);
	const calcRemainingSec = (futureTime: Date) => Math.floor(((futureTime.getTime() - Date.now()) % 60000) / 1000);
	const [min, setMin] = useState(calcRemainingMin(deadline));
	const [sec, setSec] = useState(calcRemainingSec(deadline));
	useEffect(() => {
		const intervalHandle = setInterval(() => {
			setMin(calcRemainingMin(deadline));
			setSec(calcRemainingSec(deadline));
		}, 1000);
		return () => clearInterval(intervalHandle);
	});
	return (
		<View style={[styles.outerContainer, style]}>
			<View style={styles.flexCenterContainer}>
				<Text style={styles.numText}>{min}</Text>
			</View>
			<View style={styles.flexCenterContainer}>
				<Text style={styles.timeText}>MIN</Text>
			</View>
			<View style={styles.flexCenterContainer}>
				<Text style={styles.numText}>{sec}</Text>
			</View>
			<View style={styles.flexCenterContainer}>
				<Text style={styles.timeText}>SEC</Text>
			</View>
		</View>
	);
}

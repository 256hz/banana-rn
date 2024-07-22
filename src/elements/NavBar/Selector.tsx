import styles from '@elements/NavBar/Selector.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import React, { useState } from 'react';

interface SelectorProps {
	position: 'map' | 'list';
	onMap?: () => void;
	onList?: () => void;
}
export default function ({ position, onMap, onList }: SelectorProps) {
	return (
		<View style={styles.selectorContainer}>
			<TouchableOpacity
				style={[styles.selector, position === 'map' ? styles.selectorSelected : {}]}
				onPress={() => {
					onMap && onMap();
				}}
			>
				<Text style={position === 'map' ? styles.textSelected : styles.text}>map</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.selector, position === 'list' ? styles.selectorSelected : {}]}
				onPress={() => {
					onList && onList();
				}}
			>
				<Text style={position === 'list' ? styles.textSelected : styles.text}>list</Text>
			</TouchableOpacity>
		</View>
	);
}

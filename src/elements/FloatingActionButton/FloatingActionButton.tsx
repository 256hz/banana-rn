import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '@elements/Icon';
import { Button, ButtonStyle } from '@elements/Button';
import * as colors from '@util/colors';
import styles from './FloatingActionButton.styles';
import { IconName } from '../Icon/Icon.types';

interface FloatingActionProps {
	iconName: IconName;
	top?: number;
	left?: number;
	size?: number;
	onPress?: (any) => void;
}

export default function ({ iconName, top = 525, left = 273, size = 28.5, onPress = () => {} }: FloatingActionProps) {
	const buttonFunction = onPress && (func => onPress(func));
	const buttonStyle: ButtonStyle = {
		default: {
			background: colors.BANANA_YELLOW,
			foreground: colors.BANANA_YELLOW,
		},
		pressed: {
			background: colors.LIGHT_YELLOW,
			foreground: colors.LIGHT_YELLOW,
		},
	};
	return (
		<View style={[styles.floatingContainer, { top, left }]}>
			<View style={styles.ellipseContainer}>
				<Button buttonStyle={buttonStyle} onPress={buttonFunction} style={styles.iconContainer}>
					{foregroundColor => <Icon name={iconName} size={size} color={foregroundColor} />}
				</Button>
			</View>
		</View>
	);
}

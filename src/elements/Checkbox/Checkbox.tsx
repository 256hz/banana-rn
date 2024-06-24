import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@elements';
import { NAVY_BLUE, LIGHT_GRAY_DISABLED } from '@util/colors';

interface CheckboxProps {
	/**
	 * Whether or not the checkbox is checked.
	 */
	checked: boolean;

	/**
	 * Callback to set the checked variable.
	 */
	setChecked: Function;

	/**
	 * The square dimensions of the checkbox.
	 */
	size?: number;

	/**
	 * Whether or not the checkbox is disabled/ interactive.
	 */
	disabled?: boolean;

	/**
	 * Callback for when a user presses on the checkbox.
	 */
	onPress?: Function;
}

export default function Checkbox({
	checked,
	setChecked,
	size = 18,
	disabled = false,
	onPress = () => {},
}: CheckboxProps) {
	const handlePress = () => {
		setChecked(!checked);
		onPress();
	};

	return (
		<TouchableOpacity disabled={disabled} onPress={handlePress}>
			<Icon
				name={checked ? 'checkboxOn' : 'checkboxOff'}
				color={disabled ? LIGHT_GRAY_DISABLED : NAVY_BLUE}
				size={size}
			/>
		</TouchableOpacity>
	);
}

import React, { useState, ReactNode } from 'react';
import { TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from 'react-native';
import { ColorScheme, useScheme } from '@util/colorSchemes';
import { DARK_GRAY_TRANSPARENT, WHITE } from '@util/colors';
import styles from './Button.styles';
import { ButtonStyle } from './index';

export type ButtonProps = Omit<TouchableHighlightProps, 'children'> & {
	/** Render function that results in elements to be wrapped by the button. */
	children: (foregroundColor: string) => ReactNode;

	/** Styles for different button states. */
	buttonStyle: ButtonStyle;

	/** Whether the button is styled with an outline and transparent body. */
	outlined?: boolean;
};

export default function Button({
	children,
	style,
	buttonStyle,
	outlined = false,
	disabled = false,
	activeOpacity = 0.8,
	onShowUnderlay = () => {
		/* no-op */
	},
	onHideUnderlay = () => {
		/* no-op */
	},
	...props
}: ButtonProps): JSX.Element {
	const scheme: ColorScheme = useScheme();
	const [pressed, setPressed] = useState(false);

	const DEFAULT_PRESSED_PALETTE = {
		background: DARK_GRAY_TRANSPARENT,
		foreground: WHITE,
	};
	const DEFAULT_DISABLED_PALETTE = scheme.disabled;

	const defaultPalette = buttonStyle.default;
	const pressedPalette = buttonStyle.pressed || DEFAULT_PRESSED_PALETTE;
	const disabledPalette = buttonStyle.disabled || DEFAULT_DISABLED_PALETTE;

	const UNDERLAY_COLOR = pressedPalette?.background || DARK_GRAY_TRANSPARENT;
	const BORDER_COLOR = (disabled ? disabledPalette : defaultPalette).foreground;
	const outlineBorder: ViewStyle = {
		borderColor: BORDER_COLOR,
		borderWidth: 2,
		borderStyle: 'solid',
	};

	const getCurrentPalette = () => {
		let palette = defaultPalette;
		if (disabled) palette = disabledPalette;
		if (pressed) palette = pressedPalette;
		return palette;
	};

	const backgroundColor = getCurrentPalette().background;
	const foregroundColor = getCurrentPalette().foreground;

	return (
		<TouchableHighlight
			style={[styles.container, outlined && outlineBorder, { backgroundColor }, style]}
			underlayColor={UNDERLAY_COLOR}
			activeOpacity={activeOpacity}
			disabled={disabled}
			onShowUnderlay={() => {
				setPressed(true);
				onShowUnderlay();
			}}
			onHideUnderlay={() => {
				setPressed(false);
				onHideUnderlay();
			}}
			{...props}
		>
			<View>{children(foregroundColor)}</View>
		</TouchableHighlight>
	);
}

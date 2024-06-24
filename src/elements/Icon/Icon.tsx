import React from 'react';
import { Image, Platform, View } from 'react-native';
import { NAVY_BLUE } from '@util/colors';
import { deprecatedIconMap, iconImports } from './icons';
import { DeprecatedIconName, IconImport, IconName } from './Icon.types';

interface IconProps {
	name: IconName | DeprecatedIconName;
	size: number;
	color?: string;
}

function Icon({ name, size, color = NAVY_BLUE }: IconProps) {
	const nameIsDeprecated = Object.keys(deprecatedIconMap).includes(name);
	const validIconName = nameIsDeprecated ? deprecatedIconMap[name] || '' : name;

	/**
	 * Returns the required dimensions for the base icon (e.g. the hamburger
	 * icon excluding the red dot) to be the given size.
	 * ?? Should the values used be added to a data structure with the imported icons?
	 */
	const getDimensions = () => {
		let width = size;
		let height = size;

		if (name.includes('menu')) {
			// Operand = dimension of SVG divided by dimension of base icon
			width *= 27 / 24.0;
			height *= 23 / 24.0;
		} else if (name.includes('bell')) {
			height *= 26 / 24.0;
		}

		return { width, height };
	};

	/**
	 * Returns the coordinate change required to center the base icon (e.g. the hamburger
	 * icon excluding the red dot).
	 * ?? Should the values used be calculated and added to a data structure with the imported icons?
	 */
	const getOffset = () => {
		const x = 0;
		let y = 0;

		if (name.includes('menu')) {
			y = -1.25;
		} else if (name.includes('bell')) {
			y = -2;
		}

		return {
			transform: [
				{
					translateX: x,
				},
				{
					translateY: y,
				},
			],
		};
	};

	const IconSvg: IconImport = iconImports[validIconName];

	return (
		<View
			style={{
				position: 'relative',
				width: size,
				height: size,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{Platform.OS === 'web' ? (
				<Image source={IconSvg} style={[getDimensions(), getOffset()]} />
			) : (
				// eslint-disable-next-line react/jsx-pascal-case
				<IconSvg.default style={[getDimensions(), getOffset()]} width={size} height={size} fill={color} />
			)}
		</View>
	);
}

export default Icon;

import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

const iconSize = 70;
const imageSize = iconSize * 0.9;

export default StyleSheet.create({
	card: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginBottom: 10,
		padding: 10,
		borderRadius: 16,
	},
	categoryText: {
		width: iconSize + 20,
		flexDirection: 'row',
		justifyContent: 'center',
		textAlign: 'center',
	},
	iconContainer: {
		height: iconSize,
		width: iconSize,
		borderRadius: iconSize / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginStart: 10,
		borderColor: 'blue',
		borderWidth: iconSize - imageSize,
	},
	icon: {
		height: imageSize,
		width: imageSize,
		borderRadius: imageSize / 2,
	},
	mainContainer: {
		flexDirection: 'row',
	},
	infoContainer: {
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		marginStart: 20,
	},
	infoBottomContainer: {
		flexDirection: 'row',
	},
	infoText: {
		fontFamily: 'open-sans-regular',
		color: colors.NAVY_BLUE,
	},
	infoTextBold: {
		fontFamily: 'open-sans-bold',
		color: colors.NAVY_BLUE,
	},
});

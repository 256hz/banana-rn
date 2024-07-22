import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '@util/colors';

const { width, height } = Dimensions.get('screen');
const windowSquare = 300;

/*
	Scaler for Offset in Y-axis based on windowSquare.
	Used in multiple cases.
	Can be cleaned up.
*/
const scaler = windowSquare / (windowSquare / 50);
const widthMinusWindow = (width - windowSquare) / 2;
const heightMinusWindow = (height - windowSquare) / 2 - scaler;

export default StyleSheet.create({
	background: {
		backgroundColor: colors.DARK_GRAY_TRANSPARENT,
		height,
		width,
		zIndex: -1,
	},
	xContainer: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		top: 0,
		left: 0,
		justifyContent: 'space-between',
		width: '100%',
		paddingTop: 20,
		paddingHorizontal: 5,
	},
	x: {
		textAlign: 'center',
		fontSize: 48,
	},
	textContainer: {
		display: 'flex',
		position: 'absolute',
		bottom: 0,
		width,
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'open-sans-bold',
		fontSize: 24,
		color: colors.WHITE,
		textShadowColor: 'black',
		textShadowRadius: 5,
	},
	reticleUL: {
		position: 'absolute',
		borderStyle: 'solid',
		height: windowSquare / 5,
		width: windowSquare / 2.75,
		borderWidth: 4,
		borderLeftColor: colors.BANANA_YELLOW,
		borderTopColor: colors.BANANA_YELLOW,
		borderBottomWidth: 0,
		borderRightWidth: 0,
		top: heightMinusWindow,
		left: widthMinusWindow,
	},
	reticleUR: {
		position: 'absolute',
		borderStyle: 'solid',
		height: windowSquare / 5,
		width: windowSquare / 2.75,
		borderWidth: 4,
		borderRightColor: colors.BANANA_YELLOW,
		borderTopColor: colors.BANANA_YELLOW,
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		top: heightMinusWindow,
		right: widthMinusWindow,
	},
	reticleDL: {
		position: 'absolute',
		borderStyle: 'solid',
		height: windowSquare / 5,
		width: windowSquare / 2.75,
		borderWidth: 4,
		borderLeftColor: colors.BANANA_YELLOW,
		borderBottomColor: colors.BANANA_YELLOW,
		borderTopWidth: 0,
		borderRightWidth: 0,
		bottom: heightMinusWindow + scaler + 2,
		left: widthMinusWindow,
	},
	reticleDR: {
		position: 'absolute',
		borderStyle: 'solid',
		height: windowSquare / 5,
		width: windowSquare / 2.75,
		borderWidth: 4,
		borderRightColor: colors.BANANA_YELLOW,
		borderBottomColor: colors.BANANA_YELLOW,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		bottom: heightMinusWindow + scaler + 2,
		right: widthMinusWindow,
	},
});

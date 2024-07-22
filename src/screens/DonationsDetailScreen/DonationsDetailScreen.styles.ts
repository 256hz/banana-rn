import { Dimensions, StyleSheet } from 'react-native';
import platformShadow from '@util/platformShadow';
import * as colors from '@util/colors';

const iconSize = 90;

export default StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: colors.WHITE,
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: colors.WHITE,
		alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: 40,
	},
	infoContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginLeft: 30,
	},
	infoText: {
		color: colors.NAVY_BLUE,
		fontSize: 16,
	},
	infoPair: {
		marginTop: 20,
	},
	iconContainer: {
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeContainer: {
		borderTopColor: colors.LIGHT_GRAY_DISABLED,
		borderTopWidth: 2,
		borderBottomColor: colors.LIGHT_GRAY_DISABLED,
		borderBottomWidth: 2,
	},
	icon: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderColor: colors.NAVY_BLUE,
		borderWidth: 2,
	},

	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.NAVY_BLUE,
		lineHeight: 35,
	},
	timeBoard: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.NAVY_BLUE,
		lineHeight: 35,
	},

	extensionContainer: {
		flexDirection: 'column',
		padding: 20,
	},

	extensionBtnContainer: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},

	textBold: {
		fontWeight: 'bold',
	},

	textUnderline: {
		textDecorationLine: 'underline',
	},

	backgroundColorYellow: {
		backgroundColor: colors.BANANA_YELLOW,
	},

	claimProgressBar: {
		width: '100%',
		padding: 10,
	},

	barContainer: {
		width: '100%',
		flexDirection: 'row',
	},

	pickUpBar: {
		flexBasis: 0,
		height: 12,
		backgroundColor: '#FFE145',
	},
	reserveBar: {
		flexBasis: 0,
		height: 12,
		backgroundColor: '#083A9B',
	},
	leftBar: {
		flexBasis: 0,
		height: 12,
		backgroundColor: '#768FC0',
	},
	textBoxContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: '100%',
		padding: 10,
	},
	textBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		color: colors.NAVY_BLUE,
	},
	claimInfo: {
		alignSelf: 'flex-start',
		alignItems: 'center',
	},
});

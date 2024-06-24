import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '@util/colors';

const inputHeight = 35;

export default StyleSheet.create({
	keyboardAvoidContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	header: {
		width: '100%',
		height: 180,
		justifyContent: 'center',
		paddingLeft: 20,
		backgroundColor: colors.BANANA_YELLOW,
	},
	scrollContainer: {
		paddingHorizontal: '5%',
		paddingTop: '10%',
		flex: 1,
	},
	input: {
		marginBottom: 14,
	},
	text: {
		fontFamily: 'open-sans-light',
		fontSize: 16,
		marginTop: 4,
		color: colors.NAVY_BLUE,
	},
	textBold: {
		fontFamily: 'open-sans-bold',
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 40,
	},
	checkBox: {
		backgroundColor: 'white',
		borderRadius: Dimensions.get('window').width / 2,
	},
	passwordContainer: {
		height: inputHeight,
		flexDirection: 'row',
		backgroundColor: 'white',
		marginBottom: 10,
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: inputHeight,
		backgroundColor: 'white',
	},
	iconPadding: {
		paddingRight: 35,
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

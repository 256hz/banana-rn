import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '@util/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
	textBold: {
		fontWeight: 'bold',
	},
	claimProgressBar: {
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
		fontSize: screenWidth * 0.045,
		color: colors.NAVY_BLUE,
	},
});

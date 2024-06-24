import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

export default StyleSheet.create({
	claimedDonation: {
		backgroundColor: colors.NAVY_BLUE,
		padding: 5,
	},
	claimedTag: {
		fontSize: 16,
		fontFamily: 'open-sans-bold',
		textTransform: 'uppercase',
		color: colors.WHITE,
	},
	qrContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: colors.BANANA_YELLOW,
		alignItems: 'center',
		padding: 10,
	},
	qrText: {
		color: colors.NAVY_BLUE,
		fontSize: 11,
	},
});

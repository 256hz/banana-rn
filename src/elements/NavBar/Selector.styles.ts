import { Platform, StyleSheet, Dimensions } from 'react-native';
import * as colors from '@util/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
	text: {
		color: colors.NAVY_BLUE,
	},
	textSelected: {
		color: colors.LIGHT_GRAY,
	},
	selectorContainer: {
		flexDirection: 'row',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selector: {
		height: 40,
		width: 80,
		borderWidth: 2,
		borderColor: colors.NAVY_BLUE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectorLast: {
		marginLeft: -2,
	},
	selectorSelected: {
		backgroundColor: colors.NAVY_BLUE,
	},
});

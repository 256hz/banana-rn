import { Platform, StyleSheet, Dimensions } from 'react-native';
import * as colors from '@util/colors';

export default StyleSheet.create({
	text: {
		color: colors.NAVY_BLUE,
		margin: 3,
	},
	textBold: {
		fontWeight: 'bold',
	},
	container: {
		flexDirection: 'row',
	},
	textContainer: {
		flexDirection: 'column',
	},
	smallMarginLeft: {
		marginLeft: 10,
	},
});

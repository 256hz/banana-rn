import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

const iconSize = 70;
const imageSize = iconSize * 0.9;

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'white',
	},
	modal: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		color: colors.NAVY_BLUE,
	},
	textContainer: {
		flex: 1,
		color: colors.NAVY_BLUE,
		flexDirection: 'row',
	},
	textStyle: {
		color: colors.NAVY_BLUE,
		marginLeft: 3,
	},
	errorStyle: {
		color: colors.NAVY_BLUE,
	},
	errorContainer: {
		flex: 1,
		marginVertical: 3,
		color: colors.NAVY_BLUE,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTextStyle: {
		fontSize: 12,
		paddingHorizontal: 25,
	},
	icon: {
		height: imageSize,
		width: imageSize,
		borderRadius: imageSize / 2,
		borderColor: colors.NAVY_BLUE,
		borderWidth: 2,
		marginBottom: 15,
	},
	claimTitle: {
		color: colors.NAVY_BLUE,
		marginLeft: 3,
		fontWeight: 'bold',
		marginBottom: 15,
		fontSize: 20,
	},
});

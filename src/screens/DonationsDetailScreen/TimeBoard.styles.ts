import { Dimensions, StyleSheet } from 'react-native';
import platformShadow from '@util/platformShadow';
import * as colors from '@util/colors';

export default StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: colors.LIGHT_GRAY,
		height: 70,
		flexDirection: 'row',
		width: 250,
		paddingHorizontal: 40,
	},
	flexCenterContainer: {
		flex: 1,
		flexBasis: 0,
		flexGrow: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	numText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.NAVY_BLUE,
	},
	timeText: {
		fontSize: 18,
		color: colors.NAVY_BLUE,
		flex: 1,
		marginTop: 6,
		marginLeft: 6,
	},
});

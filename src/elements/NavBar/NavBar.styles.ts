import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as colors from '@util/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
	text: {
		color: colors.NAVY_BLUE,
	},
	textSelected: {
		color: colors.LIGHT_GRAY,
	},
	contentContainer: {
		backgroundColor: colors.LIGHT_GRAY,
		height: Constants.statusBarHeight,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: colors.NAVY_BLUE,

	},
	backContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexBasis: 100,
	},
	backButtonLabel: {
		fontFamily: 'open-sans-light',
		fontWeight: '300',
		fontSize: 17,
		color: colors.NAVY_BLUE,
	},
	notiContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexBasis: 100,
		marginRight: 15,
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

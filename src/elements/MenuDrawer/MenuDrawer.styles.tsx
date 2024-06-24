import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '@util/colors';

const vh = Dimensions.get('screen').height;

export default StyleSheet.create({
	avatar: {
		alignSelf: 'center',
		marginBottom: -50,
		zIndex: 1,
		borderColor: colors.WHITE,
		borderWidth: 4,
		borderRadius: 55,
	},
	container: {
		flex: 1,
		backgroundColor: colors.NAVY_BLUE,
		marginTop: -20,
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: vh - vh / 3,
	},
	drawerHeader: {
		backgroundColor: colors.BANANA_YELLOW,
		color: colors.WHITE,
		height: 120,
		justifyContent: 'center',
	},
	drawerHeaderBuffer: {
		backgroundColor: colors.NAVY_BLUE,
		height: 90,
		paddingBottom: 30,
	},
	drawerBottomBuffer: {
		backgroundColor: colors.NAVY_BLUE,
		height: 80,
		paddingBottom: 30,
	},
	menuItem: {
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: colors.NAVY_BLUE,
	},
	logoutMenuItem: {
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: colors.NAVY_BLUE,
		marginTop: 250, // TODO: Find more dynamic styling option
	},
	labelText: {
		color: colors.WHITE,
		textTransform: 'uppercase',
		fontSize: 20,
		textAlign: 'right',
		width: '65%',
		fontWeight: '500',
	},
	username: {
		fontSize: 24,
		color: colors.NAVY_BLUE,
		textAlign: 'left',
		marginBottom: 15,
		fontWeight: '700',
		textTransform: 'uppercase',
		marginLeft: '25%',
	},
});

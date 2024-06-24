import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

export default StyleSheet.create({
	mainOption: {
		flex: 1,
		width: '100%',
		paddingLeft: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: colors.WHITE,
		paddingTop: 20,
		marginBottom: 15,
		marginTop: 5,
		letterSpacing: 0.5,
	},
	optionText: {
		color: colors.WHITE,
		textTransform: 'uppercase',
		marginLeft: 'auto',
		marginRight: 5,
		fontWeight: 'bold',
		fontSize: 20,
	},
	logOut: {
		borderTopWidth: 0,
	},
});

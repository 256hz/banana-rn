import { StyleSheet } from 'react-native';
import typography from '@util/typography';
import * as Colors from '@util/colors';

export default StyleSheet.create({
	headerContainer: {
		flexBasis: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.BANANA_YELLOW,
	},
	smallHeaderText: {
		...typography.h3,
	},
	largeHeaderText: {
		...typography.h1,
	},
	smallHeaderContainer: {
		height: 104,
	},
	largeHeaderContainer: {
		height: 180,
	},
});

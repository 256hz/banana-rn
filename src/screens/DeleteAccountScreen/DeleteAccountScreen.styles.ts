import { StyleSheet } from 'react-native';
import * as Colors from '@util/colors';
import typography from '@util/typography';

const GRID_MARGIN = 20; // Grid One from Style Guide TODO: make grid constants global
const LIST_ITEM_BORDER_COLOR = Colors.LIGHT_GRAY;

export const ListItem = StyleSheet.create({
	container: {
		paddingHorizontal: GRID_MARGIN,
		paddingVertical: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'transparent',
		borderBottomColor: LIST_ITEM_BORDER_COLOR,
	},
	firstContainer: {
		borderTopColor: LIST_ITEM_BORDER_COLOR,
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	titleText: {
		...typography.h3,
	},
	titleIcon: {
		marginRight: 12,
	},
	message: {
		...typography.body1,
	},
});

export default StyleSheet.create({
	outerContainer: {
		flex: 1,
	},
	header: {
		flexBasis: '16%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.BANANA_YELLOW,
	},
	headerText: {
		...typography.h3,
	},
	bodyContainer: {
		flex: 1,
	},
	bodyMessage: {
		paddingHorizontal: GRID_MARGIN, // TODO: update based on Figma Question #65
		paddingVertical: GRID_MARGIN,
	},
	bodyMessageTitle: {
		...typography.h3,
		alignSelf: 'center',
		padding: GRID_MARGIN,
	},
	bodyMessageBody: {
		...typography.body1,
		paddingBottom: GRID_MARGIN,
		textAlign: 'left',
	},
});
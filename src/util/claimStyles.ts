import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import * as colors from '@util/colors';

// The styles for MakeClaimScreen and ClaimDetails are nearly identical so we store them here for reuse
const claimStyles: Record<string, TextStyle | ImageStyle | ViewStyle> = {
	outerContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		height: 180,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	section: {
		marginBottom: '3%',
		borderBottomWidth: 1,
		borderBottomColor: colors.LIGHT_GRAY,
		paddingBottom: 10,
	},
	mainContent: {
		padding: '3%',
	},
	title: {
		marginBottom: 7,
	},
	smallTitle: {
		marginBottom: 1,
	},
	itemWithIcon: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	item: {
		marginBottom: 5,
	},
	closeLnk: {
		marginRight: 10,
		marginTop: 10,
	},
};

export default claimStyles;

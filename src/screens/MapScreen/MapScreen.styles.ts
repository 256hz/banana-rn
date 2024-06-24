import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '@util/colors';
import typography from '@util/typography';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const MAP_HEIGHT = height - 120;
export default StyleSheet.create({
	map: {
		width,
		height: MAP_HEIGHT,
	},
});

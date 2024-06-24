import { AppRegistry } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

// import stories
configure(() => {
	require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
	asyncStorage: require('@react-native-community/async-storage'),
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('The Banana App', () => StorybookUIRoot);

export default StorybookUIRoot;

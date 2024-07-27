import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';

const reactNavigationDecorator = story => {
	const Screen = () => story();
	const Navigator = createAppContainer(createSwitchNavigator({ Screen }));
	return <Navigator />;
};

export default reactNavigationDecorator;

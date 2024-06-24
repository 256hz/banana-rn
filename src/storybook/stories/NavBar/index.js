/* eslint-disable import/no-extraneous-dependencies,no-undef */
import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Button, Icon, NavBar } from '../../../elements';
import EmptyNavigator from '../Decorators/EmptyNavigator';

const story = storiesOf('NavBar', module)
	.addDecorator(EmptyNavigator)
	.add(
		'NavBar',
		() => (
			<View>
				<NavBar leftButton="back" />
				<NavBar leftButton="qrCode" />
				<NavBar
					showSelector={true}
					onList={() => {
						alert(' you clicked List!');
					}}
					onMap={() => {
						alert('you clicked Map');
					}}
					position="map"
				/>
			</View>
		),
		{
			notes: 'https://github.com/FoodIsLifeBGP/banana-rn/wiki/NavBar-Introduction',
		}
	);

export default story;

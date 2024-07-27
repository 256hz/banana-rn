/* eslint-disable import/no-extraneous-dependencies,no-undef */
import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Button, Icon, NavBar } from '../../../elements';
import CenterView from '../Decorators/CenterView';

const story = storiesOf('Button', module)
	.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => {
			const buttonStyle = {
				default: {
					background: text('background', 'yellow'),
					foreground: text('foreground', 'blue'),
				},
				pressed: {
					background: 'blue',
					foreground: 'pink',
				},
				disabled: {
					background: 'grey',
					foreground: 'white',
				},
			};
			return (
				<Button buttonStyle={buttonStyle} onPress={() => alert('test')}>
					{foregroundColor => <Text style={{ color: foregroundColor }}>Open Modal</Text>}
				</Button>
			);
		},
		{
			notes: 'https://github.com/FoodIsLifeBGP/banana-rn/wiki/Button',
		}
	);

export default story;
